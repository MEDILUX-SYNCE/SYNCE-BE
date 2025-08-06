const AuthService = require('../services/authService');

exports.socialLogin = async (req, res) => {
  try {
    const { provider, id_token, device_type, device_info } = req.body;
    const ip_address = getClientIP(req);
    const result = await AuthService.socialLogin({ provider, id_token, device_type, device_info, ip_address });
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { user_name, phone_number, birth_date, consents, device_type, device_info } = req.body;
    const ip_address = getClientIP(req);
    const result = await AuthService.register({ user_id, user_name, phone_number, birth_date, consents, device_type, device_info, ip_address });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refresh_token, device_type } = req.body;    
    const ip_address = getClientIP(req);
    const result = await AuthService.refreshToken({ refresh_token, device_type, ip_address });
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    await AuthService.logout(user_id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getConsents = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const consents = await AuthService.getConsents(user_id);
    res.status(200).json(consents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLoginHistory = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { page = 1, size = 10, start_date, end_date } = req.query;
    const result = await AuthService.getLoginHistory({ user_id, page, size, start_date, end_date });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// IP 추출 함수
const getClientIP = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  if (req.connection && req.connection.remoteAddress) return req.connection.remoteAddress;
  if (req.ip) return req.ip;
  return null;
};

// 개발용 login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    res.json({ accessToken: token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
