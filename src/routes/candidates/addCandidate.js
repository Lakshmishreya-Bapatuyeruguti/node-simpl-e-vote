const express = require('express');
const router = express.Router();
const addCandidate = require('../../controllers/candidates/addCandidate');
router.post('/', addCandidate);
module.exports = router;
