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
      const res = await API.post<{ token: string }>('/auth/signin', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign-in failed:', error);
      alert('Sign-in failed');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white font-['Inter'] flex flex-col md:flex-row">
      {/* Mobile View */}
      <div className="relative md:hidden w-[375px] h-[812px] mx-auto border border-[#232323] rounded-[9px] overflow-hidden">
        <img src="/StatusBar.svg" alt="Status Bar" className="w-full h-[44px]" />
        <div className="flex flex-col items-center px-[16px] pt-[12px]">
          {/* Top */}
          <div className="flex items-center justify-center w-full h-[32px]">
            <img src="/top.svg" alt="Logo" className="h-6" />
          </div>

          {/* Sign In Heading */}
          <h1 className="text-[32px] font-bold text-[#232323] mt-[16px] text-center leading-[110%] tracking-[-0.04em]">
            Sign in
          </h1>

          {/* Description Text */}
          <p className="text-[16px] text-[#969696] mt-[8px] text-center">
            Please login to continue to your account.
          </p>

          {/* Form Section */}
          <form onSubmit={handleSignIn} className="w-full flex flex-col gap-[24px] mt-[20px]">
            <div className="flex flex-col gap-[20px]">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full h-[52px] px-[16px] border border-[#367AFF] rounded-[10px]"
                required
              />
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                value={form.otp}
                onChange={handleChange}
                className="w-full h-[52px] px-[16px] border border-[#D9D9D9] rounded-[10px]"
                required
              />

              <span
                onClick={sendOtp}
                className="text-[#367AFF] text-sm font-medium cursor-pointer hover:underline"
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
                className="w-full h-[52px] bg-[#367AFF] text-white font-medium rounded-[10px]"
              >
                Sign In
              </button>
            </div>

            <p className="text-center text-[14px] text-[#969696]">
              Need an account?{' '}
              <span
                onClick={() => navigate('/')}
                className="text-[#367AFF] font-semibold underline cursor-pointer"
              >
                Create one
              </span>
            </p>
          </form>
        </div>

        {/* Native Home Indicator */}
        <div className="absolute bottom-0 w-full">
          <img src="/HomeIndicator.svg" alt="Home Indicator" className="w-full h-[34px]" />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex w-full h-screen bg-white border border-[#333] rounded-[32px] overflow-hidden">
        {/* Left Column */}
        <div className="w-[591px] h-full p-[32px] flex flex-col justify-start ml-10">
          <div className="w-[343px] h-[32px] mb-[32px]">
            <img src="/top.svg" alt="Top Logo" className="h-full" />
          </div>

          <div className="max-w-[399px]">
            <h2 className="text-[32px] font-bold text-[#232323]">Sign in</h2>
            <p className="text-[16px] text-[#969696] mt-[8px]">Please login to continue to your account.</p>

            <form onSubmit={handleSignIn} className="flex flex-col gap-[24px] mt-[20px]">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full h-[52px] px-[16px] border border-[#367AFF] rounded-[10px]"
                required
              />
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                value={form.otp}
                onChange={handleChange}
                className="w-full h-[52px] px-[16px] border border-[#D9D9D9] rounded-[10px]"
                required
              />

              <span
                onClick={sendOtp}
                className="text-[#367AFF] text-sm font-medium cursor-pointer hover:underline"
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
                className="w-full h-[52px] bg-[#367AFF] text-white font-medium rounded-[10px]"
              >
                Sign In
              </button>
              <p className="text-center text-[14px] text-[#969696]">
                Need an account?{' '}
                <span
                  onClick={() => navigate('/')}
                  className="text-[#367AFF] font-semibold underline cursor-pointer"
                >
                  Create one
                </span>
              </p>
            </form>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 h-full">
          <img
            src="/right-column.svg"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
