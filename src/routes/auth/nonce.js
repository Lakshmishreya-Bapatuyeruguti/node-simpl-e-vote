const express = require('express');
const router = express.Router();
const userNonce = require('../../controllers/auth/nonce');
router.get('/', userNonce);
module.exports = router;
