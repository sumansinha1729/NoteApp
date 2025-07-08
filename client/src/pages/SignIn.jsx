import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const SignIn = () => {

    const [email,setEmail]=useState('');
    const [otp,setOtp]=useState('');
    const navigate=useNavigate();

    const sendOtp=async()=>{
        try {
            await API.post('/auth/send-otp',{email});
            alert('OTP sent!')
        } catch (error) {
            console.log("Failed to send otp, ",error)
            alert("Failed to send OTP")
        }
    };

    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
            const res=await API.post('/auth/login',{email,otp});
            localStorage.setItem('token',res.data.token);
            navigate('/dashboard')
        } catch (error) {
            console.log("Login failed");
            alert("Login failed")
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form onSubmit={handleLogin} className='p-6 shadow-md w-80'>
        <h2 className='text-xl font-bold mb-4'>Sign In</h2>
        <input
        type="email"
        placeholder='Email'
        className='w-full border p-2 mb-3'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <button onClick={sendOtp} type='button' className='mb-3 bg-gray-200 px-2 py-1'>Send OTP</button>

        <input 
        type="text"
        placeholder='OTP'
        className='w-full border p-2 mb-3'
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
        />
        <button type='submit' className='bg-blue-500 text-white px-4 py-2'>Login</button>
      </form>
    </div>
  )
}

export default SignIn
