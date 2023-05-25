const express = require('express');
const router = express.Router();
const showCandidates = require('../../controllers/candidates/showCandidates');
router.get('/:id', showCandidates);
module.exports = router;
