import React, { useEffect } from 'react'
import Sidebar from './SidebarBlock/Sidebar'
import ChatArea from './ChatArea'
import WelcomeArea from './WelcomeArea'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useSocket from '../hooks/userSocket'
import { io } from 'socket.io-client';
const ENDPOINT="http://localhost:5000"
import { addMessageToLatestMessage, deleteMessageFromLatestMessage } from '../Features/latestMessagesSlice';
import {setSendMessage} from "../Features/sendMessageSlice"


const MainContainer = () => {
  const lightTheme=useSelector((state)=>state.themeKey);
  const auth=useSelector((state)=>state.authKey);
  const {socket,setSocket}=useSocket();
  const location=useLocation();
  const dispatch=useDispatch();

  useEffect(()=>{
    if(!socket){
      setSocket(io(ENDPOINT));
      
    }
    
  },[])

  useEffect(()=>{
    if(socket && auth){
      socket.emit("setup",auth);
    }
  },[socket,auth])

  // new notification check
  useEffect(()=>{
    const chatId=location?.pathname?.split("chat/").at(-1);
    console.log("checking for new notification................");
    
    socket && socket.on("notification received",(lastMessage)=>{
           console.log("something happended.....................");
      
      //you are in the chat for which you received notification
      if(chatId && chatId==lastMessage.chat._id){
        // dispatch(deleteMessageFromLatestMessage(chatId));
      }

      //currently in other chat
      // else{
      //     dispatch(addMessageToLatestMessage(lastMessage));
      // }
      dispatch(addMessageToLatestMessage(lastMessage));

      
  })

    return () => {
        if (socket) {
            socket.off("notification received");
        }
    };
    
},[socket,location])

  

  return (
    <div className={`md:w-[90vw] md:h-[90vh] w-full h-screen flex rounded-2xl shadow-sm ${!lightTheme?'bg-[#252323c5]':'bg-[#f4f5f8] '}`}>
        <Sidebar />
        <Outlet />
        
    </div>
  )
}

export default MainContainer