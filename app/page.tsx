// import { Navbar } from "@/components/navbar";
// import { HeroSection } from "@/components/hero-section";
// import { FeaturesSection } from "@/components/features-section";
// import { BlogSection } from "@/components/blog-section";
// import { Footer } from "@/components/footer";
// import Screenshots from "@/components/Screenshots";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <HeroSection />
//       <FeaturesSection />
//       <Screenshots />
//       <BlogSection />
//       <Footer />
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your launch date here
  const launchDate = new Date("2025-10-14T00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-bold mb-4 text-purple-700">Coming Soon</h1>
      <p className="text-lg text-gray-700 mb-8">
        We are working hard to launch something amazing. Stay tuned!
      </p>

      <div className="flex gap-4 text-center">
        <div>
          <span className="block text-4xl font-semibold text-blue-600">
            {timeLeft.days}
          </span>
          <span className="text-gray-600">Days</span>
        </div>
        <div>
          <span className="block text-4xl font-semibold text-blue-600">
            {timeLeft.hours}
          </span>
          <span className="text-gray-600">Hours</span>
        </div>
        <div>
          <span className="block text-4xl font-semibold text-blue-600">
            {timeLeft.minutes}
          </span>
          <span className="text-gray-600">Minutes</span>
        </div>
        <div>
          <span className="block text-4xl font-semibold text-blue-600">
            {timeLeft.seconds}
          </span>
          <span className="text-gray-600">Seconds</span>
        </div>
      </div>
    </div>
  );
}
