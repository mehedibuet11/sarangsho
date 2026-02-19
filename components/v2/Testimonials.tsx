"use client";

import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const testimonials = [
  {
    name: "Sarah Smith",
    role: "Student",
    text:
      "Whether your site is packed with loads of media or a wide range of products, media or a wide range of products.",
    image: "/v2/review/f1.png",
  },
  {
    name: "Sarah Smith",
    role: "Business man",
    text:
      "Whether your site is packed with loads of media or a wide range of products, Whether your site is packed with loads of media or a wide range of products, media or a wide range of products,",
    featured: true,
    image: "/v2/review/f2.png",
  },
  {
    name: "Sarah Smith",
    role: "Pir Shaheb",
    image: "/v2/review/f3.png",
    text: "Whether your site is packed with loads of media or a wide range of products.",
  },
  {
    name: "Sarah Smith",
    role: "Influencer",
    image: "/v2/review/f2.png",
    text:
      "Whether your site is packed with loads of media or a wide range of products, media or a wide range of products.",
  },
  {
    name: "Sarah Smith",
    image: "/v2/review/f1.png",
    role: "Entrepreneur",
    text:
      "Whether your site is packed with loads of media or a wide range of products, Whether your site is packed with loads of media or a wide range of products, media or a wide range of products,",
  },
  {
    name: "Sarah Smith",
    role: "BCS Cadre",
    image: "/v2/review/f2.png",
    text: "Whether your site is packed with loads of media or a wide range of products.",
  },
];

export default function Testimonials() {
  const leftColumn = testimonials.filter((_, i) => i % 3 === 0);
  const centerColumn = testimonials.filter((_, i) => i % 3 === 1);
  const rightColumn = testimonials.filter((_, i) => i % 3 === 2);

  // ✅ slider for mobile (and you can also use it for desktop if you want)
  const slides = useMemo(() => testimonials, []);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  const go = (i: number) => setActive(i);
  const next = () => setActive((p) => (p + 1) % slides.length);
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-red-400 mb-4">
          <Loader className="h-5 w-5" />
          <p className="font-semibold text-sm">TESTIMONIALS</p>
        </div>

        <h2 className="text-center text-4xl hidden md:block font-extrabold text-gray-900 mb-14">
          What Our Users Share <br /> About Us!
        </h2>
        <h2 className="text-center md:hidden block text-4xl font-extrabold text-gray-900 mb-14">
          What Our Users Share About Us!
        </h2>

        {/* ✅ DESKTOP: 3 columns (unchanged) */}
        <div className="hidden md:flex justify-center gap-8 mx-auto">
          <div className="flex flex-col gap-4">
            {leftColumn.map((t, i) => (
              <TestimonialCard key={`left-${i}`} {...t} />
            ))}
          </div>
          <div className="flex flex-col gap-8">
            {centerColumn.map((t, i) => (
              <TestimonialCard key={`center-${i}`} {...t} featured />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {rightColumn.map((t, i) => (
              <TestimonialCard key={`right-${i}`} {...t} />
            ))}
          </div>
        </div>

        {/* ✅ MOBILE: CARD SLIDER */}
        <div className="md:hidden">
          <div className="relative mx-auto max-w-[389px] overflow-hidden">
            {/* Track */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {slides.map((t, i) => (
                <div key={i} className="w-full shrink-0">
                  <TestimonialCard {...t} featured />
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="mt-4 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all ${
                    active === i ? "w-6 bg-[#9F3C25]" : "w-2 bg-[#9F3C25]/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  role,
  text,
  image,
  featured,
}: {
  name: string;
  role: string;
  text: string;
  image: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border bg-[#f5f5f4] shadow-sm flex flex-col w-full max-w-[389px] mx-auto ${
        featured ? "p-6" : "p-4"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image src={image} alt={name} width={40} height={40} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
        <Image src="/v2/playblack.png" alt="Play" width={24} height={24} />
      </div>

      <p className="text-sm leading-relaxed text-gray-600">{text}</p>
    </div>
  );
}
