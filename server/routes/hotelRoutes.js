import express from "express";
import { doPayment, doSaveBooking, getBookingById, getHotelById, getHotels } from "../controllers/hotelController.js";
import { isAuth } from "../middleware/auth.js";
const router = express.Router();
router.get("/allhotels", getHotels);
router.get("/hotel/:id", getHotelById);
router.post('/payment',isAuth,doPayment);
router.get('/booking/:id',isAuth, getBookingById);
router.post('/savebooking',isAuth,doSaveBooking);

export default router;