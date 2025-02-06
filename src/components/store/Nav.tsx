"use client"
import React from 'react'
import Link from 'next/link'
//import { usePathname } from 'next/navigation';
import Logo from './Logo';

const Nav = () => {

    //const pathname = usePathname()

  return (
    <div>
        <div className='lg:hidden block'>
            <div className='lg:hidden flex justify-between bg-zinc-200 rounded-full py-[7px] mx-[8px]'>
                <Link href='./' className='my-auto pl-5'><Logo/></Link>
                <Link href='./chat-area' className='text-white bg-black py-[9px] rounded-full text-md mr-[7px] flex items-center px-[15px] font-semibold'>Try for Free</Link>
            </div>
        </div>
        <div className='w-full lg:flex justify-between bg-zinc-200 rounded-full py-3 hidden'>
        <Link href='./' className='my-auto px-7'><Logo/></Link>
        <div className='flex my-auto px-[13px] space-x-5 font-semibold'>
            <Link href='./' className='my-auto'>Log in</Link>
            <Link href='./chat-area' className='text-white bg-black py-[13px] px-4 rounded-full'>Try for Free</Link>
        </div>
        </div>
    </div>
  )
}

export default Nav
