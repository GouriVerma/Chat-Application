import React, { useState } from 'react'
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GroupAdd, PersonAdd, AddCircle, Nightlight, Search, LightMode } from '@mui/icons-material';
import ConversationItems from './ConversationItems';
import GroupChat from './GroupChat';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import OnlineUsers from './OnlineUsers';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';
import {AnimatePresence, motion} from "framer-motion"


const Sidebar = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    console.log(location.pathname.split('chat/').length);
    
    const [activeTab,setActiveTab]=useState("allChats");
    const lightTheme=useSelector((state)=>state.themeKey);
    const [conversations,setConversations]=useState([
        {
            id:"#1",
            name:"Test#1",
            lastMessage:"Last Message #1",
            timeStamp:"today"
        },
        {
            id:"#2",
            name:"Test#2",
            lastMessage:"Last Message #2",
            timeStamp:"today"
        },
        {
            id:"#3",
            name:"Test#3",
            lastMessage:"Last Message #3",
            timeStamp:"today"
        },
    ])
    const [groupConversations,setGroupConversations]=useState([
        {
            id:"#1",
            name:"Test#1",
            lastMessage:"Last Message #1",
            timeStamp:"today",
            sender:"Hari"
        },
        {
            id:"#2",
            name:"Test#2",
            lastMessage:"Last Message #2",
            timeStamp:"today",
            sender:"Hariom"
        },
        {
            id:"#3",
            name:"Test#3",
            lastMessage:"Last Message #3",
            timeStamp:"today",
            sender:"Gouri"
        },
    ])

  

  return (
    <div className={` ${location.pathname.split('/chat').length>1 && 'hidden md:flex'} flex-1 md:flex-[0.3] flex flex-col `}>
        
        {/* header */}
        <div className={`rounded-2xl flex justify-between m-2 px-1 py-2 ${!lightTheme? '  dark':'bg-white '}`}style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
            <div>
                <IconButton >
                    <AccountCircleIcon className={`${!lightTheme? '  text-white ':' '}`} />
                </IconButton>
            </div>
            <div>
                <IconButton>
                    <PersonAdd className={`${!lightTheme? '  text-white ':' '}`} />
                </IconButton>
                <IconButton onClick={()=>navigate(`/app/create-group`)}>
                    <GroupAdd className={`${!lightTheme? '  text-white ':' '}`}/>
                </IconButton>
                <IconButton>
                    <AddCircle className={`${!lightTheme? '  text-white ':' '}`}/>
                </IconButton>
                <IconButton onClick={()=>dispatch(toggleTheme())}>
                    {lightTheme? <Nightlight className={`${!lightTheme? '  text-white ':' '}`}/>: <LightMode className={`${!lightTheme? '  text-white ':' '}`}/>}
                </IconButton>
            </div>
        </div>

        {/* search */}
        <div className={`m-2  rounded-2xl py-1 px-2 flex items-center gap-2 ${!lightTheme? '  dark ':' bg-white'}`} style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
            <IconButton>
                <Search className={`${!lightTheme? '  text-white ':' '}`}/>
            </IconButton>
            <input type="text" placeholder='Search' className={`outline-none flex-1 bg-transparent ${!lightTheme? ' ':' '}`} />
        </div>

        

        {/* conversations */}
        <div key={activeTab} className={`m-2 rounded-2xl py-1 px-2 flex-1 overflow-y-scroll ${!lightTheme ? 'dark':'bg-white '}`} style={{scrollbarWidth:"none",boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
            
            {/* links */}
            <div className='flex text-xs gap-4 p-1.5 ml-1'>
                <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}}>
                    <div>
                        <p className={` font-semibold cursor-pointer ${activeTab=="allChats" ? 'text-[#2d5f4f]':'text-gray-400'}`}
                        onClick={()=>setActiveTab("allChats")}>All Chats</p>
                    </div>
                </motion.div>

                <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}}>
                    <div>
                        <p className={`font-semibold cursor-pointer ${activeTab=="groups" ? 'text-[#2d5f4f]':'text-gray-400'}`}
                        onClick={()=>setActiveTab("groups")}>Groups</p>
                    </div>
                </motion.div>

                <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}}>
                    <div>
                        <p className={`font-semibold cursor-pointer ${activeTab=="onlineUsers" ? 'text-[#2d5f4f]':'text-gray-400'}`}
                        onClick={()=>setActiveTab("onlineUsers")}>Online</p>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    ease:"anticipate",
                    
                }}>
                    { activeTab=="allChats" &&
                    conversations.map((conversation)=><ConversationItems key={conversation.id} props={conversation} />)
                    }
                </motion.div>
            </AnimatePresence>
            
            <AnimatePresence>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                exit={{ opacity: 0 }}
                transition={{
                    ease:"anticipate",
                    
                }}>
                    { activeTab=="groups" &&
                        groupConversations.map((conversation)=><GroupChat key={conversation.id} props={conversation}/>) 
                    }

                </motion.div>
            </AnimatePresence>

        </div>

        
       
    </div>
  )
}

export default Sidebar