import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      role: 'jobSeeker',
      profilePicture: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
      role: Yup.string().required('Role is required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Cloudinary upload and user registration logic here
        const profilePictureUrl = await uploadToCloudinary();

        const userData = {
          username: values.username,
          email: values.email,
          password: values.password,
          role: values.role,
          profilePictureUrl,
        };

        const response = await axios.post('http://localhost:5000/api/auth/signup', userData);

        console.log('User registered successfully:', response.data);
        toast.success(`Signup successful✅. Check your email 📧 for verification Link.`);
      } catch (error) {
        console.error('Error registering user:', error.message);
        toast.error('User Already Exist!');
      } finally {
        setLoading(false);
        navigate('/login')
      }
    },
  });

  const handleFileChange = (e) => {
    formik.setFieldValue('profilePicture', e.target.files[0]);
  };

  const uploadToCloudinary = async () => {
    try {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append('file', formik.values.profilePicture);
      formDataCloudinary.append('upload_preset', 'txgf9z4m');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/da5lphikg/image/upload',
        formDataCloudinary
      );

      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error.message);
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="max-w-md w-full  p-6 rounded-lg shadow-md border-white border-2" onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium">
            Password:
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium">
            Role:
          </label>
          <select
            name="role"
            id="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="jobSeeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <div className="text-red-500 text-sm">{formik.errors.role}</div>
          )}
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-sm font-medium">
            Profile Picture:
          </label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            onChange={handleFileChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
