import { Delete, Send } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react'
import MessageOthers from './MessageOthers'
import MessageSelf from './MessageSelf'
import bgwhite from '../assets/bgwhite.jpg'
import { useSelector } from 'react-redux';

const ChatArea = () => {
    const lightTheme=useSelector((state)=>state.themeKey);
    const [chat,setChat]=useState({name:"Sample User",timestamp:"today"});

  return (
    <div className='flex-1 md:flex-[0.7] md:flex flex-col gap-1.5 h-full' >

        {/* ChatArea Header */}
        <div className={`rounded-2xl m-2 p-2 flex items-center gap-2 ${!lightTheme? 'dark':'bg-white'}`} style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
            {/* icon */}
            <div className='w-8 h-8 flex items-center justify-center bg-[#d9d9d9] text-white text-3xl rounded-full font-semibold p-5'>
                <p className='' >{chat.name[0]}</p>
            </div>

            {/* name and timestamp */}
            <div className='flex-1'>
                <p className={`font-bold font-Hind ${!lightTheme?'':'text-[rgba(0,0,0,0.54)]'}`}>{chat.name}</p>
                <p className={`text-xs ${!lightTheme?'text-[rgba(189,188,188,0.86)]':'text-[rgba(0,0,0,0.54)]'}`}>{chat.timestamp}</p>
            </div>

            {/* DeleteIcon */}
            <IconButton >
                <MoreVertIcon className={`${!lightTheme?'text-white':''}`} />
            </IconButton>
        </div>

        {/* Messages */}
        <div className={`flex-1 mx-2 rounded-2xl overflow-y-scroll ${!lightTheme?'bg-[rgba(30,27,27,0.926)]':'bg-white '}`} style={{scrollbarWidth:"none",maxHeight: 'calc(100vh - 150px)',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}} >
            <MessageOthers props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} group={true} />
            <MessageSelf props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} />
            <MessageOthers props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} />
            <MessageSelf props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} />
            <MessageOthers props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} />
            <MessageSelf props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} /> 
            <MessageOthers props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} />
            <MessageSelf props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} />
            <MessageOthers props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} />
            <MessageSelf props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} />
            <MessageOthers props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} />
            <MessageSelf props={{name:"Randome User",message:"This is sample message",timestamp:"12:00"}} />
        </div>

        {/* Text Input */}
        <div className={`p-2 rounded-2xl flex justify-between m-2 ${!lightTheme?'dark':'bg-white '}`} style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}} >
            <input type="text" className={`outline-none text-[rgba(0,0,0,0.54)] ml-2 text-base flex-1 ${!lightTheme?'bg-transparent text-white':''}`} placeholder='Enter Message' />
            <IconButton>
                <Send className={`${!lightTheme? '  text-white ':' '}`}  />
            </IconButton>
        </div>
    </div>
  )
}

export default ChatArea