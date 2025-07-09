const express = require('express');
const router = express.Router();
const recordEntryController = require('../controllers/recordEntryController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: RecordEntry
 *   description: 회복 기록 관리 API
 */

/**
 * @swagger
 * /record-entries/{recordEntryId}:
 *   get:
 *     summary: 회복 기록 상세 조회
 *     tags: [RecordEntry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: recordEntryId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 회복 기록 상세 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 entry_id:
 *                   type: integer
 *                   example: 1
 *                 record_book_id:
 *                   type: integer
 *                   example: 1
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: 2025-07-09
 *                 symptom:
 *                   type: string
 *                   example: 두통과 미열이 있었음.
 *                 diary:
 *                   type: string
 *                   example: 오늘은 컨디션이 조금 나아졌다. 충분히 휴식함.
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       image_id:
 *                         type: integer
 *                         example: 1
 *                       image_url:
 *                         type: string
 *                         example: https://example.com/images/recovery1.jpg
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-07-09T10:00:00.000Z
 */
router.get('/:recordEntryId', verifyToken, recordEntryController.getRecordEntryDetail);

/**
 * @swagger
 * /record-entries/{recordEntryId}:
 *   patch:
 *     summary: 회복 기록 수정
 *     tags: [RecordEntry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: recordEntryId
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
 *               symptom:
 *                 type: string
 *                 example: 두통이 거의 사라짐.
 *               diary:
 *                 type: string
 *                 example: 오늘은 산책도 할 수 있었다.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: https://example.com/images/recovery3.jpg
 *     responses:
 *       200:
 *         description: 회복 기록 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 entry_id:
 *                   type: integer
 *                   example: 1
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-07-10T09:30:00.000Z
 */
router.patch('/:recordEntryId', verifyToken, recordEntryController.updateRecordEntry);

/**
 * @swagger
 * /record-entries/{recordEntryId}:
 *   delete:
 *     summary: 회복 기록 삭제
 *     tags: [RecordEntry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: recordEntryId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 회복 기록 삭제 성공
 */
router.delete('/:recordEntryId', verifyToken, recordEntryController.deleteRecordEntry);

module.exports = router;