const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /social-login:
 *   post:
 *     summary: 소셜 로그인
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - provider
 *               - id_token
 *               - device_type
 *             properties:
 *               provider:
 *                 type: string
 *                 enum: [GOOGLE, APPLE]
 *                 description: 소셜 로그인 공급자 선택
 *                 example: GOOGLE
 *               id_token:
 *                 type: string
 *                 description: 소셜 공급자로부터 받은 ID 토큰
 *                 example: eyJhbGc...
 *               device_type:
 *                 type: string
 *                 description: '디바이스 종류 (예: MOBILE, PC, TABLET)'
 *                 example: MOBILE
 *               device_info:
 *                 type: string
 *                 description: 디바이스 상세 정보(JSON 문자열 형태)
 *                 example: '{"model":"iPhone 12", "os":"iOS 16.4"}'
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: JWT Access Token
 *                 refresh_token:
 *                   type: string
 *                   description: JWT Refresh Token
 *                 user_id:
 *                   type: integer
 *                 is_new_user:
 *                   type: boolean
 *                   description: 신규 유저 여부
 *       401:
 *         description: 인증 실패 (유효하지 않은 토큰 등)
 */
router.post('/social-login', AuthController.socialLogin);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: 회원 추가 정보 및 동의 등록
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - phone_number
 *               - birth_date
 *               - consents
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: 홍길동
 *               phone_number:
 *                 type: string
 *                 example: 010-1234-5678
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               consents:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *               device_type:
 *                 type: string
 *                 description: 디바이스 타입 (optional)
 *                 example: MOBILE
 *               device_info:
 *                 type: string
 *                 description: 디바이스 상세 정보 (optional)
 *                 example: '{"model":"iPhone 12", "os":"iOS 16.4"}'
 *     responses:
 *       201:
 *         description: 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *       400:
 *         description: 잘못된 요청 (필수값 누락 등)
 */
router.post('/register', verifyToken, AuthController.register);

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: 리프레시 토큰으로 토큰 재발급
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refresh_token
 *               - device_type
 *             properties:
 *               refresh_token:
 *                 type: string
 *               device_type:
 *                 type: string
 *                 example: MOBILE
 *               device_info:
 *                 type: string
 *                 description: 디바이스 상세 정보 (optional)
 *                 example: '{"model":"iPhone 12", "os":"iOS 16.4"}'
 *     responses:
 *       200:
 *         description: 토큰 재발급 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                 refresh_token:
 *                   type: string
 *       401:
 *         description: 인증 실패 (토큰 만료 또는 유효하지 않음)
 */
router.post('/refresh', AuthController.refreshToken);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: 로그아웃 (토큰 무효화)
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: 로그아웃 성공 (응답 본문 없음)
 *       400:
 *         description: 잘못된 요청
 */
router.post('/logout', verifyToken, AuthController.logout);

/**
 * @swagger
 * /consents:
 *   get:
 *     summary: 사용자 동의 항목 리스트 조회
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: 동의 항목 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   consent_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: 서버 오류
 */
router.get('/consents', verifyToken, AuthController.getConsents);

/**
 * @swagger
 * /login-history:
 *   get:
 *     summary: 로그인 이력 조회 (페이징 및 기간 필터 지원)
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지당 데이터 개수
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: 조회 시작 날짜(YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: 조회 종료 날짜(YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: 로그인 이력 리스트 및 페이징 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 size:
 *                   type: integer
 *                 records:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       history_id:
 *                         type: integer
 *                       device_type:
 *                         type: string
 *                       social_type:
 *                         type: string
 *                         nullable: true
 *                       platform:
 *                         type: string
 *                         nullable: true
 *                       device_info:
 *                         type: string
 *                         nullable: true
 *                       ip_address:
 *                         type: string
 *                         nullable: true
 *                       action_at:
 *                         type: string
 *                         format: date-time
 *                       result:
 *                         type: string
 *                       reason:
 *                         type: string
 *       500:
 *         description: 서버 오류
 */
router.get('/login-history', verifyToken, AuthController.getLoginHistory);

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