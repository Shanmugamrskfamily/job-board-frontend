import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function ResetPassword() {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/,
        'Password must contain at least one uppercase letter, one number, and one special character'
      ),
    confirmNewPassword: Yup.string()
      .required('Confirm New Password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/reset-password/${resetToken}`, {
        newPassword: values.newPassword,
      });
      setSubmitting(false);
      toast.success('Password reset successfully. Please login with your new password.');
      navigate('/login');
    } catch (error) {
      setSubmitting(false);
      toast.error('Failed to reset password. Please try again.');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex max-w-4xl w-full">
        <div className="w-1/2">
          {/* Left side reset image */}
          <img src="./images/forgot.png" alt="Reset Password" className="w-full h-auto" />
        </div>
        <div className="w-1/2">
          {/* Right side reset password form */}
          <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-3xl font-bold text-center mb-4">Reset Password</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <Field type="password" name="newPassword" className="form-input mt-1 block w-full" />
                    <ErrorMessage name="newPassword" component="div" className="text-red-500 mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <Field type="password" name="confirmNewPassword" className="form-input mt-1 block w-full" />
                    <ErrorMessage name="confirmNewPassword" component="div" className="text-red-500 mt-1" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 text-white w-full py-2 rounded"
                  >
                    {isSubmitting ? (
                      <ClipLoader size={20} color="#ffffff" loading={true} />
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
