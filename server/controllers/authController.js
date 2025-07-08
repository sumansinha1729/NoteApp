import User from "../models/User.js";
import sendOtp from "../utils/sendOtp.js";
import jwt from 'jsonwebtoken';

export const sendOTP=async(req,res)=>{
    const {email}=req.body;
    const otp=Math.floor(100000+Math.random()*900000).toString();

    let user=await User.findOne({email});
    if(!user) user=new User({email,otp});
    else user.otp=otp;

    await user.save();
    await sendOtp(email,otp);
    res.json({message:'OTP sent'});
};

export const signUp=async(req,res)=>{
    const {name,dob,email,otp}=req.body;
    const user=await User.findOne({email});
    if(!user || user.otp!==otp) return res.status(400).json({message:'Invalid OTP'});

    user.name=name;
    user.dob=dob;
    await user.save();

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);

    res.json({token});
};

export const logIn=async(req,res)=>{
    const {email,otp}=req.body;
    const user=await User.findOne({email});
    if(!user || user.otp!==otp) return res.status(400).json({message:'Invalid OTP'});
    
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.json({token});
};

