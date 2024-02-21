import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/auth/forgot-password', values);
      setLoading(false);
      toast.success('Password reset email sent successfully!');
      // Redirect to login page after sending reset email
      navigate('/login');
    } catch (error) {
      setLoading(false);
      toast.error('Failed to send reset email. Please try again.');
      console.error('Error sending reset email:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col md:flex-row">
        <div className="max-w-md md:mr-8">
          {/* Left side forgot image */}
          <img src="./images/forgot.png" alt="Forgot Password" className="w-full h-auto" />
        </div>
        <div className="max-w-md md:ml-8">
          {/* Right side forgot form */}
          <h2 className="text-3xl text-center font-bold mb-4">Forgot Password</h2>
          <Formik
            initialValues={{
              email: '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4">
              <div className="text-center">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 rounded border"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={20} color="#ffffff" loading={true} />
                ) : (
                  'Send Reset Email'
                )}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
