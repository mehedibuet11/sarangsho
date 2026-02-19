"use client";

import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const newsList = ["/v2/news/news2.png", "/v2/news/news3.png", "/v2/news/news1.png"]; // ✅ 3 slides

export default function WhyChoose() {
  const slides = useMemo(() => newsList, []);
  const [active, setActive] = useState(0);

  // ✅ optional autoplay
  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  const go = (i: number) => setActive(i);
  const next = () => setActive((p) => (p + 1) % slides.length);
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section className="bg-[#E5340C] py-10 md:pt-[140px] pb-[80px] overflow-hidden">
      <div className="container mx-auto relative px-6">
        {/* TOP CONTENT */}
        <div className="flex flex-col md:flex-row items-start justify-between">
          {/* LEFT TEXT */}
          <div className="md:w-1/2 text-white z-10">
            <div className="flex items-center gap-2 text-base font-semibold opacity-90 mb-4">
              <Loader className="w-4 h-4" />
              WHY CHOOSE SARANSHO?
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Experience news like <br /> never before
            </h1>

            <p className="text-gray-100 text-xl opacity-90 max-w-xl">
              Sarangsho brings you short, easy-to-read news from trusted sources,
              designed for modern readers who value speed and simplicity. Whether
              you're a student, professional, or curious mind, Sarangsho keeps you
              updated without wasting time.
            </p>
          </div>

         
        {/* RIGHT PHONE */}
<div className="w-full md:w-1/2 relative flex justify-center mt-12 md:mt-0">
  <div className="relative w-[352px] h-[685px] md:h-[708px] ">

    {/* ✅ SLIDER AREA — FULL SIZE OF MOCK */}
    <div className="absolute inset-0 z-30  overflow-hidden rounded-[90px] p-6">

       <div className="absolute top-4 left-1/2  -translate-x-1/2 flex gap-2 px-3 py-1 rounded-full bg-black z-30">
         <div className="w-[100px] h-[16px] bg-black" />
        </div>

      {/* SLIDER VIEW */}
      <div className="w-full h-full overflow-hidden rounded-[55px] relative">

        {/* TRACK */}
        <div
          className="h-full flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((src, i) => (
            <div key={i} className="w-full h-full shrink-0 relative rounded-[55px] overflow-hidden">
              <Image
                src={src}
                alt={`News ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-6 bg-white" : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* ARROWS */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-black/40 text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-black/40 text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </div>

    {/* ✅ MOCK IMAGE OVERLAY (UNCHANGED) */}
    <Image
      src="/v2/news/newswithmock.png"
      alt="Phone Mock Frame"
      fill
      className="pointer-events-none select-none object-contain z-20"
      priority
    />

  </div>
</div>

        </div>

        {/* TESTIMONIAL */}
        <div className="relative mt-4 md:mt-[-220px] z-10 w-full">
          <div className="bg-white rounded-2xl shadow-xl px-4 md:px-8 py-[30px]">
            <div className="flex items-center gap-4 mb-4 relative">
              <div className="h-10 w-10 text-white text-center flex justify-center items-center text-xl rounded-full overflow-hidden bg-[#C25137]">
                A
              </div>

              <div>
                <p className="font-semibold text-sm text-gray-900">Md Akash Billah</p>
              </div>

              <span className="absolute right-6 top-0 text-red-500 text-6xl font-serif">
                ”
              </span>
            </div>

            <p className="text-gray-900 leading-relaxed text-xl max-w-xl">
              This app is genuinely impressive—easy to use, fast, and beautifully designed.
              It makes everyday tasks so much smoother that going without it now feels impossible.
              In short, it saves time, reduces hassle, and is truly user-friendly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
