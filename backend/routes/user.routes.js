import express from 'express'
const router = express.Router();
import validateToken from '../middleware/auth.middleware.js';
import { registerController, loginController, logoutController, updateProfileController,  } from '../Controller/user.controller.js';

router.post('/signup', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.put('/update-profile', validateToken, updateProfileController);
router.get('/check', validateToken, (req, res) => res.status(200).json(req.user));

export default router;