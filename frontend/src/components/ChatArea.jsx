import { ArrowBack, Delete, Send } from '@mui/icons-material'
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useRef, useState } from 'react'
import MessageOthers from './MessageOthers'
import MessageSelf from './MessageSelf'

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cookies from "js-cookie"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { io } from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../assets/animation2.json";
import {motion,AnimatePresence} from "framer-motion";
import { addMessageToLatestMessage, deleteMessageFromLatestMessage } from '../Features/latestMessagesSlice';
import {setSendMessage} from "../Features/sendMessageSlice"
import useSocket from '../hooks/userSocket';

const GET_MESSAGES_URI="/message"
const ENDPOINT="http://localhost:5000"

// const tempChat={name:"Sample",timestamp:"today"}
// var socket;
var chatId
const ChatArea = () => {
    const axios=useAxiosPrivate();
    
    const lightTheme=useSelector((state)=>state.themeKey);
    const auth=useSelector((state)=>state.authKey);
    const {socket,setSocket}=useSocket();
    const dispatch=useDispatch();

    const location=useLocation();
     
    
    const [chat,setChat]=useState({chatName:"Sample",chat:{}});
    const [messages,setMessages]=useState([]);
    const [loading,setLoading]=useState(false);
    const [messageContent,setMessageContent]=useState("");  
    const [typing,setTyping]=useState(false);
    const [isTyping,setIsTyping]=useState(false);
    const [open,setOpen]=useState(false);
  
 
    

    const token=Cookies.get("accessToken");
    const config={headers:{Authorization:`Bearer ${token}`}};

    const scrollRef = useRef(null);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    

    //setup socket
    useEffect(()=>{
        
        socket && socket.emit("setup",auth);
        socket && socket.on("typing",(userId)=>{
            if(userId!=auth._id){
                setIsTyping(true);
            }
        });
        socket && socket.on("not typing",()=>setIsTyping(false));
        
    },[socket])


    //fetch messages
    useEffect(()=>{
        chatId=location?.pathname?.split("chat/").at(-1);
        const fetchMessages=async()=>{
            try {
                setLoading(true);
                const res=await axios.get( `/message/${chatId}`,config);
                console.log(res.data);
                setMessages(res.data);
                socket && socket?.emit("join chat",chatId);
            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false);
            }
        }
        fetchMessages();
        dispatch(deleteMessageFromLatestMessage(chatId));
        if(location?.state){
            setChat({...location.state});
            console.log(location.state);
        }
    },[location])


    //new messages check
    useEffect(()=>{
        console.log("checking for new message");   
        socket && socket.on("message received",(lastMessage)=>{
            
            //you are in the chat for which you received message
            console.log(chatId," ",lastMessage.chat._id);
            console.log(lastMessage);
            if(chatId==lastMessage.chat._id){
                setMessages((prevMessages) => {
                    if (!prevMessages || lastMessage?._id !== prevMessages?.at(-1)?._id) {
                        return [...prevMessages, lastMessage];
                    }
                    return prevMessages;
                });
            }

            
        })

            

            
        

        return () => {
            if (socket) {
                socket?.off("message received");
            }
        };
        
    },[location])

    

    //send message
    const sendMessage=async()=>{
        if(messageContent!=""){
            socket?.emit("not typing",chatId);
            try {
              //  setLoading(true);

                const res=await axios.post(`/message/${chatId}`,{content:messageContent},config);
                console.log(res.data);
                socket?.emit("new message",res.data);


                // socketConnectionStatus && socket.emit("new message",res.data);
                setMessages((prevMessages) => [...prevMessages, res.data]);
                setMessageContent("");
                dispatch(setSendMessage(true));
                dispatch(deleteMessageFromLatestMessage(chatId));
                
                
            } catch (error) {
                console.log(error);
            } //finally{
            //     setLoading(false);
            //     setMessageContent("");
            // }
        }
    }

    //handle text input
    const handleTextChange=(e)=>{
        setMessageContent(e.target.value);
        if(!socket) return;
        if(!typing){
            setTyping(true);
            socket?.emit("typing",{chatId,userId:auth?._id});
            // console.log("started");
        }

        let lastTypingTime=new Date().getTime();
        var timerLength=3000;
        setTimeout(() => {
            var timeNow=new Date().getTime();
            var timeDiff=timeNow-lastTypingTime;
            if(timeDiff>=timerLength){
                socket?.emit("not typing",chatId);
                setTyping(false);
                // console.log("stopped");
            }
        }, timerLength);


    }

    const User=({user})=>{
        return (
          <div
   
          key={user?._id} className={`flex space-x-2 p-2 items-center rounded-2xl ${!lightTheme?'bg-transparent hover:bg-[#252323c5] active:bg-[#2d2c2cc5]':'hover:bg-gray-100 active:bg-gray-50'}`}>
                <div>
                    {user.profilePicture? 
                    <img className='rounded-full w-10 h-10 object-cover' src={user.profilePicture.url} /> : 
                    <p className={`w-8 h-8 flex items-center justify-center  text-white text-3xl rounded-full font-semibold p-5 ${!lightTheme?'bg-[#5a5959]':'bg-[#d9d9d9]'}`}>{user.userName[0].toUpperCase()}</p>}
                    
                </div>
    
              <div className={`${!lightTheme && 'text-white'} flex-1 flex justify-between`}>
                  <p>{user?.userName}</p>
                  {chat?.chat?.groupAdmin==user?._id && <p className='text-xs text-[#035741f0] bg-[#03ab7e2f] px-1 border-[1px] rounded-sm border-[#03ab7ef0]'>Group Admin</p>}
              </div>
    
    
          
          </div>
        )
      }

  return (
    <div className='flex-1 md:flex-[0.7] flex flex-col gap-1.5' >

        <Backdrop open={loading}>
            {loading && <CircularProgress color='inherit' />}
        </Backdrop>


    {/* dialog box */}
    { chat?.chat?.isGroupChat &&
      <Dialog open={open}
      fullWidth={true}
      maxWidth='xs'
      className={`${!lightTheme && ''}`}
      >
        <DialogTitle className={`${!lightTheme && 'dark'}`}>{chat?.chatName}</DialogTitle>
        <DialogContent className={`${!lightTheme && 'dark'}`}>         
          

          <div>
            {chat?.chat?.users.map((user)=><User key={user?._id} user={user} />)}
          </div>
        </DialogContent>

        <DialogActions className={`${!lightTheme && 'dark'}`}>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    }

        {/* ChatArea Header */}
        <div className={`rounded-2xl p-2 m-2 flex items-center gap-2 ${!lightTheme? 'dark':'bg-white'}`} style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
            {/* icon */}
            <div className=''>
                {chat?.profilePicture ? 
                <img className='rounded-full w-10 h-10 object-cover' src={chat?.profilePicture?.url} /> : 
                <p className={`w-8 h-8 flex items-center justify-center text-white text-3xl rounded-full font-semibold p-5 ${!lightTheme?'bg-[#5a5959]':'bg-[#d9d9d9]'}`}>{chat?.chatName[0]?.toUpperCase()}</p>}
            
            </div>

            {/* name and timestamp */}
            <div className={`flex-1 ${chat?.chat?.isGroupChat && 'cursor-pointer'}`} onClick={()=>{chat?.chat?.isGroupChat && setOpen(true)}}>
                <p className={`font-semibold font-Hind ${!lightTheme?'':'text-[rgba(0,0,0,0.54)]'}`}>{chat?.chatName}</p>
                <p className={`text-xs ${!lightTheme?'text-[rgba(189,188,188,0.86)]':'text-[rgba(0,0,0,0.54)]'}`}></p>
            </div>

            {/* OptionsIcon */}
            {chat?.chat?.isGroupChat && 
            <IconButton onClick={()=>{chat?.chat?.isGroupChat && setOpen(true)}}>
                <MoreVertIcon className={`${!lightTheme?'text-white':''}`} />
            </IconButton>
            }
        </div>


        

        {/* Messages */}
        <div ref={scrollRef} className={`flex-1 mx-2 rounded-2xl overflow-y-scroll ${!lightTheme?'bg-[rgba(30,27,27,0.926)]':'bg-white '}`} style={{scrollbarWidth:"none",boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}} >
            {messages.map((message)=>message.sender._id==auth._id ? 
            <MessageSelf key={message._id} props={message} />: 
            <MessageOthers key={message._id} props={message} group={message?.chat?.isGroupChat}  />)}
        </div>

        {/* Text Input */}
        <div className={`p-2 rounded-2xl flex justify-between m-2 ${!lightTheme?'dark':'bg-white '}`} style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}} >
            {/* typing animation */}
            
           <div className='min-w-14'>
           <AnimatePresence>

            {isTyping &&   
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            

            >
                <Lottie width={50} height={40} options={defaultOptions} />
            </motion.div>  
            }

            </AnimatePresence>
            </div> 
            <input type="text" className={`outline-none text-[rgba(0,0,0,0.54)] ml-2 text-base flex-1 ${!lightTheme?'bg-transparent text-white':''}`} placeholder='Enter Message'
            onChange={(e)=>handleTextChange(e)}
            value={messageContent}
            spellCheck={false}
            onKeyDown={(e)=>{
                if(e.code=="Enter"){
                    sendMessage();
                }
            }}
            />
            <IconButton onClick={()=>sendMessage()}>
                <Send className={`${!lightTheme? '  text-white ':' '}`}  />
            </IconButton>
        </div>
    </div>
  )
}

export default ChatArea