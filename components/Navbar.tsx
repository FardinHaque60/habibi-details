"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import BookingModal from "@/components/BookingModal";

export default function Navbar() {
  // We only need state for the mobile menu now! Desktop uses CSS hover.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Main Navbar Pill */}
      <div className="flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-lg border border-white/20 rounded-[38px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.05)] relative z-50">
        
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center h-12 md:h-14 shrink-0">
          <Image 
            src="/logo.png" 
            alt="Habibi Details Logo" 
            width={200} 
            height={80} 
            className="object-contain h-full w-auto" 
            priority
          />
        </Link>

        {/* Right Side: Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-[14px] tracking-[-0.05em] leading-[160%] font-medium text-black">
          
          {/* Services Dropdown (Hover + Click) */}
          <div className="relative group py-4">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-1 hover:text-gray-600 transition-colors cursor-pointer"
            >
              Services
              <svg 
                className={`w-3 h-3 opacity-70 transition-transform ${isServicesOpen ? 'rotate-180' : ''} group-hover:rotate-180`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Desktop Dropdown Box */}
            <div className={`absolute top-full right-0 w-48 py-2 bg-white/95 backdrop-blur-2xl border rounded-[18px] border-white/20 shadow-2xl z-50 transition-all duration-200 overflow-hidden ${isServicesOpen ? 'opacity-100 visible translate-y-4' : 'opacity-0 invisible translate-y-2'} group-hover:opacity-100 group-hover:visible group-hover:translate-y-4`}>
              {/* Added the anchor link /#packages here */}
              <a href="/#packages" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 hover:bg-black/5 transition-colors">Car Detailing</a>
              <Link href="/services/ceramic" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 hover:bg-black/5 transition-colors">Ceramic Coating</Link>
              <Link href="/services/paint" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 hover:bg-black/5 transition-colors">Paint Polish</Link>
            </div>
          </div>

          <a href="/#faq" className="hover:text-gray-600 transition-colors">FAQ</a>
          <Link href="/about" className="hover:text-gray-600 transition-colors">About Us</Link>

          {/* Vertical Divider line */}
          <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

          {/* New Framer Phone Number Block */}
          <a href="tel:6198219836" className="flex items-center gap-2 group shrink-0">
            {/* SVG converted perfectly from your HTML snippet */}
            <svg 
              className="w-8 h-8 text-[#006fff] group-hover:scale-110 transition-transform" 
              viewBox="0 0 34 34" 
              fill="currentColor"
            >
              <path d="M 32.169 1.873 C 30.921 0.624 29.417 0 27.659 0 L 6.383 0 C 4.625 0 3.121 0.624 1.873 1.873 C 0.624 3.121 0 4.625 0 6.383 L 0 27.659 C 0 29.417 0.624 30.92 1.873 32.169 C 3.121 33.417 4.625 34.042 6.383 34.042 L 27.659 34.042 C 29.417 34.042 30.92 33.417 32.168 32.169 C 33.417 30.92 34.041 29.417 34.041 27.659 L 34.041 6.383 C 34.041 4.625 33.417 3.121 32.169 1.873 Z M 27.88 25.84 C 27.569 26.519 26.871 27.11 25.786 27.613 C 24.7 28.116 23.735 28.367 22.893 28.367 C 22.656 28.367 22.405 28.349 22.139 28.312 C 21.873 28.274 21.648 28.238 21.464 28.201 C 21.279 28.164 21.035 28.098 20.732 28.001 C 20.429 27.906 20.211 27.831 20.079 27.78 C 19.945 27.728 19.702 27.636 19.347 27.503 C 18.993 27.37 18.771 27.288 18.683 27.259 C 16.26 26.372 13.892 24.773 11.579 22.461 C 9.267 20.148 7.668 17.781 6.781 15.358 C 6.752 15.269 6.671 15.048 6.537 14.693 C 6.446 14.449 6.354 14.205 6.26 13.962 C 6.209 13.829 6.135 13.611 6.039 13.309 C 5.943 13.006 5.876 12.762 5.839 12.577 C 5.802 12.393 5.766 12.167 5.729 11.901 C 5.692 11.635 5.673 11.384 5.673 11.148 C 5.673 10.305 5.925 9.341 6.427 8.255 C 6.929 7.17 7.52 6.471 8.2 6.161 C 8.983 5.836 9.729 5.673 10.439 5.673 C 10.601 5.673 10.719 5.688 10.793 5.718 C 10.867 5.748 10.989 5.88 11.159 6.117 C 11.329 6.353 11.514 6.652 11.713 7.014 C 11.912 7.377 12.108 7.727 12.3 8.067 C 12.489 8.401 12.674 8.737 12.854 9.076 C 13.032 9.408 13.142 9.619 13.187 9.707 C 13.231 9.781 13.327 9.921 13.475 10.128 C 13.622 10.335 13.734 10.52 13.807 10.682 C 13.881 10.845 13.918 11 13.918 11.148 C 13.918 11.37 13.766 11.639 13.464 11.957 C 13.161 12.274 12.828 12.566 12.466 12.832 C 12.104 13.098 11.772 13.383 11.469 13.686 C 11.166 13.988 11.015 14.236 11.015 14.428 C 11.015 14.531 11.04 14.653 11.092 14.793 C 11.144 14.934 11.192 15.049 11.236 15.137 C 11.281 15.226 11.351 15.351 11.447 15.514 C 11.543 15.677 11.606 15.78 11.635 15.825 C 12.448 17.287 13.382 18.547 14.439 19.603 C 15.495 20.66 16.755 21.594 18.217 22.407 C 18.262 22.437 18.365 22.499 18.528 22.596 C 18.691 22.691 18.817 22.761 18.905 22.806 C 18.994 22.85 19.108 22.898 19.249 22.95 C 19.389 23.001 19.511 23.027 19.615 23.027 C 19.85 23.027 20.176 22.783 20.59 22.296 C 21.005 21.807 21.426 21.323 21.853 20.844 C 22.281 20.364 22.628 20.124 22.895 20.124 C 23.042 20.124 23.197 20.161 23.36 20.235 C 23.523 20.308 23.707 20.42 23.914 20.567 C 24.121 20.715 24.262 20.811 24.335 20.856 L 25.51 21.498 C 26.293 21.912 26.946 22.278 27.471 22.595 C 27.996 22.913 28.28 23.131 28.325 23.249 C 28.354 23.323 28.369 23.441 28.369 23.604 C 28.368 24.312 28.205 25.058 27.88 25.84 Z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-500 leading-tight">Call or text us today</span>
              {/* Feel free to swap this number out if it changes! */}
              <span className="text-[13px] font-bold text-black leading-tight">(619) 821-9836</span>
            </div>
          </a>


          <button onClick={() => setIsModalOpen(true)} className="cursor-pointer px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors shrink-0">
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button (Hamburger to X) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg relative z-50"
        >
          <span className={`w-5 h-[2px] bg-black absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
          <span className={`w-5 h-[2px] bg-black absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-5 h-[2px] bg-black absolute transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
        </button>

      </div>

      {/* Mobile Dropdown Menu (Still uses state so it functions on click/tap) */}
      <div 
        className={`absolute top-[120%] left-0 w-full bg-white/80 backdrop-blur-lg border border-white/30 rounded-[18px] shadow-lg transition-all duration-300 overflow-hidden md:hidden ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}
      >
        <div className="flex flex-col py-4 px-6 gap-4 text-[20px] font-medium text-black tracking-[-0.05em]">
          {/* Added the anchor link here as well */}
          <a href="/#packages" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-200/50 pb-2">Car Detailing</a>
          <Link href="/services/ceramic" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-200/50 pb-2">Ceramic Coating</Link>
          <Link href="/services/paint" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-200/50 pb-2">Paint Polish</Link>
          <a href="/#faq" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-200/50 pb-2">FAQ</a>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-200/50 pb-2">About Us</Link>
          
          <div className="flex flex-col mt-2">
            <button onClick={() => {setIsMobileMenuOpen(false); setIsModalOpen(true)} } className="text-blue-600 font-bold mb-2 cursor-pointer text-start">Book Now</button>
            <a href="tel:6198219836" className="text-gray-500 text-[16px]">Or call: (619) 821-9836</a>
          </div>
        </div>
      </div>

    </nav>
  );
}