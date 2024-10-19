import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('token');

      navigate('/login');
    };
    const isLogin = !!localStorage.getItem("token");
    return (
      <nav className="bg-white-600 p-4 text-black flex justify-between">
        <div className="text-xl"><h1 className="text-4xl font-bold text-blue-600">
          <span className="text-black">C</span>
          <span className="text-blue-600">u</span>
          <span className="text-black">v</span>
          <span className="text-blue-600">e</span>
          <span className="text-black">tte</span>
        </h1></div>
        <div className="space-x-4">
          {!isLogin ? (
            <>
              <Link to="/register" className="text-gray-600 font-semibold">Register</Link>
              <Link to="/login" className="text-gray-600 font-semibold">Login</Link>
              <Link to="/SendVerify" className="text-gray-600 font-semibold">Verify Email</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="ext-gray-600 font-semibold"
            >
              Logout
            </button>
          )}

        </div>
      </nav>
    );
  };

  export default Navbar;
