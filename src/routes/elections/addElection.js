const express = require('express');
const router = express.Router();
const addElection = require('../../controllers/elections/addElection');
router.post('/', addElection);
module.exports = router;
