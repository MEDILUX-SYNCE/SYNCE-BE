const express = require('express');
const router = express.Router();

router.use('/record-books', require('./recordBooks'));
router.use('/record-entries', require('./recordEntries'));

module.exports = router;