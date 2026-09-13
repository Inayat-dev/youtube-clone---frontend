import { useContext } from 'react'
import logo from "../assets/images/logo.png"
import defaultLogo from "../assets/images/default_profile.png"
import { authContext } from '../context/AuthContext'

export default function Header() {
  const { user } = useContext(authContext)

  

  return (
    <header className="Header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="search-bar">
        <input type="text" className="search-bar-input" placeholder="Search" />
      </div>

      <div className="small-profile">
        <img
          src={user?.data?.avatar ? user?.data?.avatar:defaultLogo }
          alt={user?.data?.username || "profile"}
          className="avatar"
        />
        <span>{user?.data?.username ? user?.data?.username:"Guest"}</span>
      </div>
    </header>
  )
}