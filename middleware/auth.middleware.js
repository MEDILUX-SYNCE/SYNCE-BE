const jwt = require('jsonwebtoken');
const userModel = require('../models/schemas/user');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: { code: 'AUTH_001', message: '토큰이 필요합니다.'}
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.user_id);

        if (!user || user.state !== 'ACTIVE') {
            return res.stauts(401).json({
                success: false,
                error: { code: 'AUTH_002', message: '유효하지 않은 사용자입니다.'}
            });
        }

        req.user = user;
        next();
    } catch(error) {
        return res.status(401).json({
            success: false,
            error: { code: 'AUTH_003', message: '토큰이 유효하지 않습니다.'}
        });
    }
};

// 역할별 권한 확인
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { code: 'AUTH_004', message: '권한이 없습니다.' }
      });
    }
    next();
  };
};

module.exports = { verifyToken, requireRole };