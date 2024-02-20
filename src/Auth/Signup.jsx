import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ImageUpload } from './ImageUpload';

const Signup = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    profilePicture: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d@$!%*#?&]{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    role: Yup.string().required('Role is required'),
    profilePicture: Yup.string().required('Profile Picture is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', values);
      console.log('Signup successful:', response.data);
      // Optionally, you can redirect the user to another page or show a success message
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error, e.g., display error message to the user
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
        <div className="max-w-xs">
      <img src="path_to_your_image" alt="Signup" className="h-auto max-h-screen" />
    </div>
    <div className="max-w-lg w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-4">Signup</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="firstName">First Name</label>
                <Field type="text" name="firstName" className="form-input" />
                <ErrorMessage name="firstName" component="div" className="text-red-500 mt-1" />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <Field type="text" name="lastName" className="form-input" />
                <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1" />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-input" />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="form-input" />
              <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mt-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" name="confirmPassword" className="form-input" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mt-4">
              <label htmlFor="role">Role</label>
              <Field as="select" name="role" className="form-select">
                <option value="">Select Role</option>
                <option value="jobSeeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 mt-1" />
            </div>
            <ImageUpload name="profilePicture" />
            <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-4">
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
  );
};

export default Signup;
