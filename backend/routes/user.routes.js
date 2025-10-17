import express from 'express'
const router = express.Router();
import { registerController, loginController, logoutController } from '../Controller/user.controller.js';

router.post('/signup', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);

export default router;