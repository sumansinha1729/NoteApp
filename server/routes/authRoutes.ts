import express from 'express';
import { getMe, logIn, sendOTP, signUp } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/send-otp', sendOTP);
authRouter.post('/signup', signUp);
authRouter.post('/signin', logIn);
authRouter.get('/me',authMiddleware,getMe)

export default authRouter;
