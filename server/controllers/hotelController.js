import expressAsyncHandler from "express-async-handler"
import Hotel from "../models/hotel.js"
import Stripe from "stripe";
import User from "../models/userModel.js";
import Booking from "../models/bookingsModel.js";
import {sendMail} from '../middleware/sendMail.js';
const getHotels=expressAsyncHandler(async(req,res)=>{
    const hotels=await Hotel.find({});
    return res.status(200).json(hotels);
})
const getHotelById=expressAsyncHandler(async(req,res)=>{
  const hotel_id=req.params.id;
  const hotel=await Hotel.findById(hotel_id);
  return res.status(200).json(hotel);
})
const getBookingById=expressAsyncHandler(async(req,res)=>{
  const user_id=req.params.id;
  const bookings=await Booking.find({user:user_id});
  return res.status(200).json(bookings);
});
const doSaveBooking=expressAsyncHandler(async(req,res)=>{
  const{id,price,user_id,checkIn,checkOut,paymentIntent}=req.body;
  console.log(id);
  const hotel=await Hotel.findById(id);
  const user=await User.findById(user_id);
     const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const millisecondsDifference = checkOutDate - checkInDate;
  const days = millisecondsDifference / (1000 * 60 * 60 * 24);
  // Create payment intent
  if (days === 0) {
    days = 1;
  }
  const totalamount=days*price;
  const booking=new Booking({
    user,
    hotel,
    price:totalamount,
    no_of_days: days,
    checkInDate,
    checkOutDate,
    payment_id: paymentIntent.id,
  })
  await booking.save();
  const newHotel=await Hotel.findByIdAndUpdate(id,{rooms:hotel.rooms-1});
  newHotel.save();
})

const doPayment=expressAsyncHandler(async(req,res)=>{
    const stripe = new Stripe(process.env.SECRET_KEY); // Initialize it with your secret key

    try {
        console.log(req.body);
        const{id,price,user_id,checkIn,checkOut}=req.body;
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const millisecondsDifference = checkOutDate - checkInDate;
        // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
        const days = millisecondsDifference / (1000 * 60 * 60 * 24);
        // Create payment intent
        if (days === 0) {
          days = 1;
        }
        const totalamount=days*price;
        const paymentIntent = await stripe.paymentIntents.create({
          amount:totalamount*100,
          currency: "usd",
          description: "Payment for hotel booking", // Add the description here
          automatic_payment_methods: {
            enabled: true,
          },
        });
        
        

        // await sendMail(user?.email,paymentIntent);
        //send payment intent through mail to user.
        res.json({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});
export {getHotels,doPayment,getHotelById, getBookingById,doSaveBooking};