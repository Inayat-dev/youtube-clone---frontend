import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loading from '../components/Loading'
import Videos from '../components/Videos'

export default function Home() {
  return (
    <div>
      <Loading/>
      <Header/>
      <div style={{display:"flex"}}>
        <Sidebar/>
        <Videos />
      </div>
    </div>
  )
}
