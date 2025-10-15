const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../Controller/user.controller');

router.post('/sign-up', registerUser);
router.post('/login', loginUser);

module.exports = router;