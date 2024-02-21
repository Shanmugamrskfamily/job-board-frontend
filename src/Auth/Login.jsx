import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleSubmit = async (values) => {
    

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/login', values);
      localStorage.setItem("userData", JSON.stringify(response.data));
      // Handle successful login
      console.log('Login successful:', response.data);
      console.log('Token: ', JSON.parse(localStorage.getItem("userData")).token);
      toast.success('Login successful!');
      navigate('/dashboard')
    } catch (error) {
      // Handle login error
      console.error('Error logging in:', error);
      toast.error(`Login Error: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col md:flex-row">
        <div className="max-w-md md:mr-8">
          {/* Left side login image */}
          <img
            src="./images/login.png"
            alt="Login"
            className="w-full h-auto"
          />
        </div>
        <div className="max-w-md md:ml-8">
          {/* Right side login form */}
          <h2 className="text-3xl text-center font-bold mb-4">Login</h2>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleSubmit}
          >
            {(
              <Form className="space-y-4">
                <div className="text-center">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 rounded border"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="text-center">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 rounded border"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded"
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={20} color={"#ffffff"} loading={true} />
                  ) : (
                    "Login"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
