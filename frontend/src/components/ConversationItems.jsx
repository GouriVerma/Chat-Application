import React from 'react'

const ConversationItems = ({props}) => {
  return (
    <div className='p-1.5 m-1.5 rounded-2xl flex gap-[10px]'>
      <div className='w-8 h-8 flex items-center justify-center bg-[#d9d9d9] text-white text-3xl rounded-full font-semibold p-5'>
        <p className='' >{props.name[0]}</p>
      </div>
      <div className='flex-1'>
        <p className='font-bold text-[rgba(0,0,0,0.54)] text-lg'>{props.name}</p>
        <p className='text-sm'>{props.lastMessage}</p>
      </div>
      <div className='justify-self-end self-end text-sm text-[rgba(0,0,0,0.54)]'>
        <p>{props.timeStamp}</p>
      </div>
    </div>
  )
}

export default ConversationItems