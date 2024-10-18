import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema=new mongoose.Schema(
    {
        username:{type: 'String',required: true},
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase:true,
        },      
        password:{type:String,required:true},
        mobile:{type:Number,required:true,length:10,validator: (value) => validator.isNumeric(value)},
        isAdmin:{type:Boolean,default:false,required:true},
    },{
        timestamps:true,
    }
);
const User=mongoose.model('User', userSchema);
export default User;