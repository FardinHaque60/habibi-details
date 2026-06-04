"use client"

import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="w-full bg-black pt-20 pb-10 px-6 border-t border-gray-900">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Section: 3 Columns */}
        {/* 'grid-cols-3' forces it to always be 3 columns. 'max-w-4xl mx-auto' centers the whole block on large screens */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 max-w-5xl mx-auto w-full">
          
          {/* Column 1: Locations */}
          <div className="flex flex-col items-start text-start gap-2 md:gap-4">
            <h3 className="text-white text-[15px] sm:text-[18px] md:text-[25px] font-bold tracking-[-0.04em]">Locations</h3>
            <div className="h-[1px] w-8 md:w-12 bg-gray-700 mb-1 md:mb-2"></div>
            <ul className="flex flex-col gap-1.5 md:gap-3 text-[11px] sm:text-[13px] md:text-[15px] text-gray-400 tracking-[-0.02em]">
              <li>San Diego, CA</li>
              <li>La Jolla, CA</li>
              <li>Chula Vista, CA</li>
              <li>El Cajon, CA</li>
              <li>Carlsbad, CA</li>
              <li>San Marcos, CA</li>
            </ul>
          </div>

          {/* Column 2: Site Links */}
          <div className="flex flex-col items-center text-center gap-2 md:gap-4">
            <h3 className="text-white text-[15px] sm:text-[18px] md:text-[25px] font-bold tracking-[-0.04em]">Site Links</h3>
            <div className="h-[1px] w-8 md:w-12 bg-gray-700 mb-1 md:mb-2"></div>
            <ul className="flex flex-col gap-1.5 md:gap-3 text-[11px] sm:text-[13px] md:text-[15px] text-gray-400 tracking-[-0.02em]">
              {/* Shortened "Home - Car Detailing" to just "Home" so it fits nicely on mobile screens */}
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services/ceramic" className="hover:text-white transition-colors">Ceramic Coating</Link></li>
              <li><Link href="/services/paint" className="hover:text-white transition-colors">Paint Polish</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col items-end text-end gap-2 md:gap-4">
            <h3 className="text-white text-[15px] sm:text-[18px] md:text-[25px] font-bold tracking-[-0.04em]">Company</h3>
            <div className="h-[1px] w-8 md:w-12 bg-gray-700 mb-1 md:mb-2"></div>
            <ul className="flex flex-col gap-1.5 md:gap-3 text-[11px] sm:text-[13px] md:text-[15px] text-gray-400 tracking-[-0.02em]">
              <li><button onClick={() => setIsModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">Book</button></li>
              <li><a href="tel:6198219836" className="hover:text-white transition-colors">Call Us</a></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About </Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Massive Text & Copyright */}
        <div className="flex flex-col items-center mt-10 border-t border-gray-800 pt-10">
          
          {/* Massive Gradient Text */}
          <h1 className="text-[12vw] md:text-[130px] font-extrabold tracking-[-0.04em] leading-none text-transparent bg-clip-text bg-gradient-to-t from-gray-900 via-gray-600 to-gray-300 text-center uppercase">
            Habibi Details
          </h1>

          {/* Very Bottom Bar */}
          {/* Social Media Links */}
          <div className="flex items-center gap-6 text-gray-400 mt-3">
            
            {/* Instagram Icon */}
            <a 
              href="https://www.instagram.com/habibi.detailz/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-[#E1306C] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 12 12" fill="currentColor">
                <path d="M 6 3.843 C 4.809 3.843 3.842 4.81 3.842 6 C 3.842 7.191 4.809 8.16 6 8.16 C 7.191 8.16 8.16 7.191 8.16 6 C 8.16 4.81 7.191 3.843 6 3.843 Z" />
                <path d="M 9.256 0.118 L 2.743 0.118 C 1.296 0.118 0.117 1.297 0.117 2.744 L 0.117 9.257 C 0.117 10.706 1.296 11.882 2.743 11.882 L 9.256 11.882 C 10.706 11.882 11.882 10.706 11.882 9.257 L 11.882 2.744 C 11.882 1.297 10.706 0.118 9.256 0.118 Z M 6 9.812 C 3.899 9.812 2.188 8.101 2.188 6 C 2.188 3.899 3.899 2.191 6 2.191 C 8.101 2.191 9.812 3.899 9.812 6 C 9.812 8.101 8.101 9.812 6 9.812 Z M 9.892 2.882 C 9.447 2.882 9.085 2.522 9.085 2.078 C 9.085 1.633 9.447 1.271 9.892 1.271 C 10.336 1.271 10.699 1.633 10.699 2.078 C 10.699 2.522 10.336 2.882 9.892 2.882 Z" />
              </svg>
              <span className="text-[14px] font-medium">Instagram</span>
            </a>

            {/* TikTok Icon */}
            <a 
              href="https://tiktok.com/@habibidetailing" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-[#00f2fe] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
              <span className="text-[14px] font-medium">TikTok</span>
            </a>

          </div>

        </div>
      </div>
    </footer>
  );
}