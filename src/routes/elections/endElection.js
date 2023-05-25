const express = require('express');
const router = express.Router();
const endElection = require('../../controllers/elections/endElection');
router.put('/:id', endElection);
module.exports = router;
