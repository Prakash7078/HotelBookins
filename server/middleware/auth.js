import StatusCodes from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
const isAuth=asyncHandler(async(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(StatusCodes.BAD_REQUEST).json({ Error: "Please provide bearer token" });
    }
    const token=authHeader.split(' ')[1];
    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({ Error: "Invalid Token !" });
    }
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ Error: " Access Denied !" });
    }
});
export {isAuth};