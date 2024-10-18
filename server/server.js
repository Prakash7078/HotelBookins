import { createServer } from 'http';
import cors from 'cors';
import { config } from 'dotenv';
import express, { json } from 'express';
import Stripe from 'stripe';
import connectDB from './db/connectdb.js';
import authRouter from './routes/authRoutes.js';
import multer from 'multer';
import adminRouter from './routes/adminRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
const app=express();
config();
app.use(cors());
app.use(json());

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB in bytes
  },
});

//secret api key
const stripe = Stripe(process.env.SECRET_KEY);



const calculateOrderAmount = (items) => {
    // Replace this with your actual calculation
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
app.use('/api/auth/',authRouter);
app.use('/api/hotels/',hotelRouter)
app.use("/api/admin",upload.array("images", 4), adminRouter);

// app.post('/create-checkout-session', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//           price: 'pi_3Q7rJtSEiKPvMbBJ1Z4QtfCf',
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
      
//     });
  
//     res.redirect(303, session.url);
//   });
  
const server = createServer(app);



const port = process.env.PORT || 4173;

// Start the server
const start = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

