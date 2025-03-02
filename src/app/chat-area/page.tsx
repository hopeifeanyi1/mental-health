'use client'
import React from 'react'
import ChatInterface from '@/components/store/ChatInterface'
import HistorySection from '@/components/store/HistorySection'
import Logo from '@/components/store/Logo'
import { LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { UserAuth } from '../context/AuthContext'
import ProtectedRoute from '@/components/store/ProtectedRoute'

const page = () => {
  const { logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProtectedRoute>
      <motion.div className="relative grid grid-cols-8 gap-x-12 h-[100dvh] lg:px-36 lg:pt-[12dvh] lg:pb-[7dvh] p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} 
          transition={{ duration: 1.5 }}>
          <div className='absolute hidden lg:block pt-5 pl-16'><Logo/></div>
          <div onClick={handleSignOut} className='absolute bottom-[100px] left-7 hidden lg:block p-2 rounded-full bg-neutral-200'>
            <LogOut className='w-7 h-7 text-[#1b3d58]'/>
          </div>
          <HistorySection/>
          <ChatInterface/>
          
      </motion.div>
    </ProtectedRoute>
  )
}

export default page
