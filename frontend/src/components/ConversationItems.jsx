import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago'

const ConversationItems = ({props}) => {
  const auth=useSelector((state)=>state.authKey);
  const lightTheme=useSelector((state)=>state.themeKey);
  const latestMessage=useSelector((state)=>state.latestMessageKey);

  const thisMessage=latestMessage.filter((message)=>message.chat._id==props._id);


  const navigate=useNavigate();
  

  var chatName="";
  var profilePicture={};
  props.users.map((user)=>{
    if(user._id!=auth._id){
      chatName=user.userName;
      profilePicture=user.profilePicture
    }
  })
  

  return (
    <div className={` p-1.5 m-1.5 rounded-2xl flex gap-[10px]  transition-all duration-150 cursor-pointer ${!lightTheme?'bg-transparent hover:bg-[#252323c5] active:bg-[#2d2c2cc5]':'hover:bg-gray-100 active:bg-gray-50'}`}
    onClick={()=>navigate(`chat/${props._id}`,{state:{chatName,profilePicture:profilePicture,chat:{...props}}})}
    >
      {/* icon */}
      <div>
        {profilePicture? 
        <img className='rounded-full w-10 h-10 object-cover' src={profilePicture.url} /> : 
        <p className={`w-8 h-8 flex items-center justify-center  text-white text-3xl rounded-full font-semibold p-5 ${!lightTheme?'bg-[#5a5959]':'bg-[#d9d9d9]'}`}>{chatName[0].toUpperCase()}</p>}
        
      </div>

      {/* chatname and latest message*/}
      <div className='flex-1 overflow-hidden'>

        <p className={`  ${!lightTheme?'text-[rgba(230,230,230,1)]':'text-[rgba(0,0,0,0.54)]'}`}>
          {chatName}
        </p>

        <p className='text-sm text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>
          {thisMessage && thisMessage.length>0 ? thisMessage.at(-1).message : props?.lastMessage?.message}
        </p>
      </div>

      {/* count and timestamp */}
      <div className={`justify-self-end self-end text-xs  ${!lightTheme?'text-[rgba(192,192,192,0.54)]':'text-[rgba(0,0,0,0.54)]'}`}>
        
        
        {thisMessage && thisMessage.length>0 &&
        <div className='flex justify-end'>
          <p className='text-xs bg-[#3e997c] text-white rounded-full p-1 w-5 h-5 flex items-center justify-center'>{ thisMessage.length}</p>
        </div>
        }
        <p>
          {((thisMessage && thisMessage.length>0) || props.lastMessage) &&
          <ReactTimeAgo date={thisMessage && thisMessage.length>0 ? thisMessage.at(-1).createdAt.toString() : props?.lastMessage?.createdAt?.toString()} locale="en-IN"/>
          
          }
        </p>
      </div>
    </div>
  )
}

export default ConversationItems