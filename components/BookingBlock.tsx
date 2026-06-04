"use client";

import { useTransition, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toggleBookingStatus, deleteBooking } from "@/actions/adminActions";
import Image from "next/image";

export default function BookingBlock({ booking, topOffset, blockHeight, totalCols }: any) {
  const [isPending, startTransition] = useTransition();
  const [isDone, setIsDone] = useState(booking.is_done);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock scrolling when detail modal is open
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const handleToggle = (e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation(); // Stop click from opening the modal
    setIsDone(!isDone);
    startTransition(() => {
      toggleBookingStatus(booking.id, isDone);
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click from opening the modal
    if (window.confirm("Are you sure you want to delete this appointment? This cannot be undone.")) {
      startTransition(() => {
        deleteBooking(booking.id);
      });
    }
  };

  const timeString = booking.appt_time.split("T")[1];
  const [bHour, bMin] = timeString.split(":").map(Number);

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/60 transition-opacity">
      <div className="relative w-full max-w-2xl bg-[#121212] border border-white/20 shadow-2xl rounded-[24px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto [scrollbar-width:none]">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsModalOpen(false)}
          className="cursor-pointer absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Appointment Details</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white mb-8">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Client Name</p>
            <p className="text-lg font-medium">{booking.first_name} {booking.last_name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Contact Info</p>
            <p className="text-md">{booking.phone}</p>
            <p className="text-md text-blue-400"><a href={`mailto:${booking.email}`}>{booking.email}</a></p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Service Requested</p>
            <p className="text-md font-medium text-[#F9D042]">{booking.service}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date & Time</p>
            <p className="text-md">
              {booking.appt_time.split("T")[0]} at {bHour > 12 ? bHour - 12 : bHour}:{String(bMin).padStart(2, "0")} {bHour >= 12 ? "PM" : "AM"}
            </p>
          </div>
        </div>

        {/* Scrolling Image Row */}
        {booking.images && booking.images.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Uploaded Images</p>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-thin">
              {booking.images.map((url: string, idx: number) => (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="relative w-50 h-50 shrink-0 snap-start rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition-transform cursor-pointer block">
                  <Image src={url} alt={`Client upload ${idx}`} fill className="object-cover" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className={`absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-lg flex flex-col gap-1 hover:bg-white/20 transition-all overflow-hidden cursor-pointer group ${
          isDone ? 'opacity-40 grayscale' : 'opacity-100'
        } ${isPending ? 'animate-pulse' : ''}`}
        style={{ 
          top: `${topOffset}px`, 
          height: `${blockHeight}px`,
          width: `calc(${100 / totalCols}% - 4px)`,
          left: `calc(${100 / totalCols}% * ${booking.colIndex})`
        }}
      >
        <div className="flex items-center justify-between mb-1">
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F9D042]"></div>
            <span className="text-xs font-bold text-[#F9D042]">
              {bHour > 12 ? bHour - 12 : bHour}:{String(bMin).padStart(2, "0")} {bHour >= 12 ? "PM" : "AM"}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Trash Can Button */}
            <button onClick={handleDelete} className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors" aria-label="Delete">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            {/* The Checkbox */}
            <input 
              type="checkbox" 
              checked={isDone}
              onChange={handleToggle}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4 rounded border-gray-300 text-[#F9D042] focus:ring-[#F9D042] cursor-pointer"
            />
          </div>

        </div>
        
        <span className="text-sm font-bold text-white truncate">
          {booking.first_name} {booking.last_name}
        </span>
        <span className="text-[11px] text-gray-300 truncate leading-tight">
          {booking.service}
        </span>
        <span className="text-xs text-gray-400 mt-auto truncate group-hover:text-white transition-colors">
          📞 {booking.phone}
        </span>
      </div>

      {isModalOpen && createPortal(modalContent, document.body)}
    </>
  );
}