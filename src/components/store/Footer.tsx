import React from 'react'

const Footer = () => {
  return (
    <div className='border-t border-black bg-white text-black md:py-10 py-5 md:mx-28 mx-5 lg:text-md text-sm'>
        <div className='md:flex justify-between md:mx-20 mx-0'>
            <h1 className="hidden md:block">&copy; {new Date().getFullYear()} PWAmhC. All Right Reserved</h1>
            <div className='md:space-x-10 px-5 md:px-0 '>
                <p className='md:inline'>Privacy Policy</p>
                <p className='md:inline my-1 md:my-0'>Terms and Conditions</p>
                <p className='md:inline'>Cookies Policy</p>
            </div>
            <h1 className="md:hidden px-5 mt-2">&copy; {new Date().getFullYear()} PWAmhC. All Right Reserved</h1>
        </div>
    </div>
  )
}

export default Footer
