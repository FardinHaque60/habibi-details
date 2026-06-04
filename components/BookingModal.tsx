"use client";

import { useState, useEffect } from "react";
import { submitBooking } from "../actions/bookAppointments";
import { createPortal } from "react-dom";
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    appointmentTime: "",
    service: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleAction = async (formData: FormData) => {
    setErrors({});
    const errors: Record<string, string> = {};

    // 1. Basic Text Validation
    if (!formData.get("firstName")) errors.firstName = "Required";
    if (!formData.get("lastName")) errors.lastName = "Required";
    if (!formData.get("email")) errors.email = "Required";
    if (!formData.get("phone")) errors.phone = "Required";
    if (!formData.get("service")) errors.service = "Required";
    
    // 2. Time Validation (8 AM to 5 PM)
    const apptTime = formData.get("appointmentTime") as string;
    if (!apptTime) {
      errors.appointmentTime = "Required";
    } else {
      // Split the "YYYY-MM-DDTHH:mm" string
      const timePart = apptTime.split("T")[1]; 
      if (timePart) {
        const [hour, minute] = timePart.split(":").map(Number);
        // If before 8:00 AM OR after 5:00 PM
        if (hour < 8 || hour > 17 || (hour === 17 && minute > 0)) {
          errors.appointmentTime = "Appointments must be between 8:00 AM and 5:00 PM.";
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // 3. File Size Validation (Max 25MB total)
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 25 * 1024 * 1024; // 25MB in bytes
    if (totalSize > maxSize) {
      alert("Total photo size exceeds 25MB limit. Please upload fewer or smaller photos.");
      return;
    }

    // 4. Inject Files into FormData
    formData.delete("images"); 
    selectedFiles.forEach((file) => {
      formData.append("images", file); 
    });

    setIsSubmitting(true);
    const result = await submitBooking(formData);
    setIsSubmitting(false);

    if (result.success) {
      alert("Booking Request Sent Successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        appointmentTime: "",
        service: "",
      });
      setSelectedFiles([]); 
      onClose(); 
    } else {
      alert("Something went wrong saving your booking.");
    }
  };

  // If the modal is not open, or the portal hasn't mounted, render nothing.
  if (!isOpen) return null;

  // The actual modal HTML that gets portaled
  const modalContent = (
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/60 transition-opacity">
      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[24px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto [scrollbar-width:none]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="cursor-pointer absolute top-5 right-5 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.04em] text-black mb-2 mt-2">Request Booking</h2>
        <p className="text-gray-600 text-[14px] leading-relaxed mb-6">Fill out the form below and we will contact you to confirm your appointment.</p>

        <form 
          onSubmit={(e) => {
            e.preventDefault(); // Prevents page reload
            const formData = new FormData(e.currentTarget); // Grabs all the inputs safely
            handleAction(formData); // Fires your exact function
          }} 
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[13px] font-bold text-gray-800 mb-1 ml-1">
                First Name <span className="text-red-500">*</span>
              </label>
              
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="text-black w-full bg-white/70 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none rounded-xl px-4 py-3 text-[15px] transition-all" placeholder="John" />
              {errors.firstName && <span className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.firstName}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-[13px] font-bold text-gray-800 mb-1 ml-1">Last Name  <span className="text-red-500">*</span> </label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="text-black w-full bg-white/70 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none rounded-xl px-4 py-3 text-[15px] transition-all" placeholder="Doe" />
              {errors.lastName && <span className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.lastName}</span>}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[13px] font-bold text-gray-800 mb-1 ml-1">Service <span className="text-red-500">*</span></label>
            <div className="relative">
              <select name="service" value={(formData).service || ""} onChange={(e) => { setFormData({ ...formData, service: e.target.value }); if (errors.service) setErrors({ ...errors, service: "" }); }} className="text-black w-full bg-white/70 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none rounded-xl px-4 py-3 text-[15px] transition-all appearance-none">
                <option value="">Select a service</option>
                <option value="car detail">Car Detail</option>
                <option value="ceramic coating">Ceramic Coating</option>
                <option value="paint polish">Paint Polish</option>
              </select>
              <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
            {errors.service && <span className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.service}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[13px] font-bold text-gray-800 mb-1 ml-1">Email Address <span className="text-red-500">*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="text-black w-full bg-white/70 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none rounded-xl px-4 py-3 text-[15px] transition-all" placeholder="john@example.com" />
            {errors.email && <span className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[13px] font-bold text-gray-800 mb-1 ml-1">Phone Number <span className="text-red-500">*</span></label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="text-black w-full bg-white/70 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none rounded-xl px-4 py-3 text-[15px] transition-all" placeholder="(555) 000-0000" />
            {errors.phone && <span className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.phone}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[13px] font-bold text-gray-800 mb-1 ml-1">Preferred Date & Time <span className="text-red-500">*</span></label>
            <input type="datetime-local" name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} className="text-black w-full bg-white/70 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none rounded-xl px-4 py-3 text-[15px] transition-all" />
            {errors.appointmentTime && <span className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.appointmentTime}</span>}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-[13px] font-bold text-gray-800 mb-1 ml-1">Upload Photos (Optional)</label>
            <div className="relative w-full bg-white/70 border border-dashed border-gray-400 hover:border-black rounded-xl px-4 py-6 flex flex-col items-center justify-center transition-all cursor-pointer">
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              <span className="text-[14px] text-gray-600 font-medium text-center px-4">
                {selectedFiles.length > 0 ? `${selectedFiles.length} photos selected` : "Tap to upload images"}
              </span>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 rounded-full bg-black text-white text-[16px] font-bold tracking-[-0.02em] hover:bg-gray-800 transition-colors shadow-lg disabled:bg-gray-400 flex justify-center ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}