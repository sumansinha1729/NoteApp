import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const SignUp = () => {

    const [form,setForm]=useState({name:'',dob:'',email:'',otp:''});
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const sendOtp=async()=>{
        try {
            await API.post('/auth/send-otp',{email:form.email});
            alert('OTP sent!')
        } catch (error) {
            console.log("Failed to send OTP! ",error);
            alert("Failed to send OTP!");
        }
    };

    const handleSignUp=async(e)=>{
        e.preventDefault();
        try {
           await API.post('/auth/signup',form);
           alert("Account created");
           navigate('/')
        } catch (error) {
            console.log("Failed to Signup! ",error);
            alert("Failed to Signup")
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form onSubmit={handleSignUp} className='p-6 shadow-md w-80'>
        <h2 className='text-xl font-bold mb-4'>Sign Up</h2>
        <input 
        type="text"
        placeholder='Name'
        className='w-full border p-2 mb-3'
        onChange={handleChange}
        />
        <input 
        type="date"
        placeholder='dob'
        className='w-full border p-2 mb-3'
        onChange={handleChange}
        />
        <input 
        type="email"
        placeholder='Email'
        className='w-full border p-2 mb-3'
        onChange={handleChange}
        />
        <button onClick={sendOtp} type='button' className='mb-3 bg-gray-200 px-2 py-1'>Send OTP</button>
        <input 
        type="text"
        placeholder='OTP'
        className='w-full border p-2 mb-3'
        onChange={handleChange}
        />
        <button type='submit' className='bg-green-500 text-white px-4 py-2'>Sign up</button>
      </form>
    </div>
  )
}

export default SignUp
