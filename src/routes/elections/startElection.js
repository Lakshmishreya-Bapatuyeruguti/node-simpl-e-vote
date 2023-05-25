const express = require('express');
const router = express.Router();
const startElection = require('../../controllers/elections/startElection');
router.put('/', startElection);
module.exports = router;
