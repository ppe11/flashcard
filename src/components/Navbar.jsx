'use client'

import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-20 px-6 lg:px-12 bg-[#11001f] backdrop-blur-md border-b border-white/10 flex items-center justify-between text-white relative">
      {/* Logo Left */}
      <div className="z-10">
        <a href="/">
          <Image src={assets.logo} alt="SmarterAI Logo" width={250} height={250} />
        </a>
      </div>

      {/* Absolute centered nav links */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <ul className="flex gap-10 text-lg font-medium">
          <li>
            <a href="/" className="hover:text-indigo-500 transition">About</a>
          </li>
          <li>
            <a href="/generate" className="hover:text-indigo-500 transition">Begin</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
