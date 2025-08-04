const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.post('/social-login', AuthController.socialLogin);
router.post('/register', AuthController.register);
router.post('/refresh', AuthController.refreshToken);

// 동의 항목 조회
// router.get('/consents', );

// 로그인 이력 조회
// router.get('/login-history', );

// 개발용 login

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 테스트 계정 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@email.com
 *               password:
 *                 type: string
 *                 example: '0000'
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: 로그인 실패 (잘못된 자격증명)
 */

router.post('/login', AuthController.login);

module.exports = router;