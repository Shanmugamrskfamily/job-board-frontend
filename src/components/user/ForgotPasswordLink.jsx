// ForgotPasswordLink.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPasswordLink = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyLink = async () => {
      try {
        await axios.get(`http://localhost:5000/api/auth/reset-password-verify/${token}`);
        setLoading(false);
        navigate(`/reset-password/${token}`);
      } catch (error) {
        console.error('Error verifying reset password link:', error.message);
        toast.error('Invalid or expired link. Please try again.');
        navigate('/login');
      }
    };

    verifyLink();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <p>Verifying link...</p>
      ) : (
        <p className="text-green-600 font-bold">Link verified successfully. You can now reset your password.</p>
      )}
    </div>
  );
};

export default ForgotPasswordLink;
