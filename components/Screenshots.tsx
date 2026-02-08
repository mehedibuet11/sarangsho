"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Screenshot type definition
interface Screenshot {
  _id: string;
  title: string;
  description: string;
  image_url: string;
}

export default function AppScreenshots() {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const autoplay = Autoplay(
    {
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    },
    (emblaRoot) => emblaRoot.parentElement,
  );

  const options: EmblaOptionsType = {
    loop: true,
    align: "center",
    skipSnaps: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/screenshots");
        const data = await res.json();
        setScreenshots(data.screenshots || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setScreenshots([]);
      } finally {
        setLoading(false);
      }
    };
    fetchScreenshots();
  }, []);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [screenshots, emblaApi]);

  if (loading) return <p className="text-center py-10"></p>;
  if (!screenshots.length) return <p className="text-center py-10"></p>;

  return (
    <section
      id="screenshots"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            App Screenshots
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A closer look at our application's user interface and experience.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot._id}
                className="flex-shrink-0 px-2 sm:px-4 w-full sm:w-auto"
              >
                <div
                  className={`
    relative mx-auto transition-transform duration-500 ease-in-out
    ${index === currentIndex ? "scale-100 opacity-100" : "scale-90 opacity-60"}
    w-10/12 aspect-[9/16] sm:w-56
  `}
                >
                  <div className="relative w-full h-full bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden border-4 border-gray-800">
                    <Image
                      src={screenshot.image_url}
                      alt={screenshot.title}
                      fill
                      className="object-cover"
                      priority={Math.abs(index - currentIndex) < 2}
                    />
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <h3 className="font-bold text-xl text-white truncate">
                        {screenshot.title}
                      </h3>
                      <p className="text-white text-sm truncate">
                        {screenshot.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/60 rounded-full shadow-lg hover:bg-white backdrop-blur-sm transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/60 rounded-full shadow-lg hover:bg-white backdrop-blur-sm transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
