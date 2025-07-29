import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import sendOtp from '../utils/sendOtp.js';

export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    let user = await User.findOne({ email });
    if (!user) user = new User({ email, otp });
    else user.otp = otp;

    await user.save();
    await sendOtp(email, otp);

    res.json({ message: 'OTP sent' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, dob, email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      res.status(400).json({ message: 'Invalid OTP' });
      return;
    }

    user.name = name;
    user.dob = dob;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    res.json({ token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logIn = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      res.status(400).json({ message: 'Invalid OTP' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
