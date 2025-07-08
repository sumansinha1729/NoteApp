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
    otp: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    try {
      await API.post('/auth/send-otp', { email: form.email });
      alert('OTP sent!');
    } catch (error) {
      console.error('Failed to send OTP: ', error);
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
      console.error('Failed to Signup: ', error);
      alert('Failed to Signup');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSignUp} className="p-6 shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="dob"
          name="dob"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />
        <button
          onClick={sendOtp}
          type="button"
          className="mb-3 bg-gray-200 px-2 py-1"
        >
          Send OTP
        </button>
        <input
          type="text"
          placeholder="OTP"
          name="otp"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
