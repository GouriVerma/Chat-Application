import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GroupChat = ({props}) => {
  const navigate=useNavigate();
  const lightTheme=useSelector((state)=>state.themeKey);
  return (
    <div className={`p-1.5 m-1.5 rounded-2xl flex gap-[10px]  transition-all duration-150 cursor-pointer ${!lightTheme?'bg-transparent hover:bg-[#252323c5] active:bg-[#252323c5]':'hover:bg-gray-100 active:bg-gray-50'}`}
    onClick={()=>navigate(`chat/132219873`)}
    >
      <div className='w-8 h-8 flex items-center justify-center bg-[#d9d9d9] text-white text-3xl rounded-full font-semibold p-5'>
        <p className='' >{props.name[0]}</p>
      </div>
      <div className='flex-1'>
        <p className={` text-lg ${!lightTheme?'text-[rgba(230,230,230,1)]':'text-[rgba(0,0,0,0.54)]'}`}>{props.name}</p>
        <p className='text-sm'><span className={`font-semibold text-gray-700 ${!lightTheme?'text-[rgba(230,230,230,1)]':'text-[rgba(0,0,0,0.54)]'}`}>{props.sender}: </span>{props.lastMessage}</p>
      </div>
      <div className={`justify-self-end self-end text-sm  ${!lightTheme?'text-[rgba(192,192,192,0.54)]':'text-[rgba(0,0,0,0.54)]'}`}>
        <p>{props.timeStamp}</p>
      </div>
    </div>
  )
}



export default GroupChat