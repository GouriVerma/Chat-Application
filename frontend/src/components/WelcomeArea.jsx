import React from 'react'
import chat from '../assets/chat.png'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';

const WelcomeArea = () => {
  const lightTheme=useSelector((state)=>state.themeKey);
  const location=useLocation();
  return (
    <div className={`hidden flex-[0.7] md:flex flex-col justify-center items-center gap-4 border-b-[8px] border-b-[#63d7b0] rounded-2xl  `}>
        <img src={chat} className='w-[600px] h-[300px] object-cover' alt="" />
        <p className={`${!lightTheme ? 'text-white':'text-[rgba(0,0,0,0.54)]'}`}>View and text directly to people present in chat rooms.</p>
        
    </div>
  )
}

export default WelcomeArea