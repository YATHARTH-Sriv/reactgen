"use client"
import Questions from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

export default function Home() {
  return (
    <div className='bg-[#030303]'>
    <Navbar/>
    <Hero/>
    <Questions/>
    </div>
  );
}


