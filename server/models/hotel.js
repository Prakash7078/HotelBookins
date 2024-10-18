import mongoose from "mongoose";
const hotelSchema=new mongoose.Schema(
    {
        title: {type: String, required: true},
        contact: {type: String, required: true},  // Add phone number validation here.  (Note: You will need to implement a custom validator for phone number format)
        content: {type: String, required: true},
        country: {type: String, required: true},
        region: {type: String, required: true},
        location: {type:String},
        images: [
            {
              type: String,
              required:true,
            },
          ],
        price: {
            type: Number,
            required: true,
            trim: true,
          },
        rooms: {
            type: Number,
        },

    },{
        timestamps:true,
    }
)
const Hotel=mongoose.model('Hotel',hotelSchema);
export default Hotel;