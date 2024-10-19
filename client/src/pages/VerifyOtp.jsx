import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/auth/verify/${email}/${otp}`);
      alert('Otp Verification successful!');
      navigate('/login');
    } catch (error) {
      alert(error.response.data.msg);
      console.error(error.response.data);
    }
    setOtp('');
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/send', { email });
      alert('Otp sent Successfully');
      setOtpSent(true);
    } catch (error) {
      alert(error.response.data.msg);
      console.error(error.response.data);
      setOtpSent(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-between items-center px-8 lg:px-24 bg-white">
      <div className="w-1/2">
        <p className="text-gray-600 leading-relaxed max-w-md">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {!otpSent ?
          <>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Enter Email</h2>
            <p className="text-center text-sm text-gray-500 mb-6">Enter the Email to send Otp.</p>
            <form onSubmit={handleOtp} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                />
                <span className="absolute left-4 top-4 text-gray-400">
                  <i className="fas fa-key"></i>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Send OTP
              </button>
            </form>
          </>
          :
          <>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Enter Otp</h2>
            <p className="text-center text-sm text-gray-500 mb-6">Enter the Otp to verify.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="otp"
                  className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
                <span className="absolute left-4 top-4 text-gray-400">
                  <i className="fas fa-key"></i>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Verify OTP
              </button>
            </form>
          </>
        }
      </div>
    </div>
  );
};

export default VerifyOtp;
