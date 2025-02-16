'use client'
import React from 'react'
import ChatInterface from '@/components/store/ChatInterface'
import HistorySection from '@/components/store/HistorySection'
import Logo from '@/components/store/Logo'
import Link from 'next/link'
import { motion } from 'framer-motion'

const page = () => {
  return (
    <motion.div className="relative grid grid-cols-8 gap-x-12 h-[100dvh] lg:px-24 lg:pt-[12dvh] lg:pb-[7dvh] p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} 
        transition={{ duration: 1.5 }}>
        <Link href='./' className='absolute hidden lg:block pt-5 pl-16'><Logo/></Link>
        <HistorySection/>
        <ChatInterface/>
    </motion.div>
  )
}

export default page
