import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompanyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  let response;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/')
      const id = response.data.id;
      navigate(`/${id}/post-job`);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate(`/${response.data.id}/post-job`, { replace: true });
  //   }
  // }, [navigate]);

  return (
    <div className="min-h-screen flex justify-between items-center px-8 lg:px-24 bg-white">
      <div className="w-1/2">
        <p className="text-gray-600 leading-relaxed max-w-md">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Company Login</h2>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <input
            className="block w-full mb-4 p-2 border rounded"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="block w-full mb-4 p-2 border rounded"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">Login</button>
        </form>
      </div>
    </div>
  );
};

export default CompanyLogin;
