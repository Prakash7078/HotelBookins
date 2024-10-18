import nodemailer from 'nodemailer';
import User from '../models/userModel.js';
// const Notifications = require("../models/notificationModel");
const sendMail=async(email,message)=>{
    try{
        //Create a transporter
        const userInfo=await User.findOne({email:email});
        // await Notifications.create({user: userInfo, text: message});

        const transporter=nodemailer.createTransport({
            service:"gmail",
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user:"chandraprakashbabu20@gmail.com",
                pass:process.env.PASS,
            },
        });
        const mailOptions={
            from:"chandraprakashbabu20@gmail.com",
            to:email,
            subject:"Message from My Bookings",
            text:`${message}`,
        };
        transporter.sendMail(mailOptions,(error)=>{
            if(error){
                console.log("Error occured while sending mail",error.message);
            }else{
                console.log("email sent");
                res.status(200).json({ message: "Email sent successfully from atoms" });
            }
        })
    } catch (err) {
        throw new Error(err.message);
    }

};
export {sendMail};