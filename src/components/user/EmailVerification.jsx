import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
        toast.success(response.data);
        // If verification is successful, navigate to the login page
        navigate('/login');
      } catch (error) {
        console.error('Error verifying email:', error.message);
        toast.error('Email verification failed. Please try again.');
        // If verification fails, you might want to redirect to an error page or handle it differently
      }
    };

    // Call the function to verify the email when the component mounts
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl font-semibold">Verifying your email...</p>
    </div>
  );
};

export default EmailVerification;
