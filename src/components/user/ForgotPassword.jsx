// ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa'; // Assuming you have a loading spinner component

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Send a request to initiate the forgot password process
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });

      toast.success('Password reset email sent. Check your email for instructions.');
    } catch (error) {
      console.error('Error sending forgot password email:', error.message);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="max-w-md w-full border-white border-2 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium ">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        ><span className='text-center'>
          {loading ? <FaSpinner className="animate-spin" /> : 'Send Reset Link'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
