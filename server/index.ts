import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import noteRouter from './routes/noteRoutes.js';

dotenv.config();
connectDB();

const app=express();
app.use(cors({
  origin: ['http://localhost:5173','https://note-app-taupe-five.vercel.app'],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/notes',noteRouter);


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is listening on port: ${PORT}`)
});

