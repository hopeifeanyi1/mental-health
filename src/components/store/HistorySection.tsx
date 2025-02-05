import React from 'react'
import { Search } from "lucide-react";


const HistorySection = () => {
  return (
    <div className='col-span-3 lg:block hidden'>
      <div className=' bg-zinc-200 p-6 relative rounded-2xl h-[80dvh]'>
        <p className='font-semibold text-xl'>My Chats</p>
        <div className='flex flex-row absolute top-16 left-[5%] bg-white h-[45px] rounded-full w-[90%]'>
            <Search size={23} color="#737373" className='my-auto ml-2'/>
            <input
                type="text"
                placeholder='Search your chats...'
                className=' pl-2 outline-none w-5/6'
            />
        </div>
      </div>
    </div>
  )
}

export default HistorySection
