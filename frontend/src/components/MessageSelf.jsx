import React from 'react'
import { useSelector } from 'react-redux'
import { DateTime } from "luxon";


const MessageSelf = ({props}) => {
  const date=props.createdAt.toString();
  const lightTheme=useSelector((state)=>state.themeKey);
  return (
    <div className='flex p-3 justify-end'>
        {/* message */}
        <div className={`min-w-12 p-2 rounded-2xl flex flex-col gap-[1px] ${!lightTheme?'bg-[#346052]':'bg-[#72dfbc]'}`} >
            <p className={`text-sm ${!lightTheme?'text-white':''}`}>{props.message}</p>
            <p className='text-xs justify-self-end self-end text-gray-500'>{DateTime.fromISO(date).setZone("Asia/Kolkata").toLocaleString(DateTime.DATETIME_SHORT)}</p>
        </div>
    </div>
  )
}

export default MessageSelf