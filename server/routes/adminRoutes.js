import express from 'express';
import { addHotel } from '../controllers/adminController.js';
import { isAuth } from '../middleware/auth.js';
const router=express.Router();
router.post('/add-hotel',isAuth,addHotel)
export default router;