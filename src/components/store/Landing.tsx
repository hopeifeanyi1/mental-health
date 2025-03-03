'use client'
import React from 'react'
import { HeroImage, Jane, John, Section2, Section3a, Section3b } from '@/assets/svgs'
import Link from 'next/link'
import Image from 'next/image'
import Footer from './Footer'
import { motion } from 'framer-motion'


const Landing = () => {
    
  return (
    <div className='text-white relative'>
        <div className='overflow-scroll'>
            <div className='relative'>
                <Image src={HeroImage} alt="Hero Image" className='absolute w-screen lg:h-[100dvh] h-[99dvh] overflow-hidden' style={{ objectFit: 'cover', objectPosition: 'center' }}/>
                <div className='relative flex justify-center lg:items-center lg:h-[92dvh] h-[99dvh]'>
                    <div className='md:w-3/4 w-full text-center mt-52 md:mt-72 lg:mt-0'>
                        <motion.p className=' md:text-7xl text-[40px] leading-tight font-semibold' initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 0.8 }} transition={{ duration: 1 }}>Your <span className='text-[#5c86a9]'>Mental Health</span> Companion, Anytime, Anywhere.</motion.p>
                        <motion.p className='font-semibold md:text-xl text-xl md:mt-16 mt-2 px-3 md:px-0' initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>Talk to a supportive chatbot designed to help you through tough moments.</motion.p>
                        <div className='group'>
                            <Link href='./chat-area' className='text-lg font-semibold bg-[#5c86a9] w-[280px] py-5 rounded-[100px] mx-auto absolute lg:bottom-[62px] md:bottom-[192px]  bottom-[162px] lg:right-[39%] right-[10%] left-[10%] lg:left-[39%] group-hover:bg-[#5c86a9]/80'>Start Chatting</Link>
                            <Link href='./chat-area' className='group-hover:bg-[#5c86a9]/80 bg-[#5c86a9] mx-auto h-10 w-60 rounded-[50%] absolute lg:bottom-[49px] md:bottom-[179px] bottom-[149px] lg:right-[42%] right-[10%] lg:left-[42%] left-[10%]' />
                            <div className='bg-[#5c86a9] mx-auto h-10 w-[100px] rounded-[50%] absolute lg:bottom-[26px] md:bottom-[156px] bottom-[126px] lg:right-[45%] right-[15%] lg:left-[45%] left-[15%]' />
                            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className='bg-[#5c86a9] mx-auto h-7 rounded-[50%] absolute lg:bottom-[-7px] md:bottom-[123px] bottom-[93px] lg:right-[47%] right-[15%] left-[15%] lg:left-[47%] w-16'/>
                            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.3 }} className='absolute lg:bottom-[-122px] bottom-[-49px] lg:right-[37%] lg:left-[37%] md:right-[25%] md:left-[25%] left-[10%] right-[10%] bg-[#5c86a9] mx-auto h-24 lg:w-[26%] md:w-[50%] w-[80%] mt-7 rounded-[70%]'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white text-black md:py-14 py-0 lg:mt-16 mt-0 relative'>
                <div className='md:my-10 my-0 px-10'>
                    <div className='md:grid grid-cols-11 lg:pl-20 px-0 lg:pr-28' >
                        <div className='col-span-5 lg:w-[65%] md:w-[85%] w-full mx-auto md:h-[420px] h-[350px] flex justify-center items-center'>
                            <div>
                                <p className='md:mb-16 mb-0 md:text-5xl text-4xl font-semibold'><span className='text-[#5c86a9] '>24/7</span> Support.</p>
                                <p className='md:text-2xl text-xl md:mt-10 mt-5 tracking-wide'>&quot;A sanctuary of understanding around the clock, where a thoughtful chatbot lends an ear, offering gentle guidance and support for your mental well-being.&quot;</p>
                            </div>
                        </div>
                        <div className='col-span-6 relative'>
                            <div className='hidden md:block bg-opacity-50 bg-[#5c86a9]/55 h-[157px] w-[165px] ml-auto'/>
                            <div className='md:absolute top-7 lg:right-[-30px] md:right-[0px]'>
                                <div className='hidden md:block absolute bg-[#5c86a9]/55 h-[157px] w-[165px] bottom-[-40px] left-[-18px]'/>
                                <Image src={Section2} alt="Hero Image" className='mx-auto h-[370px]' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:pt-10 pt-16 pb-24 px-10 md:px-0 md:relative overflow-hidden md:h-auto h-[1450px]'>
                    <div className='absolute md:top-[62px] top-[762px] lg:left-[-39px] left-[-200px] bg-[#5c86a9]/35 h-[297px] w-[325px] ml-auto transform -skew-x-12 skew-y-12'/>
                    <p className='font-semibold md:text-5xl text-3xl text-center md:py-16 py-5 '>Helping You Achieve <span className='text-[#5c86a9]'>Peace</span></p>
                    <div className='md:grid grid-cols-2 text-center text-xl mt-8 lg:gap-x-[170px] md:gap-x-[70px] md:px-10 lg:px-0 px-0'>
                        <div className='col-span-1 text-lg'>
                            <Image src={Section3b} alt="Hero Image" className='mx-auto md:w-full w-[310px] md:h-[420px]' />
                            <p className='font-semibold lg:my-10 my-3 pt-3 md:pt-0 text-2xl'>Confidential and Secure</p>
                            <div className='lg:w-[60%] mx-auto'> 
                                <span className='md:block inline'>Designed to ensure user privacy, </span> <span className='md:block inline'>it offers a safe space for sharing feelings, </span> <span className='md:block inline'>gaining coping strategies,</span> <span className='md:block inline'> and accessing professional guidance.</span> 
                            </div>
                        </div>
                        <div className='col-span-1 md:relative'>
                            <div className='relative'>
                                <div className='absolute md:bottom-[-650px] bottom-[-570px] lg:right-[-38px] right-[-158px] bg-[#5c86a9]/35 h-[297px] w-[325px] ml-auto transform -skew-x-12 skew-y-12'/>
                            </div>
                            <div className='absolute md:top-0 top-[1530px]'>
                                <div className='flex justify-center items-center'>
                                    <div className='w-[310px] md:w-full text-lg' >
                                        <Image src={Section3a} alt="Hero Image" className='mx-auto w-full md:h-[420px]' />
                                        <p className='font-semibold lg:my-10 my-3 pt-3 md:pt-0 text-2xl'>Evidence-Based Guidance</p>
                                        <p className='lg:w-[60%] mx-auto'>An evidence based mental health Chatbot Progressive Web App offers AI-driven support, resources, and coping strategies to help users manage their mental well-being effectively and privately</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative md:h-[120px] h-[75px]  overflow-hidden">
                    <div className="absolute lg:right-[30%] md:right-[15%] right-[5%] lg:left-[30%] md:left-[15%] left-[5%] bg-[#5c86a9]/55 lg:w-[40%] md:w-[70%] w-[90%] md:h-[240px] h-[170px] rounded-[70%] md:top-[-125px] top-[-95px]" />
                </div>
                <div className='md:my-4 my-3 mb-28'>
                    <div className='bg-[#5c86a9]/55 md:h-[56px] h-[41px] w-[85px] md:w-[110px] mx-auto rounded-[50%]'/>
                    <p className='font-semibold md:text-4xl text-[28px] text-center md:py-16 py-10 md:px-0 px-10 '>Meet Our<span className='text-[#5c86a9]'> Testimonials</span></p>
                    <div className='md:grid grid-cols-2 md:px-16 px-10 gap-x-10 gap-y-36'>
                        <div className='col-span-1'>
                            <Image src={John} alt="John Image" className='mx-auto' />
                        </div>
                        <div className='col-span-1 text-center md:text-xl text-lg lg:w-2/3 w-full lg:px-10 px-0 mx-auto'>
                            <p className='text-2xl font-semibold lg:mb-6 md:mt-0 mt-5 mb-2'>John Doe</p>
                            <p>&apos;This chatbot has been a lifesaver during tough times. It compassionate guidance and practical tips have helped me manage stress and feel more in control of my mental health. I highly recommend it to anyone seeking support.&apos;</p>
                        </div>
                        <div className='col-span-1 text-center md:text-xl text-lg lg:w-2/3 w-full lg:px-10 px-0 mx-auto mt-10 md:mt-0'>
                            <Image src={Jane} alt="Jane Image" className='block md:hidden mx-auto' />
                            <p className='text-2xl font-semibold lg:mb-6 md:mt-0 mt-5 mb-2'>Jane Smith</p>
                            <p>&apos;Using this chatbot felt like having a supportive friend available 24/7. It provided helpful advice and tools tailored to my needs, making a real difference in my meantal health journey.&apos;</p>
                        </div>
                        <div className='col-span-1'>
                            <Image src={Jane} alt="Jane Image" className='hidden md:block mx-auto' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
    </div>
  )
}

export default Landing
