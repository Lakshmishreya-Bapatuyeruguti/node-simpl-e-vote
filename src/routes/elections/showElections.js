const express = require('express');
const router = express.Router();
const showElections = require('../../controllers/elections/showElections');
const showElectionValidation = require('../../validation/validators/elections/showElectionValidation');
router.get('/:networkname', showElectionValidation, showElections);
module.exports = router;
