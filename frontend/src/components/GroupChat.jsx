import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago' 

const GroupChat = ({props}) => {
  const navigate=useNavigate();
  const lightTheme=useSelector((state)=>state.themeKey);

  const chatName=props.name;
  const latestMessage=useSelector((state)=>state.latestMessageKey);

  const thisMessage=latestMessage.filter((message)=>message.chat._id==props._id);


  return (
    <div className={`p-1.5 m-1.5 rounded-2xl flex gap-[10px] transition-all duration-150 cursor-pointer ${!lightTheme?'bg-transparent hover:bg-[#252323c5] active:bg-[#252323c5]':'hover:bg-gray-100 active:bg-gray-50'}`}
    onClick={()=>navigate(`chat/${props._id}`,{state:{chatName,chat:{...props}}})}
    >

      {/* icon */}
      <div className={`w-8 h-8 flex items-center justify-center  text-white text-3xl rounded-full font-semibold p-5 ${!lightTheme?'bg-[#5a5959]':'bg-[#d9d9d9]'}`}>
        <p className='' >{props.name[0].toUpperCase()}</p>
      </div>

      {/* chatname and latestMessage */}
      <div className='flex-1 overflow-hidden'>

        <p className={`overflow-hidden ${!lightTheme?'text-[rgba(230,230,230,1)]':'text-[rgba(0,0,0,0.54)]'}`}>{props.name}</p>


        {props.lastMessage && <p className="text-sm text-nowrap whitespace-nowrap text-ellipsis overflow-hidden">
          <span className={` ${!lightTheme ? 'text-[rgba(230,230,230,1)]' : 'text-[rgba(0,0,0,0.54)]'}`}>
            {thisMessage && thisMessage.length>0 ? thisMessage.at(-1).sender.userName+": " : props?.lastMessage?.sender?.userName+": "}
            
          </span>
          <span className={`${!lightTheme? '':'text-[rgb(52,52,52)]'}`}>{thisMessage && thisMessage.length>0 ? thisMessage.at(-1).message : props?.lastMessage?.message}</span>
        </p>}
      </div>

      {/* count and timestamp */}
      <div className={`justify-self-end self-end text-xs  ${!lightTheme?'text-[rgba(192,192,192,0.54)]':'text-[rgba(0,0,0,0.54)]'}`}>
        
        
        {thisMessage && thisMessage.length>0 &&
        <div className='flex justify-end'>
          <p className='text-xs bg-[#3e997c] text-white rounded-full p-1 w-5 h-5 flex items-center justify-center'>{ thisMessage.length}</p>
        </div>
        }
        <p>
          {(thisMessage && thisMessage.length>0) || props.lastMessage &&
          <ReactTimeAgo date={thisMessage && thisMessage.length>0 ? thisMessage.at(-1).createdAt.toString() : props?.lastMessage?.createdAt?.toString()} locale="en-IN"/>
          
          }
        </p>
        
        
      </div>
    </div>
  )
}



export default GroupChat