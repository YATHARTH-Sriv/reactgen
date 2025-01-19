'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

// Custom NavLink component with tooltip
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <div className="relative group">
      <Link 
        href={href} 
        className="text-gray-400 font-sans hover:text-white"
      >
        {children}
      </Link>
      <div className="absolute hidden group-hover:block -bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="bg-white text-gray-800 text-sm py-1 px-3 rounded-lg shadow-lg flex items-center gap-1">
          <span>Coming soon</span>
          <span role="img" aria-label="sparkles">✨</span>
          {/* Triangle pointer */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-white"/>
        </div>
      </div>
    </div>
  );
};

export default function Navbar() {
  return (
    <nav className="fixed bg-[#16171c] top-0 w-full z-50 mt-2 ml-2 mr-2">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo Section */}
        <div className="flex px-8 items-center gap-3">
          <div className="h-8 w-8 rounded-md flex items-center justify-center">
            <Image 
              src="/icon.webp" 
              className="rounded-lg" 
              alt="icon" 
              width={40} 
              height={40}
            />
          </div>
          <span className="flex font-normal text-lg text-white">
            React<p className="text-green-400">Gen</p>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-white p-2 m-3">
          <NavLink href="#">AI</NavLink>
          <NavLink href="#">Features</NavLink>
          <NavLink href="#">Components</NavLink>
          <NavLink href="#">Pricing</NavLink>
          <NavLink href="#">FAQ</NavLink>
          <NavLink href="#">Blog</NavLink>
          <NavLink href="#">Agent+</NavLink>
        </div>

        {/* Auth Buttons */}
        <div className="flex p-2 m-2 items-center gap-4">
          <Link href="/Login">
            <Button variant="secondary" className="m-3 text-black">
              Login
            </Button>
          </Link>
          <Link href="/Login">
            <Button className="bg-[#7C3AED] hover:bg-[#7C3AED]/90">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}