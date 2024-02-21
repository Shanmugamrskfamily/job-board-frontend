import { ToastContainer } from 'react-toastify'
import './App.css'
import SignUp from './Auth/Signup';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

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
      </Routes>
    </div>
      </BrowserRouter>
  )
}

export default App
