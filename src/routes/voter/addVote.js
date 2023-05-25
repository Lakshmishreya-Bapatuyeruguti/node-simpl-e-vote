const express = require('express');
const router = express.Router();
const addVote = require('../../controllers/voter/addVote');
router.put('/:address', addVote);
module.exports = router;
