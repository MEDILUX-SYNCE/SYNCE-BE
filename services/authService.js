const { User, Consent, UserConsent, LoginHistory, AuthToken } = require('../models');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const { OAuth2Client } = require('google-auth-library');
const verifyAppleToken = require('verify-apple-id-token').default;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateAccessToken = (user_id) => {
  const token = jwt.sign({ user_id: user_id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
  return { token };
};

const generateRefreshToken = (user_id) => {
  const jti = uuidv4();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 90); // 90일
  const token = jwt.sign({ sub: user_id, jti }, process.env.JWT_SECRET, {
    expiresIn: '90d'
  });
  return { token, jti, expires };
};

const decodeToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
const verifyRefreshToken = decodeToken;

// 소셜 ID 토큰 검증 함수
async function verifyIdToken(provider, id_token) {
  if (provider === 'GOOGLE') {
    const ticket = await googleClient.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return { sub: payload.sub, email: payload.email };
  } else if (provider === 'APPLE') {
    // TODO: 
    return { sub: 'mock_apple_id', email: 'mock_apple@email.com' };
  } else {
    throw new Error('Unknown provider');
  }
}

exports.socialLogin = async ({ provider, id_token, device_type, device_info, ip_address }) => {
  // 소셜 서버에서 ID 토큰 검증 및 유저정보 추출
  const socialUser = await verifyIdToken(provider, id_token);

  if (!socialUser || !socialUser.sub) {
    throw new Error('Invalid id_token');
  }

  const socialKey = provider === 'GOOGLE' ? 'google_user_id' : 'apple_user_id';
  // DB에서 소셜 고유ID로 유저 조회
  let user = await User.findOne({ where: { [socialKey]: socialUser.sub } });
  const is_new_user = !user;

  if (!user) {
    user = await User.create({
      [socialKey]: socialUser.sub,
      email: socialUser.email,
      user_name: '미입력',
      phone_number: '000-0000-0000',
      birth_date: new Date(),
      role: 'PATIENT',
      state: 'ACTIVE',
      login_type: provider
    });
  }

  const loginResult = is_new_user ? 'FAILURE' : 'SUCCESS';
  const loginReason = is_new_user ? '추가 정보 미입력' : null;

  await LoginHistory.create({
    user_id: user.user_id,
    device_type,
    social_type: provider,
    platform: '',
    device_info,
    ip_address,
    action_at: new Date(),
    result: loginResult,
    reason: loginReason
  });

  const access_token = generateAccessToken(user.user_id);
  const refresh_token = generateRefreshToken(user.user_id);

  await AuthToken.create({
    token_id: refresh_token.jti,
    user_id: user.user_id,
    token_type: 'REFRESH',
    token_value: refresh_token.token,
    issued_at: new Date(),
    expires_at: refresh_token.expires,
    is_valid: true,
    device_type,
    ip_address
  });

  return {
    access_token: access_token.token,
    refresh_token: refresh_token.token,
    user_id: user.user_id,
    is_new_user
  };
};

exports.register = async ({ user_id, user_name, phone_number, birth_date, consents, device_type, device_info, ip_address }) => {
  await User.update({ user_name, phone_number, birth_date }, { where: { user_id } });
  await Promise.all(consents.map(consent_id => UserConsent.create({
    user_id,
    consent_id,
    agreed_at: new Date()
  })));

  const lastFailLog = await LoginHistory.findOne({
    where: { user_id, result: 'FAILURE', reason: '추가 정보 미입력' },
    order: [['action_at', 'DESC']]
  });

  if (lastFailLog) {
    await lastFailLog.update({
      result: 'SUCCESS',
      reason: '추가 정보 등록 완료',
      action_at: new Date(),
      device_type,
      device_info,
      ip_address
    });
  }

  return { user_id };
};

exports.refreshToken = async ({ refresh_token, device_type, ip_address }) => {
  const payload = verifyRefreshToken(refresh_token);
  const user_id = payload.user_id;

  const token = await AuthToken.findOne({
    where: { token_value: refresh_token, is_valid: true, user_id }
  });
  if (!token) throw new Error('Invalid refresh token');

  const access_token = generateAccessToken(user_id);
  const new_refresh_token = generateRefreshToken(user_id);

  await token.update({ is_valid: false });
  await AuthToken.create({
    token_id: new_refresh_token.jti,
    user_id,
    token_type: 'REFRESH',
    token_value: new_refresh_token.token,
    issued_at: new Date(),
    expires_at: new_refresh_token.expires,
    is_valid: true,
    device_type,
    ip_address
  });

  return {
    access_token: access_token.token,
    refresh_token: new_refresh_token.token
  };
};

exports.logout = async (access_token) => {
  const payload = decodeToken(access_token);
  await AuthToken.update({ is_valid: false }, {
    where: { user_id: payload.user_id }
  });
  return { success: true }
};

exports.getConsents = async (user_id) => {
  const userConsents = await UserConsent.findAll({
    where: { user_id },
    include: [{
      model: Consent,
      as: 'consents',
      attributes: ['consent_id', 'consent_type', 'content', 'version', 'created_at']
    }],
    order: [['agreed_at', 'DESC']]
  });
  
  return userConsents.map(uc => ({
    consent_id: uc.consent_id,
    consent_type: uc.consent.consent_type,
    content: uc.consent.content,
    version: uc.consent.version,
    agreed_at: uc.agreed_at,
  }));
};

exports.getLoginHistory = async ({ access_token, page, size, start_date, end_date }) => {
  const payload = decodeToken(access_token);
  const where = { user_id: payload.user_id };

  if (start_date && end_date) {
    where.action_at = { [Op.between]: [new Date(start_date), new Date(end_date)] };
  }

  const histories = await LoginHistory.findAndCountAll({
    where,
    limit: Number(size),
    offset: (Number(page) - 1) * Number(size),
    order: [['action_at', 'DESC']]
  });

  return histories;
};

// 개발용 로그인
const TEST_USER = {
  email: 'test@email.com',
  password: '0000',
  userId: 1
};

exports.login = async (email, password) => {
  if (email === TEST_USER.email && password === TEST_USER.password) {
    const token = jwt.sign(
      {
        user_id: TEST_USER.userId,
        email: TEST_USER.email,
        role: 'PATIENT' 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return token;
  } else {
    throw new Error('Invalid credentials');
  }
};
