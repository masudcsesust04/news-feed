import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axiosInstance.post('/signup', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      console.log(response.data);
      setSuccess(response.data.message || 'Registration successful!');
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 text-left" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 text-left" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 text-left" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight"
            placeholder="Create a password"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2 text-left" htmlFor="password_confirmation">
            Confirm Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:bg-blue-800 transition-colors duration-200"
          >
            Register
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors duration-200">Log in</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
