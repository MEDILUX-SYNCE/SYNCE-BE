const { RecordEntry, RecordImage } = require('../models');


// 회복 기록 생성
exports.createRecordEntry = async (recordBookId, { date, symptom, diary, images }) => {
  const entry = await RecordEntry.create({
    record_book_id: recordBookId,
    date,
    symptom,
    diary,
  });

  if (images && images.length > 0) {
    const imageRecords = images.map(url => ({
      entry_id: entry.entry_id,
      image_url: url,
    }));
    await RecordImage.bulkCreate(imageRecords);
  }

  return { entry_id: entry.entry_id, date: entry.date };
};

// 회복 기록 목록 조회
exports.getRecordEntries = async (recordBookId, { date, page = 1, limit = 10, sort = 'desc' }) => {
  const where = { record_book_id: recordBookId };
  if (date) where.date = date;

  const offset = (page - 1) * limit;
  const { rows, count } = await RecordEntry.findAndCountAll({
    where,
    order: [['date', sort]],
    offset,
    limit: parseInt(limit),
    include: [{ model: RecordImage, as: 'images' }],
  });

  return {
    entries: rows,
    pagination: { total: count, page, limit }
  };
};

// 회복 기록 상세
exports.getRecordEntryDetail = async (entryId) => {
  const entry = await RecordEntry.findByPk(entryId, {
    include: [{ model: RecordImage, as: 'images' }]
  });
  return entry;
};


// 회복 기록 수정
exports.updateRecordEntry = async (entryId, { symptom, diary, images }) => {
  const entry = await RecordEntry.findByPk(entryId);
  if (!entry) throw new Error('Entry not found');

  await entry.update({ symptom, diary, updated_at: new Date() });

  if (images) {
    await RecordImage.destroy({ where: { entry_id: entryId } });
    if (images.length > 0) {
      const imageRecords = images.map(url => ({
        entry_id: entryId,
        image_url: url,
      }));
      await RecordImage.bulkCreate(imageRecords);
    }
  }

  return { entry_id: entry.entry_id, updated_at: entry.updated_at };
};


// 회복 기록 삭제
exports.deleteRecordEntry = async (entryId) => {
  const entry = await RecordEntry.findByPk(entryId);
  if (!entry) throw new Error('Entry not found');
  await entry.update({ deleted_at: new Date() });
  // 실제 삭제를 원하면: await entry.destroy();
};