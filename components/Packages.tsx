"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import BookingModal from "./BookingModal";

// 1. Organize all your package data perfectly here
const packagesData = {
  "Full Detail": [
    {
      title: "Refresh Detail",
      badge: "Refresh",
      badgeColor: "text-[#4AFF5C]",
      image: "/images/car4.jpg",
      features: [
        "Double vacuum & full interior deep clean",
        "Steam sanitize, stain removal & protectant",
        "Mats & trunk detailed; door jambs cleaned",
        "Hand wash, clay bar & light spot polish",
        "Bug removal, windows, wheels; 3-month wax"
      ]
    },
    {
      title: "Gold Full Detail",
      badge: "Popular",
      badgeColor: "text-[#FFDD00]",
      image: "/images/car3.jpg",
      features: [
        "Double vacuum & full interior deep clean",
        "Steam sanitize, stain removal & protectant",
        "Mats & trunk detailed; door jambs cleaned",
        "Hand wash, clay bar & light spot polish",
        "Bug removal, windows, wheels; 3-month wax"
      ]
    },
    {
      title: "Masterpiece Detail",
      badge: "Vip",
      badgeColor: "text-[#6EFFFF]",
      image: "/images/car2.png",
      features: [
        "Seats & carpets shampooed with extraction",
        "Complete deep clean, steam & interior protectant",
        "Clay bar, one-step or two-step polish & trim restore (as needed)",
        "Wheels, windows; bug removal",
        "Ceramic coating available — choose 1, 3, 5, or 7-year protection"
      ]
    }
  ],
  "Exterior Only": [
    {
      title: "Classic Exterior",
      badge: "Classic",
      badgeColor: "text-[#4AFF5C]",
      image: "/images/car4.jpg",
      features: [
        "Hand wash & clay bar treatment",
        "Spot polish on high-touch areas",
        "Wheel wells, rims & tires detailed",
        "Windows & mirrors cleaned",
        "3-month wax protection"
      ]
    },
    {
      title: "Wax & Buff",
      badge: "Popular",
      badgeColor: "text-[#FFDD00]",
      image: "/images/car13.webp",
        features: [
          "2-step paint correction after clay decon",
          "Professional hand wash; bug removal",
          "Rims, tires & wheel wells detailed",
          "Windows & mirrors cleaned",
          "6-month protection",
          "Ceramic coating available on request"
        ]
    },
    {
      title: "Cut & Polish",
      badge: "Vip",
      badgeColor: "text-[#6EFFFF]",
      image: "/images/car2.png",
      features: [
        "1-step paint correction & hand wash",
        "Clay bar decon; wheel wells cleaned",
        "Rims & tires detailed; windows polished",
        "6-month wax protection"
      ]
    }
  ],
  "Interior Only": [
    {
      title: "Classic Interior",
      badge: "Classic",
      badgeColor: "text-[#4AFF5C]",
      image: "/images/car1.jpg",
      features: [
        "Complete interior vacuum & surface wipe",
        "Spot steam & stain treatment",
        "Door jambs, mats & trunk detailed"
      ]
    },
    {
      title: "Deep Clean",
      badge: "Popular",
      badgeColor: "text-[#FFDD00]",
      image: "/images/car9.jpg",
      features: [
        "Double vacuum & deep interior clean",
        "Steam sanitize + shampoo extraction",
        "Protectant finish; mats & trunk detailed",
        "Optional interior ceramic coating for leather, vinyl & plastics",
        "Fabric/upholstery protection available"
      ]
    }
  ]
};

// Extracted the tab keys so we can map over them dynamically
type TabName = keyof typeof packagesData;
const tabNames: TabName[] = ["Full Detail", "Exterior Only", "Interior Only"];

export default function Packages() {
  const [activeTab, setActiveTab] = useState<TabName>("Full Detail");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Smooth scroll logic for the bottom arrows
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-16 lg:py-20 px-4 md:px-6 relative overflow-hidden">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div id="packages" className="max-w-7xl mx-auto flex flex-col items-center scroll-mt-28 md:scroll-mt-32">
        
        <h2 className="text-[34px] md:text-[42px] font-extrabold tracking-[-0.04em] text-black mb-8 text-center leading-[1.1]">
          Choose A Package
        </h2>

        {/* THE TABS TOGGLE */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-[95%] sm:w-auto mx-auto mb-10 overflow-hidden">
          {tabNames.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer flex-1 sm:flex-none px-3 sm:px-8 py-2.5 sm:py-3 text-[13px] sm:text-[15px] font-semibold tracking-[-0.03em] transition-all rounded-lg ${
                activeTab === tab 
                  ? "bg-[#2d9639] text-white shadow-[0_0_15px_rgba(45,150,57,0.4)]" 
                  : "text-gray-500 hover:text-black hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CAROUSEL CONTAINER */}
        {/* snap-x and overflow-x-auto allows for buttery smooth mobile swiping */}
        <div 
          ref={scrollRef}
          className="flex flex-nowrap justify-start md:justify-center gap-4 sm:gap-6 w-full overflow-x-auto snap-x snap-mandatory pb-8 pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {packagesData[activeTab].map((pkg, idx) => (
            <article 
              key={idx} 
              className="snap-center shrink-0 w-[85vw] sm:w-[340px] bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col transition-transform duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Top Image Half */}
              <div className="relative w-full h-[240px]">
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
                
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                
                {/* Floating Image Text */}
                <div className="absolute bottom-4 left-0 w-full flex flex-col items-center justify-end z-10 drop-shadow-md">
                  <span className={`${pkg.badgeColor} font-['Brush_Script_MT',cursive] italic text-[24px] sm:text-[28px] leading-none mb-1`}>
                    {pkg.badge}
                  </span>
                  <h3 className="text-[22px] sm:text-[24px] font-bold text-white tracking-[-0.04em] leading-tight">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Details Half */}
              <div className="p-5 flex flex-col grow bg-white">
                <h4 className="text-[16px] font-bold text-black tracking-[-0.04em] mb-4">
                  What&apos;s Included
                </h4>
                
                {/* Responsive 2-column grid for features */}
                <ul className="grid grid-cols-2 gap-x-2 gap-y-3 mb-8">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5 text-[11px] sm:text-[12px] text-gray-600 tracking-[-0.02em] leading-tight">
                      {/* Custom Checkmark SVG matching your Framer HTML */}
                      <svg className="w-3 h-3 mt-[2px] shrink-0 text-gray-800" fill="currentColor" viewBox="0 0 21 21">
                        <path d="M10.5 0C4.7 0 0 4.7 0 10.5S4.7 21 10.5 21 21 16.3 21 10.5 16.3 0 10.5 0zm5.1 8l-6 6c-.1.1-.3.2-.5.2s-.4-.1-.5-.2l-3-3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.5 2.5 5.5-5.5c.3-.3.8-.3 1.1 0 .2.3.2.8-.2 1.1z" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Book Online Button */}
                <button onClick={() => setIsModalOpen(true)} className="mt-auto block w-full py-3.5 rounded-[60px] bg-black text-white text-center text-[15px] font-medium tracking-[-0.02em] shadow-md hover:bg-gray-800 transition-colors cursor-pointer">
                  Book Online
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* BOTTOM ARROWS (Hidden on very wide screens where all cards fit) */}
        <div className="flex md:hidden justify-center items-center gap-4 mt-2">
          <button 
            onClick={() => handleScroll("left")}
            className="cursor-pointer w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-black"
            aria-label="Scroll left"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          
          <button 
            onClick={() => handleScroll("right")}
            className="cursor-pointer w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-black"
            aria-label="Scroll right"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

      </div>
    </section>
  );
}