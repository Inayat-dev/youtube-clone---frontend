import React, { useEffect, useState } from 'react'
import { authContext } from './context/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import Loading from './components/Loading'
import { NotificationProvider } from './context/Notificationcontext'
import Video from './pages/Video'
import LikedVideos from './pages/LikedVideos'
import History from './pages/History'


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
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={check()}/>
          <Route path="/login/:message/:username" element={<Login/>}/>
          <Route path="/login/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forget-password" element={<ForgetPassword/>}/>
          <Route path="/liked" element={<LikedVideos/>}/>
          <Route path="/video/:videoId" element={<Video/>}/>
          <Route path="/history" element={<History />}/>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  )
}

export default App
