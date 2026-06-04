"use client";

import { useState } from "react";
import { loginAdmin } from "@/actions/adminAuth";
import Image from "next/image";

export default function AdminLogin() {
  const [error, setError] = useState("");

  const handleLogin = async (formData: FormData) => {
    const res = await loginAdmin(formData);
    if (res?.error) setError(res.error);
  };

  return (
    <div className="min-h-screen w-full bg-[url('/images/home_background.png')] bg-cover bg-center relative flex items-center justify-center">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 z-0"></div>

      {/* Glassmorphism Login Box */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col items-center">
        <Image src="/logo.png" alt="Logo" width={150} height={50} className="mb-8" />
        
        <h1 className="text-2xl font-bold text-white mb-6">Admin Portal</h1>
        
        <form action={handleLogin} className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-2">Enter Admin Password:</label>
            <input 
              type="password" 
              name="password" 
              required
              className="w-full bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#F9D042] rounded-xl px-4 py-3"
              placeholder="••••••••"
            />
            {error && <span className="text-red-400 text-sm mt-2">{error}</span>}
          </div>

          <button 
            type="submit"
            className="cursor-pointer w-full mt-2 py-3 rounded-full bg-[#F9D042] text-black font-bold tracking-[-0.02em] hover:brightness-105 transition-all shadow-[inset_0_2px_5px_rgba(255,255,255,0.4)]"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}