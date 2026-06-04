import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Image from "next/image"

export default function About() {

    return (
    <>
      <Navbar />
      
      <section className="w-full bg-white py-24 px-6 flex items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16 mt-[5vh] md:mt-[15vh]">
          
          {/* Left Column: Text */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 text-gray-800">
            <h2 className="text-3xl md:text-[32px] font-bold leading-[1.2] text-black">
              Make Your Car Look Brand New!
            </h2>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              Established in <strong className="text-black">San Diego, CA in 2024</strong>. 
              Habibi Details doesn’t just wash cars, we <strong className="text-black">restore, protect, and maintain</strong> them. 
              Our fully equipped, professional detailers come <strong className="text-black">right to your home or office</strong>.
            </p>
            
            <ul className="flex flex-col gap-3 text-gray-600 text-[16px]">
              <li className="flex items-start gap-3">
                <span role="img" aria-label="check" className="text-lg">✅</span> 
                <span>Hand-picked &amp; background-checked technicians</span>
              </li>
              <li className="flex items-start gap-3">
                <span role="img" aria-label="check" className="text-lg">✅</span> 
                <span>Interior &amp; exterior detailing, paint polish, ceramic coatings</span>
              </li>
              <li className="flex items-start gap-3">
                <span role="img" aria-label="check" className="text-lg">✅</span> 
                <span>Upfront pricing and a satisfaction guarantee</span>
              </li>
            </ul>
            
            <div className="text-gray-600 mt-2">
              <p>Have questions or want a recommendation? Call/text</p>
              <a 
                href="tel:16198219839" 
                className="text-black font-bold text-lg hover:text-blue-600 transition-colors"
              >
                (619) 821-9839
              </a> 
              <span> — we’re happy to help.</span>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            {/* The wrapper forces the image to a max-width and maintains a nice aspect ratio */}
            <div className="relative w-full max-w-[420px] aspect-[4/5]">
              <Image 
                src="/images/car6.jpg" 
                alt="Luxury Auto Detailing mobile service in San Diego" 
                fill
                className="object-cover rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              />
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
    )
}