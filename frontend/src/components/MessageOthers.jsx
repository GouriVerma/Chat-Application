import React from 'react'
import { useSelector } from 'react-redux'

const MessageOthers = ({props,group}) => {
    const lightTheme=useSelector((state)=>state.themeKey);
  return (
    <div className='flex justify-start p-3'>
        <div className='flex gap-2'>

            {group && 
                
                <div className='w-8 h-8 flex items-center justify-center bg-[#d9d9d9] text-white text-3xl rounded-full font-semibold p-5'>
                    <p className='' >{props.name[0]}</p>
                </div>

            }

            {/* message */}
            <div className={`p-2 rounded-2xl flex flex-col gap-[1px] ${!lightTheme ? 'bg-[#3f3e3eb2] text-white':'bg-[#eeededb2] '}`}>
                {group && <p>{props.name}</p>}
                <p className='text-sm'>{props.message}</p>
                <p className='text-xs justify-self-end self-end text-gray-400'>{props.timestamp}</p>
            </div>
        </div>
    </div>
  )
}

export default MessageOthers