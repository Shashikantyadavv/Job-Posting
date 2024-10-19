import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const JobPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: '',
    candidates: [],
    endDate: '',
  });
  const [company, setCompany] = useState({});
  const { id } = useParams();
  const getCompany = async () => {
    try {
      const response = await axios.get(`https://vercel.live/link/job-posting-nine.vercel.app?via=deployment-domains-list&p=1&page=/api/company/${id}`);
      setCompany(response.data);
    } catch (err) {
      setError('Failed to fetch company details.');
      console.error(err);
    }
  };

  useEffect(() => {
    getCompany();
  }, [id]);

  const [isFormVisible, setIsFormVisible] = useState(false); 

  const { title, description, experienceLevel, candidates, endDate } = formData;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCandidateChange = (e) => {
    const emails = e.target.value.split(',').map(email => email.trim());
    setFormData({ ...formData, candidates: emails });
  };

  const removeCandidate = (emailToRemove) => {
    const updatedCandidates = candidates.filter(email => email !== emailToRemove);
    setFormData({ ...formData, candidates: updatedCandidates });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: { 'x-auth-token': token },
    };

    try {
      await axios.post('https://vercel.live/link/job-posting-nine.vercel.app?via=deployment-domains-list&p=1&page=/api/jobs', { ...formData, company }, config);
      alert('Job posted and emails sent to candidates.');
      setFormData({
        title: '',
        description: '',
        experienceLevel: '',
        candidates: [],
        endDate: ''
      })
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center justify-between bg-white shadow-md p-2" style={{ width: '60px' }}>
        <FaHome
          className="text-xl text-gray-600 mb-2 cursor-pointer"
          onClick={() => {
            setIsFormVisible(false); 
          }}
        />
        <hr className="border-gray-300 w-full" />
      </div>

      <div className="flex-grow p-2 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          {!isFormVisible && ( 
            <button
              onClick={() => setIsFormVisible(true)} 
              className="bg-blue-600 text-white py-2 px-4 rounded"
            >
              Create Interview
            </button>
          )}
        </div>

        {isFormVisible && ( 
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl mb-4">Post a Job</h2>
            <input
              className="block w-full mb-4 p-2 border rounded"
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="Job Title"
              required
            />
            <textarea
              className="block w-full mb-4 p-2 border rounded h-32" 
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Job Description"
              required
            />
            <select
              className="block w-full mb-4 p-2 border rounded"
              name="experienceLevel"
              value={experienceLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select Experience Level</option>
              <option value="Fresher">Fresher</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4+ Years">4+ Years</option>
            </select>
            <div className="mb-4">
              <input
                className="block w-full p-2 border rounded mb-2"
                type="text"
                name="candidates"
                value={candidates.join(', ')}
                onChange={handleCandidateChange}
                placeholder="Candidate Emails (comma separated)"
                required
              />
              <div className="flex flex-wrap">
                {candidates.map((candidate, index) => (
                  <span key={index} className="flex items-center bg-gray-200 p-2 rounded mr-2 mb-2">
                    {candidate}
                    <MdClose onClick={() => removeCandidate(candidate)} className="text-red-500 cursor-pointer ml-2" />
                  </span>
                ))}
              </div>
            </div>
            <input
              className="block w-full mb-4 p-2 border rounded"
              type="date"
              name="endDate"
              value={endDate}
              onChange={handleChange}
              required
            />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">Post Job</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobPost;
