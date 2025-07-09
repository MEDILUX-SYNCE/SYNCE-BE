const recordBookService = require('../services/recordBookService');

// 기록장 생성
exports.createRecordBook = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { title, hospital_id, surgery_date, surgery_ids } = req.body;
    const result = await recordBookService.createRecordBook({ user_id, title, hospital_id, surgery_date, surgery_ids });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 기록장 목록 조회
exports.getRecordBooks = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { page = 1, limit = 10, sort } = req.query;
    const result = await recordBookService.getRecordBooks({ user_id, page, limit, sort });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 기록장 상세 조회
exports.getRecordBookDetail = async (req, res) => {
  try {
    const { recordBookId } = req.params;
    const result = await recordBookService.getRecordBookDetail(recordBookId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 기록장 수정
exports.updateRecordBook = async (req, res) => {
  try {
    const { recordBookId } = req.params;
    const { title } = req.body;
    const result = await recordBookService.updateRecordBook(recordBookId, { title });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 기록장 삭제
exports.deleteRecordBook = async (req, res) => {
  try {
    const { recordBookId } = req.params;
    await recordBookService.deleteRecordBook(recordBookId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
