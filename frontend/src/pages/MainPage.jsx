import React from 'react'
import MainContainer from '../components/MainContainer'
import { useSelector } from 'react-redux';

const MainPage = () => {
  const lightTheme=useSelector((state)=>state.themeKey);
  return (
    <div className= {`min-h-screen flex justify-center items-center ${!lightTheme?'dark':'bg-[#dddedd]'}`}>
        <MainContainer />
    </div>
  )
}

export default MainPage