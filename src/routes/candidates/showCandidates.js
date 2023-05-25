const express = require('express');
const router = express.Router();
const showCandidates = require('../../controllers/candidates/showCandidates');
const showCandidatesValidation = require('../../validation/validators/candidates/showCandidatesValidation');
router.get('/:id', showCandidatesValidation, showCandidates);
module.exports = router;
