import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

interface SignInForm {
  email: string;
  otp: string;
  keepLoggedIn: boolean;
}

const SignIn: React.FC = () => {
  const [form, setForm] = useState<SignInForm>({
    email: '',
    otp: '',
    keepLoggedIn: false,
  });

    const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const sendOtp = async () => {
    try {
      await API.post('/auth/send-otp', { email: form.email });
      alert('OTP sent!');
    } catch (error) {
      console.error('Failed to send OTP:', error);
      alert('Failed to send OTP!');
    }
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await API.post<{ token: string }>('/auth/signin', {
        email: form.email,
        otp: form.otp,
        keepLoggedIn: form.keepLoggedIn,
      });
      if(!res.data.token){
        console.log("no token")
      }
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        alert('Login successful');
        navigate('/dashboard');
      } else {
        alert('Unexpected response from server');
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      alert('Sign-in failed');
    }
  };


  return (
    <div className="bg-white w-[375px] h-[812px] border border-[#232323] rounded-[9px] mx-auto relative font-['Inter']">
      {/* Status Bar */}
      <img
        src="/StatusBar.svg"
        alt="Status Bar"
        className="absolute top-0 left-0 w-full h-[44px]"
      />

      {/* Top Bar */}
      <img
        src="/top.svg"
        alt="Top"
        className="absolute top-[44px] left-0 w-full h-[56px]"
      />

      {/* Logo + Title */}
      <div className="absolute top-[110px] left-0 w-full flex flex-col items-center gap-2">
        <h2 className="text-[28px] font-bold">Sign In</h2>
        <p className="text-md text-gray-500">Please login to continue to your account.</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSignIn}
        className="absolute top-[210px] left-[16px] w-[343px] flex flex-col gap-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="otp"
          placeholder="OTP"
          value={form.otp}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />

        <span
          onClick={sendOtp}
          className="text-blue-600 text-sm font-medium cursor-pointer hover:underline"
        >
          Resend OTP
        </span>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="keepLoggedIn"
            checked={form.keepLoggedIn}
            onChange={handleChange}
          />
          Keep me logged in
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-[#666666]">
          Need an account??{' '}
          <span
            onClick={() => navigate('/')}
            className="text-blue-600 font-semibold underline cursor-pointer"
          >
            Create one
          </span>
        </p>
      </form>

      {/* Home Indicator */}
      <img
        src="/Home Indicator.svg"
        alt="Home Indicator"
        className="absolute bottom-0 left-0 w-full h-[34px]"
      />
    </div>
  );
};

export default SignIn;
