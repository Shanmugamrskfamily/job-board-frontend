import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/user/Signup';
import EmailVerification from './components/user/EmailVerification'; 
import Login from './components/user/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify/:token" element={<EmailVerification />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
