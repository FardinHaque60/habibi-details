"use client"

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaintSEO from "@/components/PaintSEO";
import BookingModal from "@/components/BookingModal";

export default function Paint() {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-[#0a0a0a]">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Navbar />

      {/* --- CERAMIC HERO SECTION --- */}
      <section className="relative w-full sm:min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-black">
        
        {/* Background Video - Centered and Responsive */}
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute top-1/2 left-1/2 w-full object-cover -translate-x-1/2 -translate-y-1/2 z-0 mt-20"
        >
            <source src="/paint/paint_polish_home.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlays for Text Legibility */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="absolute bottom-15 md:bottom-0 lg:bottom-0 inset-x-0 h-30 bg-linear-to-b from-transparent to-black z-10 pointer-events-none"></div>

        {/* HERO CONTENT */}
        <div className="max-w-5xl min-h-[40vh] lg:min-h-[80vh] relative z-20 flex flex-col items-center text-center px-6 mt-35 md:mt-50 lg:mt-50">
            {/* <div className="flex items-center gap-2 mb-6">
            <svg className="w-4 h-4 text-[#2d9639]" viewBox="0 0 13 12" fill="currentColor">
                <path d="M6.5 12C6.315 12 6.137 11.944 5.997 11.817C5.472 11.34 4.966 10.892 4.519 10.497C3.207 9.335 2.076 8.334 1.289 7.348C0.41 6.246 0 5.2 0 4.058C0 2.949 0.366 1.925 1.031 1.176C1.704 0.418 2.628 0 3.632 0C4.382 0 5.069 0.246 5.674 0.732C5.979 0.978 6.256 1.278 6.5 1.628C6.744 1.278 7.021 0.978 7.326 0.732C7.931 0.246 8.618 0 9.368 0C10.372 0 11.296 0.418 11.969 1.176C12.634 1.925 13 2.949 13 4.058C13 5.2 12.59 6.246 11.711 7.348C10.924 8.334 9.793 9.335 8.483 10.495C8.036 10.891 7.529 11.34 7.002 11.818C6.863 11.944 6.685 12 6.5 12Z" />
            </svg>
            <p className="text-[15px] text-white tracking-[-0.05em] drop-shadow-md">
                Trusted by 10,000+ customers
            </p>
            </div> 
            */}

            <h1 className="text-[44px] md:text-[68px] font-extrabold text-white tracking-[-0.04em] leading-[110%] drop-shadow-lg max-w-4xl">
            Habibi Paint Polish
            </h1>
            
            {/* <p className="text-gray-300 text-base md:text-xl mt-6 max-w-2xl tracking-[-0.02em] leading-relaxed">
            Protect your investment with our advanced 9H and 10H ceramic coatings. Experience ultimate gloss, extreme water beading, and years of protection.
            </p> */}

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto mt-60 md:bottom-15 md:absolute lg:absolute lg:bottom-20">
            <a 
                href="/services/paint/#about"
                className="flex items-center justify-center w-full sm:w-auto px-20 py-2 rounded-[62px] bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium hover:bg-white/20 transition-all shadow-lg"
            >
                Learn More
            </a>
            </div>

        </div>
       </section>

        {/* --- INFO & VIDEO SECTION --- */}
        <section className="bg-black py-16 md:py-24 px-6 overflow-hidden">
        <div id="about" className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[60%_40%] lg:grid-cols-[65%_35%] items-center scroll-mt-28 md:scroll-mt-32">
            
            {/* Text & Buttons (2nd on mobile, 1st on desktop) */}
            <div className="flex flex-col w-full text-center md:text-left z-10 order-1 md:order-1">
                
                {/* Paragraphs split for proper spacing */}
                <h2 className="text-[45px] font-bold text-white tracking-[-0.04em] leading-[110%] mb-6">
                    Experience the Habibi Paint Polish
                </h2>
                <p className="text-gray-200 text-base md:text-lg leading-[1.6] tracking-[-0.04em] mb-4 font-light">
                    Give your car’s exterior a true reset with professional paint polishing and correction in San Diego and La Jolla. 
                    Paint polishing is a specialized restorative process that safely levels your vehicle’s clear coat, permanently 
                    removing surface imperfections and restoring a mirror-like finish that makes your paint look brand new.
                </p>
                <p className="text-gray-200 text-base md:text-lg leading-[1.6] tracking-[-0.04em] mb-10 font-light">
                    Over time, daily driving, improper washing, and the harsh coastal environment leave your paint riddled with 
                    swirl marks, light scratches, water spots, and oxidation. Our multi-stage machine polishing process eliminates 
                    these defects at the microscopic level, bringing back deep color clarity, richness, and extreme gloss that 
                    regular waxing simply cannot achieve.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                    
                    {/* Yellow "Book Now" Button with Arrow */}
                    <button onClick={() => setIsModalOpen(true)} className="cursor-pointer group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#31d414] border border-[#6BFF4D] shadow-[inset_0_5px_11px_3px_#9CFF85] rounded-[62px] text-black font-medium tracking-[-0.05em] hover:bg-[#5dec41] transition-all">
                        <span>Book Now</span>
                        <svg className="w-3 h-3 text-black transform rotate-180 group-hover:translate-x-1 transition-transform" viewBox="0 0 11 9" fill="currentColor">
                            <path d="M0.176 4.08 L4.148 0.173 C4.262 0.061 4.413 0 4.574 0 C4.735 0 4.886 0.061 5 0.173 L5.36 0.528 C5.474 0.639 5.536 0.788 5.536 0.946 C5.536 1.105 5.474 1.258 5.36 1.37 L3.043 3.654 L10.406 3.654 C10.738 3.654 11 3.91 11 4.236 L11 4.738 C11 5.064 10.738 5.346 10.406 5.346 L3.017 5.346 L5.36 7.643 C5.474 7.754 5.536 7.899 5.536 8.057 C5.536 8.216 5.474 8.363 5.36 8.474 L5 8.828 C4.886 8.939 4.735 9 4.574 9 C4.413 9 4.262 8.938 4.148 8.827 L0.176 4.92 C0.062 4.808 0 4.659 0 4.5 C0 4.341 0.062 4.191 0.176 4.08 Z" />
                        </svg>
                    </button>

                    {/* Outline Secondary Button */}
                    <a 
                        href="tel:6198219836" 
                        className="flex items-center justify-center w-full sm:w-auto px-8 py-4 border border-white/30 rounded-[62px] text-white tracking-[-0.04em] hover:bg-white/10 hover:border-white transition-all"
                    >
                        Call Now
                    </a>
                </div>
            </div>

            {/* Responsive Video Container (1st on mobile, 2nd on desktop) */}
            <div className="relative w-full h-65 md:h-80 rounded-3xl overflow-hidden order-3 md:order-2 bg-black">
                <video 
                    src="/paint/paint_polish_car.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover object-left"
                ></video>
            </div>

        </div>
        </section>

      {/* --- FAQ & FOOTER --- */}
      <div className="bg-black border-t border-white/10">
        <PaintSEO />
        <Footer />
      </div>

    </div>
  );
}