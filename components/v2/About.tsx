

"use client";

import { ArrowRight, Loader } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const images = [
    "/v2/about/r1.png",
    "/v2/about/r2.png",
    "/v2/about/r3.png",
    "/v2/about/r4.png",
    "/v2/about/r5.png",
    "/v2/about/r6.png",
  ];

  return (
    <main className="h-full bg-[#FFF6F2]">
      <div className="container py-6 md:py-0 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <section>
          <div className="flex items-center justify-start gap-2 text-red-400 mb-4">
            <Loader className="h-5 w-5 animate-spin" />
            <p className="font-semibold text-sm uppercase">About Us</p>
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Built to Simplify News
          </h1>

          <p className="mt-6 text-gray-600 max-w-lg">
            Sarangsha was created with one goal — to make news easier to
            consume in a fast-moving world. We turn long articles into clear,
            60-word summaries so you can stay informed without wasting time.
          </p>

          <div className="md:mt-6 mt-8 flex md:flex-row flex-col gap-3 w-full">
            <button className="flex justify-center items-center gap-2 border rounded-full h-[42px] px-4 w-full md:w-auto border-red-300 bg-red-500 text-white">
              <img src="/v2/playwhite.png" className="w-[24px] h-[24px]" />  Download App 
            </button>
            <button className="flex justify-center items-center gap-2 border rounded-full h-[42px] px-4 w-full md:w-auto border-orange-300">
              Request a feature <ArrowRight />
            </button>
          </div>
        </section>

        {/* RIGHT IMAGE GALLERY */}
        <section className="relative">
          {/* DESKTOP 2-column grid */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {/* TOP STACK */}
            <div className="flex flex-col gap-4">
              {images.slice(0, 3).map((src, i) => (
                <div key={i} className="relative h-56 rounded-2xl overflow-hidden">
                  <Image src={src} alt={`Gallery image ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* BOTTOM STACK */}
            <div className="flex flex-col gap-4 mt-16">
              {images.slice(3).map((src, i) => (
                <div key={i} className="relative h-56 rounded-2xl overflow-hidden">
                  <Image src={src} alt={`Gallery image ${i + 4}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE: horizontal marquee */}
          <div className="md:hidden overflow-hidden relative">
            <div className="flex animate-marquee gap-4">
              {[...images, ...images].map((src, i) => (
                <div key={i} className="flex-shrink-0 w-48 h-56 rounded-2xl overflow-hidden relative">
                  <Image src={src} alt={`Gallery image ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* MARQUEE ANIMATION */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          gap: 1rem;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </main>
  );
}
