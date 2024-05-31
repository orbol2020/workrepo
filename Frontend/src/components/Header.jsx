import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <div className='p-4 shadow-sm border flex justify-between items-center fixed left-0 w-full top-0 right-0 bg-white z-999'>
      <img src={logo}  alt="logo" className='w-[160px] h-10 sm:h-8'/>
      <button className='flex gap-2 items-center bg-blue-400 text-white font-semibold px-4 py-2 rounded-md'>Sign In</button>
    </div>
  )
}

export default Header