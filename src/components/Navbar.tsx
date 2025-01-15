'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="fixed bg-[#16171c] top-0 w-full z-50 mt-2 ml-2 mr-2   ">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex px-8 items-center gap-3">
          <div className="h-8 w-8 rounded-md flex items-center justify-center">
            <Image src="/icon.webp" className=' rounded-lg'  alt='icon' width={40} height={40}/>
          </div>
          <span className=" flex font-normal text-lg text-white">React<p className=' text-green-400'>Gen</p></span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-white p-2 m-3">
          <Link href="#" className=" text-gray-400 font-sans hover:text-white">
            AI
          </Link>
          <Link href="#" className=" text-gray-400 font-sans hover:text-white">
            Features
          </Link>
          <Link href="#" className=" text-gray-400 font-sans hover:text-white">
            Components
          </Link>
          <Link href="#" className=" text-gray-400 font-sans  hover:text-white">
            Pricing
          </Link>
          <Link href="#" className=" text-gray-400 font-sans hover:text-white">
            FAQ
          </Link>
          <Link href="#" className=" text-gray-400 font-sans hover:text-white">
            Blog
          </Link>
          <Link href="#" className=" text-gray-400 font-sans hover:text-white">
            Agent+
          </Link>
        </div>

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
  )
}

