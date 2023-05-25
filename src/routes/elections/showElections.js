const express = require('express');
const router = express.Router();
const showElections = require('../../controllers/elections/showElections');
router.get('/:networkname', showElections);
module.exports = router;
