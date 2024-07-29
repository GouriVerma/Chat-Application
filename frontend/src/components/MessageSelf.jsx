import React from 'react'

const MessageSelf = ({props}) => {
  return (
    <div className='flex p-3 justify-end'>
        {/* message */}
        <div className='bg-[#72dfbc] p-2 rounded-2xl flex flex-col gap-[1px] '>
            <p className='text-sm'>{props.message}</p>
            <p className='text-xs justify-self-end self-end text-gray-500'>{props.timestamp}</p>
        </div>
    </div>
  )
}

export default MessageSelf