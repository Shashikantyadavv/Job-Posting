import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import CompanyRegister from './pages/CompanyRegister';
import Verify from './pages/Verify';
import CompanyLogin from './pages/CompanyLogin';
import JobPost from './pages/JobPost';
import VerifyOtp from './pages/VerifyOtp';
import Navbar from './components/Navbar';

const App = () => {
  const token = localStorage.getItem('token');

  const isTokenValid = (token) => {
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime; 
  };

  const ProtectedRoute = ({ element }) => {
    return isTokenValid(token) ? element : <Navigate to="/login" />;
  };

  useEffect(() => {
    if (token && !isTokenValid(token)) {
      localStorage.removeItem('token'); 
      window.location.href = '/login'; 
    }
  }, [token]);

  const decodedToken = token ? jwtDecode(token) : null;
  const id = decodedToken ? decodedToken.companyId : null; 

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to={`/${id}/post-job`} replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/register" element={<CompanyRegister />} />
        <Route path="/verify/:email" element={<Verify />} />
        <Route path="/login" element={<CompanyLogin />} />
        <Route path="/:id/post-job" element={<ProtectedRoute element={<JobPost />} />} /> 
        <Route path="/SendVerify" element={<VerifyOtp />} />
      </Routes>
    </Router>
  );
};

export default App;
