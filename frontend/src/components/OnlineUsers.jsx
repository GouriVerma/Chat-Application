import React, { useEffect, useState } from 'react'
import useSocket from '../hooks/userSocket'

const OnlineUsers = () => {
  const {socket}=useSocket();
  const [onlineUsers,setOnlineUsers]=useState([]);
  useEffect(()=>{
    socket && socket.on("onlineUsers",(users)=>{
      console.log("hiiiiii");
      setOnlineUsers((prev)=>[...prev,...users]);
    })
    console.log(onlineUsers);

    return ()=>{
      socket.off("onlineUsers");
    }
  },[socket])

  return (
    <div>OnlineUsers</div>
  )
}

export default OnlineUsers