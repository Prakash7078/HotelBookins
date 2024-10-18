import { Router } from 'express';
import {isAuth} from '../middleware/auth.js';
import { login, signup } from "../controllers/authController.js";
const router=Router();

router.post('/login',login);
router.post('/signup',signup);
export default router;
