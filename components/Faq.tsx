"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I book a service?",
    answer: "Booking is easy! Just click the 'Book Now' button anywhere on our site, choose your package, and select a time that works for you. You can also call or text us directly at (619) 821-9836."
  },
  {
    question: "Can you detail my car at my home, office or apartment?",
    answer: "Absolutely. We are a fully mobile detailing service. As long as we have a place to hook up water and electricity, we can detail it right in your driveway or office parking lot."
  },
  {
    question: "How long does the detail usually take?",
    answer: "It depends on the package and the condition of the vehicle. A basic Refresh Detail takes about 1.5 to 2 hours, while a Masterpiece Detail or Ceramic Coating application can take 4 to 6+ hours."
  },
  {
    question: "How long will the detail last?",
    answer: "A standard wax or sealant typically lasts 2 to 4 months depending on how the car is stored. If you opt for our Ceramic Coating, you will get protection that lasts anywhere from 1 to 7 years!"
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-black py-16 lg:py-20 px-6">
      <div id="faq" className="max-w-3xl mx-auto flex flex-col items-center scroll-mt-28 md:scroll-mt-32">
        
        <h2 className="text-[36px] md:text-[42px] font-extrabold tracking-[-0.04em] text-white mb-12 text-center leading-[1.1]">
          Frequently Asked Questions
        </h2>

        <div className="w-full flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-[#212121] rounded-[6px] w-full overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="cursor-pointer w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-[16px] text-white tracking-[-0.04em] leading-[160%]">
                  {faq.question}
                </span>
                <span className="text-[25px] font-light text-white tracking-[-0.04em] ml-4 transition-transform duration-300 transform">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              
              {/* Expandable Answer Section */}
              <div 
                className={`px-6 text-gray-400 text-[15px] leading-relaxed transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-[200px] pb-6 opacity-100" : "max-h-0 pb-0 opacity-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}