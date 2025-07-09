const recordEntryService = require('../services/recordEntryService');

exports.createRecordEntry = async (req, res) => {
  try {
    const recordBookId = req.params.recordBookId;
    const result = await recordEntryService.createRecordEntry(recordBookId, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getRecordEntries = async (req, res) => {
  try {
    const recordBookId = req.params.recordBookId;
    const query = req.query;
    const result = await recordEntryService.getRecordEntries(recordBookId, query);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getRecordEntryDetail = async (req, res) => {
  try {
    const entryId = req.params.recordEntryId;
    const entry = await recordEntryService.getRecordEntryDetail(entryId);
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateRecordEntry = async (req, res) => {
  try {
    const entryId = req.params.recordEntryId;
    const result = await recordEntryService.updateRecordEntry(entryId, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRecordEntry = async (req, res) => {
  try {
    const entryId = req.params.recordEntryId;
    await recordEntryService.deleteRecordEntry(entryId);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
