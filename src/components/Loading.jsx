import React from 'react'
import { LoaderCircle } from 'lucide-react';
import { authContext } from '../context/AuthContext';
import Logo from "../assets/images/logo.png"

export default function () {
    const {loading} = React.useContext(authContext)
    if(!loading){
        return null
    }
  return (
    <div className='main-loader' style={{height:"100vh",width:"100%"}}>
        <img src={Logo} style={{width:"200px"}} alt="" />
        <div className='sub-loader' style={{width:"fit-content"}}>
            <LoaderCircle size={100} />
        </div>
    </div>
  )
}
