// ResetPassword.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa'; // Assuming you have a loading spinner component

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
        ),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // Send a request to reset the password
        await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
          newPassword: values.password,
        });
        toast.success('Password reset successful. You can now log in with your new password.');
        navigate('/login');
      } catch (error) {
        console.error('Error resetting password:', error.message);
        toast.error('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="max-w-md w-full border-white border-2 p-6 rounded-lg shadow-md" onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium ">
            New Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 ${
              formik.touched.password && formik.errors.password ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
