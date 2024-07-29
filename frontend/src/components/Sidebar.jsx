import React, { useState } from 'react'
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GroupAdd, PersonAdd, AddCircle, Nightlight, Search } from '@mui/icons-material';
import ConversationItems from './ConversationItems';

const Sidebar = () => {
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
  return (
    <div className='flex-[0.3] flex flex-col'>
        
        {/* header */}
        <div className='bg-white rounded-2xl flex justify-between m-2 px-1 py-2'>
            <div>
                <IconButton>
                    <AccountCircleIcon />
                </IconButton>
            </div>
            <div>
                <IconButton>
                    <PersonAdd />
                </IconButton>
                <IconButton>
                    <GroupAdd />
                </IconButton>
                <IconButton>
                    <AddCircle />
                </IconButton>
                <IconButton>
                    <Nightlight />
                </IconButton>
            </div>
        </div>

        {/* search */}
        <div className='m-2 bg-white rounded-2xl py-1 px-2 flex items-center gap-2'>
            <IconButton>
                <Search />
            </IconButton>
            <input type="text" placeholder='Search' className='outline-none flex-1' />
        </div>

        {/* conversations */}
        <div className='m-2 bg-white rounded-2xl py-1 px-2 flex-1 overflow-y-scroll' style={{scrollbarWidth:"none"}}>
            {
                conversations.map((conversation)=><ConversationItems key={conversation.id} props={conversation} />)
            }
        </div>

       
    </div>
  )
}

export default Sidebar