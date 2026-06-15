"use client"

import Image from 'next/image';
import { useState } from 'react';
import BookingModal from './BookingModal';

// The exact SVG checkmark icon from your raw HTML
const CheckIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    className="w-5 h-5 flex-shrink-0 mt-0.5"
  >
    <path 
      d="M 19.375 10 C 19.375 10.8 18.392 11.459 18.195 12.197 C 17.992 12.959 18.506 14.022 18.12 14.689 C 17.728 15.367 16.548 15.448 15.998 15.998 C 15.448 16.548 15.367 17.728 14.689 18.12 C 14.022 18.506 12.959 17.992 12.197 18.195 C 11.459 18.392 10.8 19.375 10 19.375 C 9.2 19.375 8.541 18.392 7.803 18.195 C 7.041 17.992 5.978 18.506 5.311 18.12 C 4.633 17.728 4.552 16.548 4.002 15.998 C 3.452 15.448 2.272 15.367 1.88 14.689 C 1.494 14.022 2.008 12.959 1.805 12.197 C 1.608 11.459 0.625 10.8 0.625 10 C 0.625 9.2 1.608 8.541 1.805 7.803 C 2.008 7.041 1.494 5.978 1.88 5.311 C 2.272 4.633 3.452 4.552 4.002 4.002 C 4.552 3.452 4.633 2.272 5.311 1.88 C 5.978 1.494 7.041 2.008 7.803 1.805 C 8.541 1.608 9.2 0.625 10 0.625 C 10.8 0.625 11.459 1.608 12.197 1.805 C 12.959 2.008 14.022 1.494 14.689 1.88 C 15.367 2.272 15.448 3.452 15.998 4.002 C 16.548 4.552 17.728 4.633 18.12 5.311 C 18.506 5.978 17.992 7.041 18.195 7.803 C 18.392 8.541 19.375 9.2 19.375 10 Z" 
      fill="rgb(17, 255, 0)" 
    />
    <path 
      d="M 12.709 7.206 L 9.14 10.775 L 7.29 8.927 C 6.888 8.525 6.237 8.525 5.835 8.927 C 5.434 9.328 5.434 9.98 5.835 10.381 L 8.431 12.977 C 8.821 13.367 9.456 13.367 9.846 12.977 L 14.162 8.661 C 14.563 8.26 14.563 7.608 14.162 7.206 C 13.76 6.805 13.11 6.805 12.709 7.206 Z" 
      fill="rgb(0,0,0)" 
    />
  </svg>
);

// Data extracted exactly from your HTML
const packages = [
  {
    id: 1,
    title: "3 Year Shield",
    image: "/ceramic/ceramic1.png",
    features: [
      "Exterior detail included",
      "1-step polish",
      "1 layer of 9H coating",
      "3-year warranty"
    ]
  },
  {
    id: 2,
    title: "5 Year Armor",
    image: "/ceramic/ceramic2.png",
    features: [
      "Exterior detail included",
      "1-step polish",
      "1 layer of 10H coating",
      "5-year warranty"
    ]
  },
  {
    id: 3,
    title: "10 Year Diamond",
    image: "/ceramic/ceramic3.png",
    features: [
      "3-step paint correction",
      "1 layer of 10H coating",
      "includes glass & wheels",
      "10-year warranty"
    ]
  }
];

export default function PricingCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-neutral-950 py-20 px-4 flex items-center justify-center font-sans">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="max-w-7xl mx-auto">
        
        {/* Responsive CSS Grid for the 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1 duration-300 shadow-2xl"
            >
              {/* Image Header - responsive heights for mobile friendliness */}
              <div className="relative w-full h-40 overflow-hidden bg-neutral-800">
                <Image 
                  src={pkg.image} 
                  alt={pkg.title} 
                  fill 
                  className="object-contain" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-white text-3xl font-bold tracking-tight text-center capitalize mb-8">
                  {pkg.title}
                </h3>

                {/* Features List */}
                <ul className="space-y-4 flex-grow mb-8 text-white tracking-wide leading-tight">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Call to Action Button - Glassmorphism */}
                <button onClick={() => setIsModalOpen(true)} className="cursor-pointer relative w-full py-4 px-6 rounded-2xl overflow-hidden group">
                {/* Glass effect background */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl transition-all duration-300 group-hover:bg-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"></div>
                
                {/* Text */}
                <span className="relative z-10 text-white font-semibold tracking-[0.06em] uppercase flex items-center justify-center">
                    Book Now
                </span>
                </button>
              </div>
              
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}