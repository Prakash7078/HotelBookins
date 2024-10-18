import expressAsyncHandler from "express-async-handler";
import Hotel from "../models/hotel.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const addHotel=expressAsyncHandler(async(req,res)=>{
    const newHotel=new Hotel({
        title:req.body.title,
        contact:req.body.contact,
        content:req.body.content,
        country:req.body.country,
        region:req.body.region,
        images:[],  // Add uploaded image URLs here.  (Note: You will need to implement upload middleware first)  // This is a placeholder, you will need to add logic to save uploaded images to AWS S3.
        location:req.body.location,
        price:req.body.price,
        rooms:req.body.rooms,
    })
    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
            await uploadImage("hotels",file);
        }
        const imageUrls = req.files.map(
            (file) =>
              `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/hotels/${file.originalname}`
          );
    
        newHotel.images = imageUrls;
    }
   
    await newHotel.save();
    res.status(200).json({ message: "add Hotel succesfully" });

})
export {addHotel};