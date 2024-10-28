import mongoose from "mongoose";
const booking=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    hotel:{type:mongoose.Schema.Types.ObjectId,ref:'Hotel'},
    price:{type:Number,required:true},
    roomtype:{type:String,required:true},
    no_of_days:{type:Number,required:true},
    checkInDate:{type:Date,required:true},
    checkOutDate:{type:Date,required:true},
    payment_id:{type:String,required:true},
},{
    timestamps:true,
})
const Booking=mongoose.model('Booking',booking);
export default Booking;