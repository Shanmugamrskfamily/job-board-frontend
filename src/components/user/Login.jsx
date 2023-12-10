import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      // Store user information in local storage
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('profilePictureUrl', response.data.profilePictureUrl);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('token', response.data.token);

      // Display a success message
      toast.success('Login successful!');

      // Redirect to a dashboard or home page
      navigate('/dashboard'); // Replace '/dashboard' with the desired path
    } catch (error) {
      console.error('Error during login:', error.message);
      toast.error('Invalid email, username, or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="max-w-md w-full bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Identifier (Email or Username) */}
        <div className="mb-4">
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-600">
            Email or Username:
          </label>
          <input
            type="text"
            name="identifier"
            id="identifier"
            value={formData.identifier}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              Loading...
            </div>
          ) : (
            'Login'
          )}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Forgot Your Password?{' '}
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Reset Password here
          </a>
          </p>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
