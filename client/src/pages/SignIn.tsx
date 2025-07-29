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

      if (!res.data.token) {
        console.log('No token received');
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
    <div className="flex flex-col md:flex-row w-full md:w-[1440px] h-screen mx-auto bg-white border border-[#333] rounded-[32px] font-['Inter'] overflow-hidden">
      {/* Left Column */}
      <div className="w-full md:w-[591px] h-full p-8 flex flex-col justify-center">
        {/* Logo + Heading */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-[28px] font-bold">Sign In</h2>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            Please login to continue to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="flex flex-col gap-4 w-full max-w-[399px]">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="otp"
            placeholder="OTP"
            value={form.otp}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-lg"
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
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-600">
            Need an account?{' '}
            <span
              onClick={() => navigate('/')}
              className="text-blue-600 font-semibold underline cursor-pointer"
            >
              Create one
            </span>
          </p>
        </form>
      </div>

      {/* Right Column (Desktop only) */}
      <div className="hidden md:block w-[849px] h-full">
        <img
          src="/right-column.svg"
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignIn;
