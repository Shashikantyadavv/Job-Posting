import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Verify = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { email } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(email,otp);
      await axios.post(`https://vercel.live/link/job-posting-nine.vercel.app?via=deployment-domains-list&p=1&page=/api/auth/verify/${email}/${otp}`);
      alert('Otp Verification successful!');
      navigate('/login');
    } catch (error) {
      alert(error.response.data.msg);
      console.error(error.response.data);
    }
    setOtp('');
  };

  return (
    <div className="min-h-screen flex justify-between items-center px-8 lg:px-24 bg-white">
      <div className="w-1/2">
        <p className="text-gray-600 leading-relaxed max-w-md">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Verify OTP</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Enter the OTP sent to your phone/email.</p>

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
            Submit OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
