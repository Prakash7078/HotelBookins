import User from "../models/userModel.js";
import {generateToken} from "../middleware/utils.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
const login=expressAsyncHandler(async (req, res) => {
    const user=await User.findOne({email: req.body.data.email.toLowerCase()});
    if (!user) {
        res.status(403).send({ error: "user not found" });
      }
      if (bcrypt.compareSync(req.body.data.password, user.password)) {
        const token = generateToken(user);
        res.status(201).json({ token, user });
        return;
      }
      return res.status(401).send({ error: "Invalid Password" });

});
const updateProfile = async (req, res) => {
    const{id,username, email, mobile}=req.body;
    const user=await User.findByIdAndUpdate(id,{ email: email, mobile: mobile,username: username});
    user.save();
    return res
    .status(StatusCodes.OK)
    .json({ user: user, message: "Profile Update Succesfully" });
}
const signup=expressAsyncHandler(async (req, res) => {
    const {name,email,password,mobile,admin} = req.body;
    const existingUser=await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }
    const newUser=new User({
        username:name,
        email: email.toLowerCase(),
        mobile,
        password: bcrypt.hashSync(password),
        isAdmin:admin,
    });
    const token=generateToken(newUser);
    const user=await newUser.save();
    return res.status(201).json({token,user});
});
export {signup,login,updateProfile};
