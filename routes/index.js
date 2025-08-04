const express = require('express');
const router = express.Router();

router.use('/record-books', require('./recordBooks'));
router.use('/record-entries', require('./recordEntries'));

router.use('/auth', require('./authRoutes'));

module.exports = router;