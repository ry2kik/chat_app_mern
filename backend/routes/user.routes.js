const express = require('express');
const router = express.Router();
const { registerController, loginController, logoutController } = require('../Controller/user.controller');

router.post('/signup', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);

module.exports = router;