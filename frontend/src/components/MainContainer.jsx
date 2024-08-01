import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import WelcomeArea from './WelcomeArea'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MainContainer = () => {
  const lightTheme=useSelector((state)=>state.themeKey);
  return (
    <div className={`md:w-[90vw] md:h-[90vh] w-full h-screen flex rounded-2xl shadow-sm ${!lightTheme?'bg-[#252323c5]':'bg-[#f4f5f8] '}`}>
        <Sidebar />
        <Outlet />
        
    </div>
  )
}

export default MainContainer