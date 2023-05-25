const express = require('express');
const router = express.Router();
const endElection = require('../../controllers/elections/endElection');
const endElectionValidation = require('../../validation/validators/elections/endElectionValidation');
router.put('/:id', endElectionValidation, endElection);
module.exports = router;
