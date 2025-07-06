const { RecordBook, RecordBookSurgery, Surgery, Hospital, User, sequelize } = require('../models');

// 기록장 생성
exports.createRecordBook = async ({ user_id, title, hospital_id, surgery_date, surgery_ids }) => {
  const t = await sequelize.transaction();
  try {
    const newRecordBook = await RecordBook.create(
      { user_id, title, hospital_id, surgery_date },
      { transaction: t }
    );

    if (Array.isArray(surgery_ids) && surgery_ids.length > 0) {
      const bulkData = surgery_ids.map(surgery_id => ({
        record_book_id: newRecordBook.record_book_id,
        surgery_id
      }));
      await RecordBookSurgery.bulkCreate(bulkData, { transaction: t });
    }

    await t.commit();
    return {
      record_book_id: newRecordBook.record_book_id,
      title: newRecordBook.title
    };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

// 기록장 목록 조회
exports.getRecordBooks = async ({ user_id, page = 1, limit = 10, sort = 'created_at' }) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await RecordBook.findAndCountAll({
    where: { user_id },
    include: [
      { model: Hospital, as: 'hospital', attributes: ['name'] }
    ],
    order: [[sort, 'DESC']],
    limit,
    offset
  });

  return {
    record_books: rows.map(rb => ({
      record_book_id: rb.record_book_id,
      title: rb.title,
      hospital_name: rb.hospital ? rb.hospital.name : null,
      surgery_date: rb.surgery_date,
      created_at: rb.created_at
    })),
    pagination: { page: Number(page), limit: Number(limit), total: count }
  };
};

// 기록장 상세 조회
exports.getRecordBookDetail = async (recordBookId) => {
  const recordBook = await RecordBook.findByPk(recordBookId, {
    include: [
      { model: Hospital, as: 'hospital', attributes: ['name'] },
      {
        model: RecordBookSurgery,
        as: 'record_book_surgeries',
        include: [
            {
                model: Surgery, 
                as: 'surgery',
                attributes: ['surgery_id', 'detail'] 
            }
        ]
      }
    ]
  });

  if (!recordBook) throw new Error('기록장을 찾을 수 없습니다.');

  return {
    record_book_id: recordBook.record_book_id,
    title: recordBook.title,
    hospital_name: recordBook.hospital ? recordBook.hospital.name : null,
    surgery_date: recordBook.surgery_date,
    surgeries: recordBook.record_book_surgeries.map(rbs => ({
      surgery_id: rbs.Surgery.surgery_id,
      name: rbs.Surgery.name
    }))
  };
};

// 기록장 수정
exports.updateRecordBook = async (recordBookId, { title }) => {
  const [updated] = await RecordBook.update(
    { title },
    { where: { record_book_id: recordBookId } }
  );
  if (!updated) throw new Error('수정할 기록장이 없습니다.');
  return {
    record_book_id: Number(recordBookId),
    title,
    updated_at: new Date().toISOString()
  };
};

// 기록장 삭제
exports.deleteRecordBook = async (recordBookId) => {
  await RecordBook.destroy({ where: { record_book_id: recordBookId } });
};
