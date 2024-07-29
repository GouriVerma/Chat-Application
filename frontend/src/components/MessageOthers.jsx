import React from 'react'

const MessageOthers = ({props,group}) => {
  return (
    <div className='flex justify-start p-3'>
        <div className='flex gap-2'>

            {group && 
                
                <div className='w-8 h-8 flex items-center justify-center bg-[#d9d9d9] text-white text-3xl rounded-full font-semibold p-5'>
                    <p className='' >{props.name[0]}</p>
                </div>

            }

            {/* message */}
            <div className='bg-[#eeeded] p-2 rounded-2xl flex flex-col gap-[1px]'>
                {group && <p>{props.name}</p>}
                <p className='text-sm'>{props.message}</p>
                <p className='text-xs justify-self-end self-end text-gray-400'>{props.timestamp}</p>
            </div>
        </div>
    </div>
  )
}

export default MessageOthers