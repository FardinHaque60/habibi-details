"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

import Faq from "@/components/Faq";      
import Footer from "@/components/Footer"; 
import Packages from "@/components/Packages";
import Gallery from "@/components/Gallery";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="w-full bg-white">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Clean Next.js Image Component */}
        <Image 
          src="/bg.png" 
          alt="Premium Car Detailing Background" 
          fill
          className="object-cover object-center absolute inset-0"
          priority
        />

        {/* Overlays */}
        <div className="absolute top-0 inset-x-0 sm:h-[20vh] h-[25vh] bg-blue-200 z-5"></div>
        <div className="absolute sm:top-[20vh] top-[25vh] inset-x-0 sm:h-[25vh] h-[30vh] bg-gradient-to-b from-blue-200 to-transparent z-5"></div>
        <div className="absolute bottom-0 inset-x-0 h-[15vh] md:h-[25vh] lg:h-[30vh] bg-gradient-to-b from-transparent to-white z-5"></div>

          {/* MAIN HERO CONTENT (Perfectly Centered) */}
          <div className="max-w-5xl relative z-20 flex flex-col items-center text-center px-6 sm:mt-[-40vh] mt-[-25vh]">
            
            <div className="flex items-center gap-2 mt-4">
              <svg className="w-4 h-4 text-[#FF1261]" viewBox="0 0 13 12" fill="currentColor">
                <path d="M6.5 12C6.315 12 6.137 11.944 5.997 11.817C5.472 11.34 4.966 10.892 4.519 10.497C3.207 9.335 2.076 8.334 1.289 7.348C0.41 6.246 0 5.2 0 4.058C0 2.949 0.366 1.925 1.031 1.176C1.704 0.418 2.628 0 3.632 0C4.382 0 5.069 0.246 5.674 0.732C5.979 0.978 6.256 1.278 6.5 1.628C6.744 1.278 7.021 0.978 7.326 0.732C7.931 0.246 8.618 0 9.368 0C10.372 0 11.296 0.418 11.969 1.176C12.634 1.925 13 2.949 13 4.058C13 5.2 12.59 6.246 11.711 7.348C10.924 8.334 9.793 9.335 8.483 10.495C8.036 10.891 7.529 11.34 7.002 11.818C6.863 11.944 6.685 12 6.5 12Z" />
              </svg>
              <p className="text-[15px] italic text-black tracking-[-0.05em] drop-shadow-md">
                Habibi Quality, Every Time
              </p>
            </div>
            <h1 className="text-[40px] md:text-[70px] font-extrabold text-black tracking-[-0.04em] leading-[110%] drop-shadow-lg">
              Habibi Detailing in San Diego
            </h1>
            
          </div>

          {/* Using absolute positioning to pin it securely to the bottom of the viewport */}
          <div className="absolute bottom-0 md:bottom-5 lg:bottom-15 left-1/2 -translate-x-1/2 z-30 w-full px-3 flex justify-center flex-row gap-4">
            
            {/* 2. THIS IS THE ACTUAL BUTTON */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer group flex items-center justify-center gap-2 px-8 py-4 rounded-[62px] bg-[#F9D042] border border-[#FFF12E] shadow-[inset_0_5px_11px_3px_#FFFB26] hover:brightness-105 transition-all w-full max-w-[280px]"
            >
              <span className="text-black text-[16px] font-medium tracking-[-0.05em] leading-none">
                Book Online
              </span>
              <svg className="w-3 h-3 text-black transform rotate-180 group-hover:translate-x-1 transition-transform" viewBox="0 0 11 9" fill="currentColor">
                <path d="M0.176 4.08 L4.148 0.173 C4.262 0.061 4.413 0 4.574 0 C4.735 0 4.886 0.061 5 0.173 L5.36 0.528 C5.474 0.639 5.536 0.788 5.536 0.946 C5.536 1.105 5.474 1.258 5.36 1.37 L3.043 3.654 L10.406 3.654 C10.738 3.654 11 3.91 11 4.236 L11 4.738 C11 5.064 10.738 5.346 10.406 5.346 L3.017 5.346 L5.36 7.643 C5.474 7.754 5.536 7.899 5.536 8.057 C5.536 8.216 5.474 8.363 5.36 8.474 L5 8.828 C4.886 8.939 4.735 9 4.574 9 C4.413 9 4.262 8.938 4.148 8.827 L0.176 4.92 C0.062 4.808 0 4.659 0 4.5 C0 4.341 0.062 4.191 0.176 4.08 Z" />
              </svg>
            </button>

            <Link 
              href="tel:6198219836"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-[62px] bg-black transition-all w-full max-w-[280px]"
            >
              <span className="text-white text-[16px] font-medium tracking-[-0.05em] leading-none">
                Call Now
              </span>
            </Link>
          </div>
      </section>

      {/* --- OUR MAIN SERVICES (COMPACT TILES) --- */}
      <section className="w-full bg-white py-16 lg:py-20 md:py-24 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <h2 className="text-[30px] md:text-[36px] font-extrabold tracking-[-0.04em] text-black mb-8 text-center leading-[1.1]">
            Our Main Services
          </h2>

          {/* Changed from grid to flex and restricted width to make them compact tiles */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
            
            {/* TILE 1: Mobile Detailing */}
            <a href="/#packages" className="group relative w-full sm:w-[280px] md:w-[320px] h-[160px] md:h-[200px] rounded-[24px] overflow-hidden block shrink-0">
              <Image 
                src="/images/car3.jpg" 
                alt="Mobile Detailing Service" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50 z-10"></div>
              
              <div className="absolute inset-0 flex flex-col items-start justify-end p-4 z-20">
                <h3 className="text-[20px] md:text-[22px] font-semibold text-white tracking-[-0.04em] mb-4 drop-shadow-md text-center leading-[110%]">
                  Mobile Detailing
                </h3>
                
                {/* Yellow Learn More Button (Scaled down slightly for smaller tile) */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-[32px] bg-[#FCDF00] shadow-[inset_2px_2px_4px_1px_rgba(255,255,255,0.4)] group-hover:brightness-105 transition-all">
                  <span className="text-black text-[13px] font-medium tracking-[-0.06em]">Learn More</span>
                  <svg className="w-3 h-3 text-black transform group-hover:translate-x-1 transition-transform rotate-180" viewBox="0 0 11 9" fill="currentColor">
                    <path d="M0.176 4.08 L4.148 0.173 C4.262 0.061 4.413 0 4.574 0 C4.735 0 4.886 0.061 5 0.173 L5.36 0.528 C5.474 0.639 5.536 0.788 5.536 0.946 C5.536 1.105 5.474 1.258 5.36 1.37 L3.043 3.654 L10.406 3.654 C10.738 3.654 11 3.91 11 4.236 L11 4.738 C11 5.064 10.738 5.346 10.406 5.346 L3.017 5.346 L5.36 7.643 C5.474 7.754 5.536 7.899 5.536 8.057 C5.536 8.216 5.474 8.363 5.36 8.474 L5 8.828 C4.886 8.939 4.735 9 4.574 9 C4.413 9 4.262 8.938 4.148 8.827 L0.176 4.92 C0.062 4.808 0 4.659 0 4.5 C0 4.341 0.062 4.191 0.176 4.08 Z"/>
                  </svg>
                </div>
              </div>
            </a>

            {/* TILE 2: Paint Polish */}
            <Link href="/services/paint" className="group relative w-full sm:w-[280px] md:w-[320px] h-[160px] md:h-[200px] rounded-[24px] overflow-hidden block shrink-0">
              <Image 
                src="/images/car7.png" 
                alt="Paint Polish Service" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50 z-10"></div>
              
              <div className="absolute inset-0 flex flex-col items-start justify-end p-4 z-20">
                <h3 className="text-[20px] md:text-[22px] font-semibold text-white tracking-[-0.04em] mb-4 drop-shadow-md text-center leading-[110%]">
                  Paint Polish
                </h3>
                
                <div className="flex items-center gap-2 px-4 py-2 rounded-[32px] bg-[#FCDF00] shadow-[inset_2px_2px_4px_1px_rgba(255,255,255,0.4)] group-hover:brightness-105 transition-all">
                  <span className="text-black text-[13px] font-medium tracking-[-0.06em]">Learn More</span>
                  <svg className="w-3 h-3 text-black transform group-hover:translate-x-1 transition-transform rotate-180" viewBox="0 0 11 9" fill="currentColor">
                    <path d="M0.176 4.08 L4.148 0.173 C4.262 0.061 4.413 0 4.574 0 C4.735 0 4.886 0.061 5 0.173 L5.36 0.528 C5.474 0.639 5.536 0.788 5.536 0.946 C5.536 1.105 5.474 1.258 5.36 1.37 L3.043 3.654 L10.406 3.654 C10.738 3.654 11 3.91 11 4.236 L11 4.738 C11 5.064 10.738 5.346 10.406 5.346 L3.017 5.346 L5.36 7.643 C5.474 7.754 5.536 7.899 5.536 8.057 C5.536 8.216 5.474 8.363 5.36 8.474 L5 8.828 C4.886 8.939 4.735 9 4.574 9 C4.413 9 4.262 8.938 4.148 8.827 L0.176 4.92 C0.062 4.808 0 4.659 0 4.5 C0 4.341 0.062 4.191 0.176 4.08 Z"/>
                  </svg>
                </div>
              </div>
            </Link>

            {/* TILE 3: Ceramic Coating */}
            <Link href="/services/ceramic" className="group relative w-full sm:w-[280px] md:w-[320px] h-[160px] md:h-[200px] rounded-[24px] overflow-hidden block shrink-0">
              <Image 
                src="/images/car2.png" 
                alt="Ceramic Coating Service" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50 z-10"></div>
              
              <div className="absolute inset-0 flex flex-col items-start justify-end p-4 z-20">
                <h3 className="text-[20px] md:text-[22px] font-semibold text-white tracking-[-0.04em] mb-4 drop-shadow-md text-center leading-[110%]">
                  Ceramic Coating
                </h3>
                
                <div className="flex items-center gap-2 px-4 py-2 rounded-[32px] bg-[#FCDF00] shadow-[inset_2px_2px_4px_1px_rgba(255,255,255,0.4)] group-hover:brightness-105 transition-all">
                  <span className="text-black text-[13px] font-medium tracking-[-0.06em]">Learn More</span>
                  <svg className="w-3 h-3 text-black transform group-hover:translate-x-1 transition-transform rotate-180" viewBox="0 0 11 9" fill="currentColor">
                    <path d="M0.176 4.08 L4.148 0.173 C4.262 0.061 4.413 0 4.574 0 C4.735 0 4.886 0.061 5 0.173 L5.36 0.528 C5.474 0.639 5.536 0.788 5.536 0.946 C5.536 1.105 5.474 1.258 5.36 1.37 L3.043 3.654 L10.406 3.654 C10.738 3.654 11 3.91 11 4.236 L11 4.738 C11 5.064 10.738 5.346 10.406 5.346 L3.017 5.346 L5.36 7.643 C5.474 7.754 5.536 7.899 5.536 8.057 C5.536 8.216 5.474 8.363 5.36 8.474 L5 8.828 C4.886 8.939 4.735 9 4.574 9 C4.413 9 4.262 8.938 4.148 8.827 L0.176 4.92 C0.062 4.808 0 4.659 0 4.5 C0 4.341 0.062 4.191 0.176 4.08 Z"/>
                  </svg>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* OUR MAIN SERVICES SECTION */}
      {/* I used bg-gray-50 so it slightly contrasts with the white section above it! */}
      {/* DETAIL PACKAGES SECTION */}
      <Packages />

      {/* GALLERY / SHOW YOUR CAR SOME LOVE SECTION */}
      <Gallery />

      {/* Add your new components here at the very bottom! */}
      <Faq />
      <Footer />

    </div>
  );
}