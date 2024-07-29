import { Delete, Send } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'
import MessageOthers from './MessageOthers'
import MessageSelf from './MessageSelf'

const ChatArea = ({props}) => {
  return (
    <div className='flex-[0.7] flex flex-col gap-1.5'>

        {/* ChatArea Header */}
        <div className='bg-white rounded-2xl m-2 p-2 flex items-center gap-2'>
            {/* icon */}
            <div className='w-8 h-8 flex items-center justify-center bg-[#d9d9d9] text-white text-3xl rounded-full font-semibold p-5'>
                <p className='' >{props.name[0]}</p>
            </div>

            {/* name and timestamp */}
            <div className='flex-1'>
                <p className='font-bold text-[rgba(0,0,0,0.54)] font-Hind'>{props.name}</p>
                <p className='text-xs text-[rgba(0,0,0,0.54)]'>{props.timeStamp}</p>
            </div>

            {/* DeleteIcon */}
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </div>

        {/* Messages */}
        <div className='flex-1 bg-white mx-2 rounded-2xl overflow-y-scroll' style={{scrollbarWidth:"none"}}>
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
        <div className=' bg-white p-2 rounded-2xl flex justify-between m-2'>
            <input type="text" className='outline-none text-[rgba(0,0,0,0.54)] ml-2 text-base flex-1' placeholder='Enter Message' />
            <IconButton>
                <Send />
            </IconButton>
        </div>
    </div>
  )
}

export default ChatArea