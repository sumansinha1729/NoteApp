import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

interface SignUpForm {
  name: string;
  dob: string;
  email: string;
  otp: string;
}

const SignUp: React.FC = () => {
  const [form, setForm] = useState<SignUpForm>({
    name: '',
    dob: '',
    email: '',
    otp: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const sendOtp = async () => {
    try {
      await API.post('/auth/send-otp', { email: form.email });
      alert('OTP sent!');
      setOtpSent(true);
    } catch (error) {
      console.error('Failed to send OTP:', error);
      alert('Failed to send OTP!');
    }
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await API.post<{ token: string }>('/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      alert('Account created');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to sign up:', error);
      alert('Failed to sign up');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white font-['Inter'] flex flex-col md:flex-row">
      {/* Mobile View */}
      <div className="relative md:hidden w-[375px] h-[812px] mx-auto border border-[#232323] rounded-[9px] overflow-hidden">
        {/* Native Status Bar */}
        <img src="/StatusBar.svg" alt="Status Bar" className="w-full h-[44px]" />
        <div className="flex flex-col items-center px-[16px] pt-[12px]">
          {/* Top */}
          <div className="flex items-center justify-center w-full h-[32px]">
            <img src="/top.svg" alt="Logo" className="h-6" />
          </div>
          {/* Sign Up Heading */}
          <h1 className="text-[32px] font-bold text-[#232323] mt-[16px] text-center leading-[110%] tracking-[-0.04em]">
            Sign up
          </h1>

          {/* Description Text */}
          <p className="text-[16px] text-[#969696] mt-[8px] text-center">
            Sign up to enjoy the feature of HD
          </p>

          {/* Frame 2 - Form Section */}
          <form onSubmit={handleSignUp} className="w-full flex flex-col gap-[24px] mt-[20px]">
            <div className="flex flex-col gap-[20px]">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full h-[52px] px-[16px] border border-[#D9D9D9] rounded-[10px]"
                required
              />
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full h-[52px] px-[16px] border border-[#D9D9D9] rounded-[10px]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full h-[52px] px-[16px] border border-[#367AFF] rounded-[10px]"
                required
              />
              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-full h-[52px] bg-[#367AFF] text-white font-medium rounded-[10px]"
                >
                  Get OTP
                </button>
              ) : (
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={form.otp}
                  onChange={handleChange}
                  className="w-full h-[52px] px-[16px] border border-[#D9D9D9] rounded-[10px]"
                  required
                />
              )}
            </div>

            <p className="text-center text-[14px] text-[#969696]">
              Already have an account?{' '}
              <span
                onClick={() => navigate('/signin')}
                className="text-[#367AFF] font-semibold underline cursor-pointer"
              >
                Sign in
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
          <div className="w-[343px] h-[32px] mb-[32px] flex items-center">
            <img src="/top1.svg" alt="Top Logo" className="h-full "/>
            <span className='font-bold text-[31px]'>HD</span>
          </div>

          <div className="max-w-[399px]">
            <h2 className="text-[32px] font-bold text-[#232323]">Sign up</h2>
            <p className="text-[16px] text-[#969696] mt-[8px]">Sign up to enjoy the feature of HD</p>

            <form onSubmit={handleSignUp} className="flex flex-col gap-[24px] mt-[20px]">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full h-[52px] px-[16px] border border-[#D9D9D9] rounded-[10px]"
                required
              />
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full h-[52px] px-[16px] border border-[#D9D9D9] rounded-[10px]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full h-[52px] px-[16px] border border-[#367AFF] rounded-[10px]"
                required
              />
              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-full h-[52px] bg-[#367AFF] text-white font-medium rounded-[10px]"
                >
                  Get OTP
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={form.otp}
                    onChange={handleChange}
                    className="w-full h-[52px] px-[16px] border border-[#D9D9D9] rounded-[10px]"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full h-[52px] bg-[#367AFF] text-white font-medium rounded-[10px]"
                  >
                    Sign Up
                  </button>
                </>
              )}
              <p className="text-center text-[14px] text-[#969696]">
                Already have an account?{' '}
                <span
                  onClick={() => navigate('/signin')}
                  className="text-[#367AFF] font-semibold underline cursor-pointer"
                >
                  Sign in
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

export default SignUp;

