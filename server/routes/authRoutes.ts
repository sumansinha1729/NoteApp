import express from 'express';
import { logIn, sendOTP, signUp } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/send-otp', sendOTP);
authRouter.post('/signup', signUp);
authRouter.post('/login', logIn);

export default authRouter;
