import React, { useState } from 'react'
import { authContext } from './context/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import ForgetPassword from './pages/forgetpassword'
import Loading from './components/Loading'


function App() {
  
  const {user, loading} = React.useContext(authContext)

  if(loading){
    return <Loading/>
  }

  function check(){
    if(user.data){
      return <Home/>
    }else{
      return <Login/>
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={check()}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forget-password" element={<ForgetPassword/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
