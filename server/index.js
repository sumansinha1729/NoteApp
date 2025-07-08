import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app=express();
app.use(cors());
app.use(express.json());


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is listening on port: ${PORT}`)
});

