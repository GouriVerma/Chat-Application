import React from 'react'
import { useSelector } from 'react-redux'
import { DateTime } from "luxon";

const MessageOthers = ({props,group}) => {
    const date=props.createdAt.toString();
    const lightTheme=useSelector((state)=>state.themeKey);
  return (
    <div className='flex justify-start p-3'>
        <div className='flex gap-2'>

            {group && 
                
                <div className='w-8 h-8 flex items-center justify-center bg-[#d9d9d9] text-white text-3xl rounded-full font-semibold p-5'>
                    <p className='' >{props?.sender.userName[0].toUpperCase()}</p>
                </div>

            }

            {/* message */}
            <div className={`min-w-12  p-2 rounded-2xl flex flex-col gap-[1px] ${!lightTheme ? 'bg-[#3f3e3eb2] text-white':'bg-[#eeededb2] '}`}>
                {group && <p>{props.chat.userName}</p>}
                <p className='text-sm'>{props.message}</p>
                <p className='text-xs justify-self-end self-end text-gray-400'>{DateTime.fromISO(date).setZone("Asia/Kolkata").toLocaleString(DateTime.DATETIME_SHORT)}</p>
            </div>
        </div>
    </div>
  )
}

export default MessageOthers