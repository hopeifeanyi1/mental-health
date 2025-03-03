// src/app/components/Nav.tsx (assuming this is the path)
"use client"
import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Logo from './Logo';
import { UserAuth } from "@/app/context/AuthContext";

const Nav = () => {
  const { user, googleSignIn } = UserAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div>
        <div className='lg:hidden block'>
            <div className='lg:hidden flex justify-between bg-zinc-200 rounded-full py-[7px] mx-[8px]'>
                <Link href='./' className='my-auto pl-5'><Logo/></Link>
                <p onClick={handleSignIn} className='text-white bg-black py-[9px] rounded-full text-md mr-[7px] flex items-center px-[15px] font-semibold'>Try for Free</p>
            </div>
        </div>
        <div className='w-full lg:flex justify-between bg-zinc-200 rounded-full py-3 hidden'>
        <Link href='./' className='my-auto px-7'><Logo/></Link>
        <div className='flex my-auto px-[13px] space-x-5 font-semibold'>
            <p onClick={handleSignIn} className='my-auto cursor-pointer'>Log in</p>
            <p onClick={handleSignIn} className='text-white bg-black py-[13px] px-4 rounded-full'>Try for Free</p>
        </div>
        </div>
    </div>
  )
}

export default Nav