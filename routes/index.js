const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./user.routes'));
router.use('/hospitals', require('./hospital.routes'));
router.use('/surgery', require('./surgery.routes'));
router.use('/record-books', require('./record-book.routes'));
router.use('/consulations', require('./consulation.routes'));
router.use('/payments', require('./payment.routes'));
router.use('/articles', require('./article.routes'));
router.use('/notifications', require('./notification.routes'));
router.use('/admin', require('./admin.routes'));

module.exports = router;