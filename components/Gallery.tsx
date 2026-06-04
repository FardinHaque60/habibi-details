"use client";

import Image from "next/image";

const topRowImages = [
  "/images/gal_car12.jpeg",
  "/images/gal_car14.jpeg",
  "/images/gal_car15.png",
  "/images/gal_car16.png",
  "/images/gal_car17.png",
  "/images/gal_car18.png",
];

const bottomRowImages = [
  "/images/gal_car12.jpeg",
  "/images/gal_car14.jpeg",
  "/images/gal_car15.png",
  "/images/gal_car16.png",
  "/images/gal_car17.png",
  "/images/gal_car18.png",
];

export default function Gallery() {

    return (
        <section className="w-full bg-black py-16 lg:py-20 md:py-24 overflow-hidden relative">
        
            {/* Custom CSS for the Infinite Marquee Animation */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marqueeLeft {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
                }
                @keyframes marqueeRight {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }s
                }
                .animate-marquee-left {
                animation: marqueeLeft 35s linear infinite;
                width: max-content;
                }
                .animate-marquee-right {
                animation: marqueeRight 35s linear infinite;
                width: max-content;
                }
                .hover-pause:hover {
                animation-play-state: paused;
                }
            `}} />

            <div className="max-w-4xl mx-auto flex flex-col items-center text-center px-6 mb-12 md:mb-16 relative z-10">
                <h2 className="text-[32px] md:text-[50px] font-extrabold tracking-[-0.04em] text-white mb-4 md:mb-6 leading-[1.1]">
                Show your car some love.
                </h2>
                <p className="text-gray-400 text-[14px] md:text-[16px] leading-[160%] tracking-[-0.04em] max-w-2xl">
                Get service at your home with our mobile detailing service.
                </p>
            </div>

            {/* TOP ROW (Scrolls Left) */}
            <div className="relative w-full flex overflow-hidden mb-3">
                <div className="flex animate-marquee-left hover-pause gap-3">
                {[...topRowImages, ...topRowImages].map((imgSrc, index) => (
                    <div key={`top-${index}`} className="relative w-[180px] h-[240px] sm:w-[220px] sm:h-[300px] shrink-0 overflow-hidden">
                    <Image 
                        src={imgSrc} 
                        alt={`Detailing Gallery Image ${index}`} 
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    </div>
                ))}
                </div>
            </div>

            {/* BOTTOM ROW (Scrolls Right) */}
            <div className="relative w-full flex overflow-hidden">
                <div className="flex animate-marquee-right hover-pause gap-3">
                {[...bottomRowImages, ...bottomRowImages].map((imgSrc, index) => (
                    <div key={`bottom-${index}`} className="relative w-[180px] h-[240px] sm:w-[220px] sm:h-[300px] shrink-0 overflow-hidden">
                    <Image 
                        src={imgSrc} 
                        alt={`Detailing Gallery Image ${index}`} 
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    </div>
                ))}
                </div>
            </div>

            {/* Gradient Fades for the edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        </section>
    );
}