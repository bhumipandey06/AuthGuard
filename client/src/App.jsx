import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer} from 'react-toastify';
import QuotesPage from './pages/QuotesPage'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/email-verify' element={<EmailVerify/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path='/quotes' element={<QuotesPage/>} />
      </Routes>
    </div>
  )
}

export default App