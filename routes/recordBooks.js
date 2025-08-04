const express = require('express');
const router = express.Router();
const recordBookController = require('../controllers/recordBookController');
const recordEntryController = require('../controllers/recordEntryController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: RecordBook
 *   description: 기록장 관리 API
 */

/**
 * @swagger
 * /record-books:
 *   post:
 *     summary: 기록장 생성
 *     tags: [RecordBook]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, hospital_id, surgery_date, surgery_ids]
 *             properties:
 *               title:
 *                 type: string
 *                 example: 2025년 코성형 기록
 *               hospital_id:
 *                 type: integer
 *                 example: 1
 *               surgery_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-06
 *               surgery_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: 기록장 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 record_book_id:
 *                   type: integer
 *                   example: 10
 *                 title:
 *                   type: string
 *                   example: 2025년 코성형 기록
 */
router.post('/', verifyToken, recordBookController.createRecordBook);

/**
 * @swagger
 * /record-books:
 *   get:
 *     summary: 기록장 목록 조회
 *     tags: [RecordBook]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *           default: created_at
 *     responses:
 *       200:
 *         description: 기록장 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 record_books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       record_book_id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: 2025년 코성형 기록
 *                       hospital_name:
 *                         type: string
 *                         example: 서울중앙병원
 *                       surgery_date:
 *                         type: string
 *                         format: date
 *                         example: 2025-07-06
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-07-06T12:00:00.000Z
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 2
 */
router.get('/', verifyToken, recordBookController.getRecordBooks);

/**
 * @swagger
 * /record-books/{recordBookId}:
 *   get:
 *     summary: 기록장 상세 조회
 *     tags: [RecordBook]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: recordBookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 기록장 상세 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 record_book_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: 2025년 코성형 기록
 *                 hospital_name:
 *                   type: string
 *                   example: 서울중앙병원
 *                 surgery_date:
 *                   type: string
 *                   format: date
 *                   example: 2025-07-06
 *                 surgeries:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       surgery_id:
 *                         type: integer
 *                         example: 3
 *                       detail:
 *                         type: string
 *                         example: 코끝 성형
 */
router.get('/:recordBookId', verifyToken, recordBookController.getRecordBookDetail);

/**
 * @swagger
 * /record-books/{recordBookId}:
 *   patch:
 *     summary: 기록장 수정
 *     tags: [RecordBook]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: recordBookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 2025년 코성형 기록 (수정)
 *     responses:
 *       200:
 *         description: 기록장 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 record_book_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: 2025년 코성형 기록 (수정)
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-07-06T13:00:00.000Z
 */
router.patch('/:recordBookId', verifyToken, recordBookController.updateRecordBook);

/**
 * @swagger
 * /record-books/{recordBookId}:
 *   delete:
 *     summary: 기록장 삭제
 *     tags: [RecordBook]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: recordBookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 기록장 삭제 성공
 */
router.delete('/:recordBookId', verifyToken, recordBookController.deleteRecordBook);

/**
 * @swagger
 * /record-books/{recordBookId}/entries:
 *   post:
 *     summary: 회복 기록 작성
 *     tags: [RecordEntry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: recordBookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [date]
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-09
 *               symptom:
 *                 type: string
 *                 example: 두통과 미열이 있었음.
 *               diary:
 *                 type: string
 *                 example: 오늘은 컨디션이 조금 나아졌다. 충분히 휴식함.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: https://example.com/images/recovery1.jpg
 *     responses:
 *       201:
 *         description: 회복 기록 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 entry_id:
 *                   type: integer
 *                   example: 1
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: 2025-07-09
 */
router.post('/:recordBookId/entries', verifyToken, recordEntryController.createRecordEntry);

/**
 * @swagger
 * /record-books/{recordBookId}/entries:
 *   get:
 *     summary: 회복 기록 목록 조회
 *     tags: [RecordEntry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: recordBookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: date
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: 회복 기록 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 entries:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       entry_id:
 *                         type: integer
 *                         example: 1
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: 2025-07-09
 *                       symptom:
 *                         type: string
 *                         example: 두통과 미열이 있었음.
 *                       diary:
 *                         type: string
 *                         example: 오늘은 컨디션이 조금 나아졌다. 충분히 휴식함.
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             image_id:
 *                               type: integer
 *                               example: 1
 *                             image_url:
 *                               type: string
 *                               example: https://example.com/images/recovery1.jpg
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 2
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 2
 */
router.get('/:recordBookId/entries', verifyToken, recordEntryController.getRecordEntries);

module.exports = router;