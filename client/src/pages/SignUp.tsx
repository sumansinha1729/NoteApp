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
    setForm({ ...form, [e.target.name]: e.target.value });
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
      console.error('Failed to Signup:', error);
      alert('Failed to Signup');
    }
  };

  return (
    <div className="bg-white w-[375px] h-[812px] border border-[#232323] rounded-[9px] mx-auto relative font-['Inter']">
      <img
        src="/StatusBar.svg"
        alt="Status Bar"
        className="absolute top-0 left-0 w-full h-[44px]"
      />
      <img
        src="/top.svg"
        alt="Top Header Bar"
        className="absolute top-[44px] left-0 w-full h-[56px]"
      />

      <h2 className="absolute top-[114px] left-[16px] w-[343px] h-[35px] text-center text-[32px] font-bold leading-[110%] tracking-[-0.04em] text-[#232323]">
        Sign up
      </h2>

      <p className="absolute top-[160px] left-[16px] w-[343px] h-[24px] text-center text-sm text-gray-500">
        Sign up to enjoy the feature of HD
      </p>

      <div className="absolute top-[210px] left-[16px] w-[343px] h-auto flex flex-col gap-[30px]">
        <form onSubmit={handleSignUp} className="flex flex-col gap-[20px] w-full">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {!otpSent ? (
            <button
              type="button"
              onClick={sendOtp}
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
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
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign up
              </button>
            </>
          )}
        </form>

        <p className="text-center text-sm text-[#666666]">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/signin')}
            className="text-blue-600 font-semibold underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>

      <img
        src="/HomeIndicator.svg"
        alt="Home Indicator"
        className="fixed bottom-0 w-[375px] h-[34px] z-10"
      />
    </div>
  );
};

export default SignUp;
