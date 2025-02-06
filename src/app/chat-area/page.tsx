import React from 'react'
import ChatInterface from '@/components/store/ChatInterface'
import HistorySection from '@/components/store/HistorySection'

const page = () => {
  return (
    <div className="grid grid-cols-8 gap-x-12 h-[100dvh] lg:px-24 lg:py-[10dvh] p-0">
      <HistorySection/>
      <ChatInterface/>
    </div>
  )
}

export default page
