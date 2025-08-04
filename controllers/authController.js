const AuthService = require('../services/authService');

exports.socialLogin = async (req, res) => {
  const { provider, id_token, device_type, device_info, ip_address } = req.body;
  const result = await AuthService.socialLogin(provider, id_token, device_type, device_info, ip_address);
  res.status(200).json(result);
};

exports.register = async (req, res) => {
  const { user_id, user_name, phone_number, birth_date, consents } = req.body;
  const result = await AuthService.register(user_id, user_name, phone_number, birth_date, consents);
  res.status(201).json(result);
};

exports.refreshToken = async (req, res) => {
  const { refresh_token, device_type, ip_address } = req.body;
  const result = await AuthService.refreshToken(refresh_token, device_type, ip_address);
  res.status(200).json(result);
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
