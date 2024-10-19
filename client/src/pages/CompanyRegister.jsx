import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompanyRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    email: '',
    password: '',
    employeeSize: '',
  });
  const navigate = useNavigate();

  const { name, companyName, email, password, phone, employeeSize } = formData;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration successful! Please verify your email and Phone.');
      navigate(`/verify/${email}`);
    } catch (error) {
      alert(error.response.data.msg);
      console.error(error.response.data);
    }

    setFormData({
      name: '',
      phone: '',
      companyName: '',
      email: '',
      password: '',
      employeeSize: '',
    });
  };

  return (
    <div className="min-h-screen flex justify-between items-center px-8 lg:px-24 bg-white">
      <div className="w-1/2">
        <p className="text-gray-600 leading-relaxed max-w-md">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Sign Up</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Lorem Ipsum is simply dummy text</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <span className="absolute left-4 top-4 text-gray-400">
              <i className="fas fa-user"></i>
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              name="phone"
              className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phone}
              onChange={handleChange}
              placeholder="Phone no."
              required
            />
            <span className="absolute left-4 top-4 text-gray-400">
              <i className="fas fa-phone"></i>
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              name="companyName"
              value={companyName}
              className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Name"
              onChange={handleChange}
            />
            <span className="absolute left-4 top-4 text-gray-400">
              <i className="fas fa-building"></i>
            </span>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Email"
              required
            />
            <span className="absolute left-4 top-4 text-gray-400">
              <i className="fas fa-envelope"></i>
            </span>
          </div>

          <div className="relative">
            <input
              type="number"
              className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Employee Size"
              name="employeeSize"
              value={employeeSize}
              onChange={handleChange}
              required
            />
            <span className="absolute left-4 top-4 text-gray-400">
              <i className="fas fa-users"></i>
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
            <span className="absolute left-4 top-4 text-gray-400">
              <i className="fas fa-lock"></i>
            </span>
          </div>

          <p className="text-gray-500 text-sm text-center">
            By clicking on proceed you will accept our
            <a href="#" className="text-blue-500"> Terms & Conditions</a>
          </p>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegister;
