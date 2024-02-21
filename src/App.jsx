import { ToastContainer } from 'react-toastify'
import './App.css'
import SignUp from './Auth/Signup';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './Auth/Login';
import AccountActivation from './Auth/AccountActivation';
import ForgotPassword from './Auth/ForgotPassword';
import VerifyForgotPasswordToken from './Auth/VerifyForgotPasswordToken';
import ResetPassword from './Auth/ResetPassword';

function App() {


  return (
    <BrowserRouter>
    <div className='mb-5'>
      <div>
      <h1>APP</h1>
      </div>
      <ToastContainer autoClose={2000}/>
      <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/verify/:token' element={<AccountActivation/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/forgot-password-link/:resetToken' element={<VerifyForgotPasswordToken/>}/>
      <Route path='/reset-password/:resetToken' element={<ResetPassword/>}/>
      
      </Routes>
    </div>
      </BrowserRouter>
  )
}

export default App
