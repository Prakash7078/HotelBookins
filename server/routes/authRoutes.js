import { Router } from 'express';
import {isAuth} from '../middleware/auth.js';
import { login, signup, updateProfile } from "../controllers/authController.js";
const router=Router();

router.post('/login',login);
router.post('/signup',signup);
router.patch('/profile',isAuth,updateProfile);
export default router;
