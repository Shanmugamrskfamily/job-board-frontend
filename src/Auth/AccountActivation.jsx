import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function AccountActivation() {
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response=await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
        console.log(response);
        setLoading(false);
        toast.success('Account activated successfully!');
        navigate('/login');

      } catch (error) {
        setLoading(false);
        toast.error(`Verification Error: ${error.response.data.message}`);
        console.error('Error activating account:', error);
      }
    };

    verifyAccount();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <ClipLoader size={50} color="#3B82F6" loading={true} />
      ) : (
        <div>Account Activation Successful!</div>
      )}
    </div>
  );
}

export default AccountActivation;
