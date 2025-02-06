import React from 'react'
import ChatInterface from '@/components/store/ChatInterface'
import HistorySection from '@/components/store/HistorySection'
import Logo from '@/components/store/Logo'
import Link from 'next/link'

const page = () => {
  return (
    <div className="relative grid grid-cols-8 gap-x-12 h-[100dvh] lg:px-24 lg:pt-[12dvh] lg:pb-[7dvh] p-0">
        <Link href='./' className='absolute hidden lg:block pt-5 pl-16'><Logo/></Link>
        <HistorySection/>
        <ChatInterface/>
    </div>
  )
}

export default page
