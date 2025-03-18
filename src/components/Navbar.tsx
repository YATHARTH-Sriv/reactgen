'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <div className="relative group">
      <Link href={href} className="text-gray-400 font-sans hover:text-white">
        {children}
      </Link>
      <div className="absolute hidden group-hover:block -bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="bg-white text-gray-800 text-sm py-1 px-3 rounded-lg shadow-lg flex items-center gap-1">
          <span>Coming soon</span>
          <span role="img" aria-label="sparkles">✨</span>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-white"/>
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="fixed top-0 w-full bg-[#16171c] z-50">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md flex items-center justify-center">
            <Image src="/icon.webp" alt="icon" width={40} height={40} className="rounded-lg" />
          </div>
          <span className="font-normal text-lg text-white flex">
            React<p className="text-green-400">Gen</p>
          </span>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-gray-400" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-white">
          <NavLink href="#">AI</NavLink>
          <NavLink href="#">Features</NavLink>
          <NavLink href="#">Components</NavLink>
          <NavLink href="#">Pricing</NavLink>
          <NavLink href="#">FAQ</NavLink>
          <NavLink href="#">Blog</NavLink>
          <NavLink href="#">Agent+</NavLink>
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-4">
          {/* <Link href="/newdash">
            <Button variant="secondary" className="text-black">Login</Button>
          </Link> */}
          <Link href="/newdash">
            <Button className="bg-[#7C3AED] hover:bg-[#7C3AED]/90">Get Started</Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-[#16171c] px-4 pb-4">
          <div className="flex flex-col text-white gap-4 mt-2">
            <NavLink href="#">AI</NavLink>
            <NavLink href="#">Features</NavLink>
            <NavLink href="#">Components</NavLink>
            <NavLink href="#">Pricing</NavLink>
            <NavLink href="#">FAQ</NavLink>
            <NavLink href="#">Blog</NavLink>
            <NavLink href="#">Agent+</NavLink>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {/* <Link href="/newdash">
              <Button variant="secondary" className="text-black w-full">Login</Button>
            </Link> */}
            <Link href="/newdash">
              <Button className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}