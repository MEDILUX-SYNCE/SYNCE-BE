const User = require('../models/schemas/user');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

/* // JWT 토큰 생성
function createJwtToken(user, type) {
  const payload = {
    user_id: user.user_id,
    role: user.role,
    login_type: user.login_type
  };
  const secret = process.env.JWT_SECRET;
  const expiresIn = type === 'ACCESS' ? '1h' : '90d';
  return jwt.sign(payload, secret, { expiresIn });
}

// AuthToken 저장
async function saveAuthToken(user_id, token_type, token_value, device_type, ip_address) {
  const now = new Date();
  const expires_at = new Date(now);
  if (token_type === 'ACCESS') expires_at.setHours(now.getHours() + 1);
  else if (token_type === 'REFRESH') expires_at.setDate(now.getDate() + 90);

  await AuthToken.create({
    token_id: uuidv4(),
    user_id,
    token_type,
    token_value,
    issued_at: now,
    expires_at,
    is_valid: true,
    device_type,
    ip_address
  });
}

exports.socialLogin = async (provider, id_token, device_type, device_info, ip_address) => {
    // 1. 소셜 토큰 검증 (Google/Apple API 호출)

    // 2. 사용자 정보 (email, social_user_id 등) 획득

    // 3. 기존 사용자 확인
    let user = await User.findOne({ where: { 
        [`${provider.toLowerCase()}_user_id`]: idFromProvider } });
        if (!user) {
            // 신규 유저: 임시 user 생성 (is_new_user: true)
            user = await User.create({ email, login_type: provider, 
                [`${provider.toLowerCase()}_user_id`]: idFromProvider });
            return { is_new_user: true, user_id: user.user_id };
    }
    // 4. 토큰 발급
    const accessToken = createJwtToken(user, 'ACCESS');
    const refreshToken = createJwtToken(user, 'REFRESH');
    await saveAuthToken(user.user_id, 'ACCESS', accessToken, device_type, ip_address);
    await saveAuthToken(user.user_id, 'REFRESH', refreshToken, device_type, ip_address);

    return {
        is_new_user: false,
        access_token: accessToken,
        refresh_token: refreshToken,
        user_id: user.user_id
    };
};

// 추가 정보 및 동의 제출
exports.register = async (user_id, user_name, phone_number, birth_date, consents) => {
    await User.update(
        { user_name, phone_number, birth_date },
        { where: { user_id }}
    );

    // consents 저장 로직 필요
    return { user_id };
};

// 토큰 재발급
exports.refreshToken = async (refresh_token, device_type, ip_address) => {
  let decoded;
  try {
    decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
  } catch (e) {
    throw new Error('Invalid refresh token');
  }
  const user = await User.findByPk(decoded.user_id);
  const newAccessToken = createJwtToken(user, 'ACCESS');
  const newRefreshToken = createJwtToken(user, 'REFRESH');
  await saveAuthToken(user.user_id, 'ACCESS', newAccessToken, device_type, ip_address);
  await saveAuthToken(user.user_id, 'REFRESH', newRefreshToken, device_type, ip_address);

  return {
    access_token: newAccessToken,
    refresh_token: newRefreshToken
  };
};
 */

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
