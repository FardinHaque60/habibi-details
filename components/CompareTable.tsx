"use client";

export default function CompareTable() {
    return (
      <section className="w-full bg-[#0a0a0a] py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-[40px] md:text-[50px] font-extrabold tracking-[-0.04em] text-white mb-6 leading-[1.1]">
              Car Wash vs. Habibi Detailing
            </h2>
            <p className="text-[14px] md:text-[16px] leading-[160%] tracking-[-0.04em] text-white/90 max-w-3xl">
              Our hand wash and detail go far beyond a typical tunnel wash. We remove embedded grime, revive interiors, and add lasting protection—so your car actually looks new.
            </p>
          </div>

          {/* Table Container */}
          <div className="flex flex-col md:flex-row w-full gap-6 md:gap-8">
            
            {/* LEFT CARD - Car Wash (Dark Theme) */}
            <div className="flex-1 bg-[#111111] rounded-[24px] p-8 md:p-10 flex flex-col border border-white/5">
              <div className="flex flex-col items-center mb-8">
                <h3 className="text-[26px] font-semibold text-white tracking-[-0.04em] mb-1">Car Wash</h3>
                <span className="text-[13px] font-bold tracking-[0.06em] text-white/50 uppercase">Not Recommended</span>
              </div>
              <div className="flex flex-col gap-6">
                {[
                  "Up to ~50 gal. of water per wash",
                  "You drive, wait, and hope for a good result",
                  "Average service, risk of swirl marks",
                  "Bulk, harsh chemicals",
                  "No clay bar decontamination",
                  "Little to no interior work",
                  "Quick pass, residue left behind",
                  "No real paint protection"
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    {/* Red X SVG */}
                    <svg className="shrink-0 w-6 h-6 mt-[2px]" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#2a1012" stroke="#ff4d4d" strokeWidth="1.5"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9l-6 6m0-6l6 6" stroke="#ff4d4d"/>
                    </svg>
                    <p className="text-[16px] text-white/70 leading-[160%] tracking-[-0.04em]">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT CARD - Habibi Detailing (Light Theme) */}
            {/* RIGHT CARD - Habibi Detailing (Light Theme) */}
            <div className="flex-1 bg-white rounded-[24px] p-8 md:p-10 flex flex-col shadow-2xl relative">
              <div className="flex flex-col items-center mb-8">
                {/* Changed to Deep Green */}
                <h3 className="text-[26px] font-semibold text-black tracking-[-0.04em] mb-1">Habibi Detailing</h3>
                {/* Changed to Bright Mint Green */}
                <span className="text-[13px] font-bold tracking-[0.06em] text-gray-500 uppercase">Recommended</span>
              </div>
              <div className="flex flex-col gap-6">
                {[
                  "Low-water hand wash methods",
                  "We come to your home or office",
                  "5-star quality and satisfaction focused",
                  "Premium, paint-safe products only",
                  "Clay bar available when needed",
                  "Thorough interior clean (steam/shampoo options)",
                  "Hand wash + proper drying for a streak-free finish",
                  "Wax protection available"
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    {/* Framer Check SVG - Updated to Green Theme */}
                    <svg className="shrink-0 w-6 h-6 mt-[2px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 29.063 15 C 29.063 16.2 27.588 17.189 27.293 18.295 C 26.988 19.439 27.759 21.033 27.18 22.034 C 26.592 23.051 24.823 23.173 23.998 23.998 C 23.173 24.823 23.051 26.592 22.034 27.18 C 21.033 27.759 19.439 26.988 18.295 27.293 C 17.189 27.588 16.2 29.063 15 29.063 C 13.8 29.063 12.811 27.588 11.705 27.293 C 10.561 26.988 8.967 27.759 7.966 27.18 C 6.949 26.592 6.827 24.823 6.002 23.998 C 5.177 23.173 3.408 23.051 2.82 22.034 C 2.241 21.033 3.012 19.439 2.707 18.295 C 2.412 17.189 0.938 16.2 0.938 15 C 0.938 13.8 2.412 12.811 2.707 11.705 C 3.012 10.561 2.241 8.967 2.82 7.966 C 3.408 6.949 5.177 6.827 6.002 6.002 C 6.827 5.177 6.949 3.408 7.966 2.82 C 8.967 2.241 10.561 3.012 11.705 2.707 C 12.811 2.412 13.8 0.938 15 0.938 C 16.2 0.938 17.189 2.412 18.295 2.707 C 19.439 3.012 21.033 2.241 22.034 2.82 C 23.051 3.408 23.173 5.177 23.998 6.002 C 24.823 6.827 26.592 6.949 27.18 7.966 C 27.759 8.967 26.988 10.561 27.293 11.705 C 27.588 12.811 29.063 13.8 29.063 15 Z" fill="#2d9639"/>
                      <path d="M 19.064 10.809 L 13.71 16.162 L 10.935 13.39 C 10.333 12.787 9.356 12.787 8.754 13.39 C 8.151 13.992 8.151 14.969 8.754 15.572 L 12.646 19.465 C 13.232 20.051 14.184 20.051 14.77 19.465 L 21.243 12.991 C 21.846 12.389 21.846 11.412 21.243 10.809 C 20.641 10.207 19.666 10.207 19.064 10.809 Z" fill="#e6f7e8"/>
                    </svg>
                    {/* Changed to Deep Green */}
                    <p className="text-[16px] text-black font-medium leading-[160%] tracking-[-0.04em]">{text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    );
}