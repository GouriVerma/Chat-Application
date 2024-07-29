import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import WelcomeArea from './WelcomeArea'

const MainContainer = () => {
  
  return (
    <div className='bg-[#f4f5f8] w-[90vw] h-[90vh] flex rounded-2xl shadow-sm'>
        <Sidebar />

        <WelcomeArea />
        {/* <ChatArea props={{"name":"Soniya","timeStamp":"today"}} /> */}
    </div>
  )
}

export default MainContainer