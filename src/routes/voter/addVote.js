const express = require('express');
const router = express.Router();
const addVote = require('../../controllers/voter/addVote');
const addVoteValidation = require('../../validation/validators/voter/addVoteValidation');
router.put('/:address/:id', addVoteValidation, addVote);
module.exports = router;
