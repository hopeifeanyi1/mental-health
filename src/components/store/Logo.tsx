import React from 'react'

const Logo = () => {
  return (
    <div className=' w-56 h-10 relative text-black lg:text-3xl text-2xl'>
      <p className='lg:font-extrabold font-semibold'>Easy-<span className='text-[#5c86a9]'>Therapy</span></p>
      <div className='bg-[#5c86a9] absolute lg:bottom-[-9px] bottom-[1px] lg:right-[40px] right-[85px] rounded-full w-[9px] h-[9px]'/>
      <div className='bg-[#5c86a9] absolute lg:bottom-[-4px] bottom-[3px] lg:right-[7px] right-[52px] rounded-full w-[13px] h-[13px]'/>
      <div className='bg-[#5c86a9] absolute lg:top-3 top-1 lg:right-[12px] right-[56px] rounded-full w-[9px] h-[9px]'/>
    </div>
  )
}

export default Logo
