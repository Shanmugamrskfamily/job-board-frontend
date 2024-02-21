import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState([]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", profilePictureUrl);
      formData.append("upload_preset", "txgf9z4m");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/da5lphikg/image/upload",
        formData
      );
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role:values.role,
        profilePictureUrl: response.data.secure_url,
      };

      await axios.post("http://localhost:5000/api/auth/signup", userData);

      // Reset form and loading state
      setLoading(false);
      setErrorMessage("");
      toast.success('Successfully Registered.. Kindly Check your Email for Verification Link!');
      navigate('/login');
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response.data.message);
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col md:flex-row">
        <div className="max-w-md md:mr-8">
          {/* Left side signup image */}
          <img
            src="./images/signup.png"
            alt="Signup"
            className="w-full h-auto"
          />
        </div>
        <div className="max-w-md md:ml-8">
          {/* Right side signup form */}
          <h2 className="text-3xl text-center font-bold mb-4">Create New Account</h2>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              role:"",
              confirmPassword: "",
              profilePictureUrl:"",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.firstName) {
                errors.firstName = "Required";
              }
              if (!values.lastName) {
                errors.lastName = "Required";
              }
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Required";
              } else if (
                !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{6,}/.test(
                  values.password
                )
              ) {
                errors.password =
                  "Password must contain at least 6 characters, 1 uppercase letter, 1 number, and 1 special character";
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = "Required";
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords must match";
              }
              if(!values.role){errors.role = "Required";}
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {(
              <Form className="space-y-4">
                <div className="text-center">
                <div className="flex flex-row">
                <i className="fa-solid text-2xl m-2 fa-user"></i>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full p-2 rounded border"
                  />
                  </div>
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="text-center">
                  <div className="flex flex-row">
                <i className="fa-regular text-2xl m-2 fa-user"></i><Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full p-2 rounded border"
                  />
                  </div>
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="text-center">
                <div className="flex flex-row">
                <i className="fa-solid text-2xl m-2 fa-envelope"></i><Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 rounded border"
                  />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="text-center">
                <div className="flex flex-row">
                <i className="fa-solid text-2xl m-2 fa-lock"></i>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 rounded border"
                  />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="text-center">
                <div className="flex flex-row">
                <i className="fa-solid text-2xl m-2 fa-lock"></i>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-2 rounded border"
                  />
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mt-4 text-center">
                <div className="flex flex-row">
                <i className="fa-solid text-2xl m-2 fa-people-roof"></i>
              <label htmlFor="role">Select Your Role: </label>
              <Field as="select" name="role" className="form-select border-2 ml-2">
                <option value="">Select Role</option>
                <option value="jobSeeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </Field>
              </div>
              <ErrorMessage
                    name="role"
                    component="div"
                    className="text-red-500"/>
            </div>
            <div className="text-center">
            <div className="flex flex-row">
            <i className="fa-solid text-2xl m-2 fa-image"></i>
            <label htmlFor="role" className="mr-3" >Profile Picture(Optional)</label>
                <input type="file" accept="image/*" onChange={(e) =>setProfilePictureUrl(e.target.files[0])} className="w-full mt-2"/>
                </div>
                <ErrorMessage
                    name="profilePicture"
                    component="div"
                    className="text-red-500"/>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded"
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={20} color={"#ffffff"} loading={true} />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
