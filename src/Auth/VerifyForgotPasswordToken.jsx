import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function VerifyForgotPasswordToken() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyResetToken = async () => {
      try {
        await axios.get(`http://localhost:5000/api/auth/reset-password-verify/${resetToken}`);
        setLoading(false);
        navigate(`/reset-password/${resetToken}`);
      } catch (error) {
        setLoading(false);
        toast.error('Invalid or expired reset token. Please try again.');
        console.error('Error verifying reset token:', error);
      }
    };

    verifyResetToken();
  }, [resetToken, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        {loading ? (
          <ClipLoader size={50} color="#4F46E5" loading={true} />
        ) : (
          <p>Verifying reset token...</p>
        )}
      </div>
    </div>
  );
}

export default VerifyForgotPasswordToken;
