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
    <div className="flex flex-col md:flex-row w-full md:w-[1440px] h-screen mx-auto bg-white border border-[#333] rounded-[32px] font-['Inter'] overflow-hidden">
      {/* Left Column */}
      <div className="w-full md:w-[591px] h-full p-8 flex flex-col justify-center">
        {/* Logo + Heading */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-[28px] font-bold">Sign Up</h2>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            Sign up to enjoy the feature of HD.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-full max-w-[399px]">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {!otpSent ? (
            <button
              type="button"
              onClick={sendOtp}
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
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
                className="px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/signin')}
            className="text-blue-600 font-semibold underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
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

export default SignUp;
