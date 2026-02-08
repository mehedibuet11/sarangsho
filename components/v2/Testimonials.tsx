// import { Loader, Play, User2 } from "lucide-react";

// const testimonials = [
//   {
//     name: "Sarah Smith",
//     role: "Student",
//     text:
//       "Whether your site is packed with loads of media or a wide range of products, media or a wide range of products.",
//   },
//   {
//     name: "Sarah Smith",
//     role: "Business man",
//     text:
//       "Whether your site is packed with loads of media or a wide range of products, media or a wide range of products.",
//     featured: true,
//   },
//   {
//     name: "Sarah Smith",
//     role: "Pir Shaheb",
//     text:
//       "Whether your site is packed with loads of media or a wide range of products.",
//   },
//   {
//     name: "Sarah Smith",
//     role: "Influencer",
//     text:
//       "Whether your site is packed with loads of media or a wide range of products, media or a wide range of products.",
//   },
//   {
//     name: "Sarah Smith",
//     role: "Entrepreneur",
//     text:
//       "Whether your site is packed with loads of media or a wide range of products, media or a wide range of products.",
//   },
//   {
//     name: "Sarah Smith",
//     role: "BCS Cadre",
//     text:
//       "Whether your site is packed with loads of media or a wide range of products.",
//   },
// ];

// export default function Testimonials() {
//   // Split the testimonials into 3 columns
//   // Because vertical staggering is per column, we handle cards column-wise.

//   // Left column: indexes 0, 3, ...
//   // Center column: indexes 1, 4, ...
//   // Right column: indexes 2, 5, ...

//   const leftColumn = testimonials.filter((_, i) => i % 3 === 0);
//   const centerColumn = testimonials.filter((_, i) => i % 3 === 1);
//   const rightColumn = testimonials.filter((_, i) => i % 3 === 2);

//   return (
//     <section className="bg-white py-20">
//       <div className="container mx-auto px-4">
//           <div className="flex items-center justify-center gap-2 text-red-400">
//           <Loader className="h-5 w-5 animate-spin" />
//           <p className="font-semibold text-sm">TESTIMONIALS</p>
//         </div>
//         <h2 className="text-center text-4xl hidden md:block font-extrabold text-gray-900 mb-14">
//           What Our Users Share <br /> About Us!
//         </h2>

//            <h2 className="text-center md:hidden block text-4xl font-extrabold text-gray-900 mb-14">
//           What Our Users Share  About Us!
//         </h2>

//         <div className="flex justify-center gap-8 max-w-7xl mx-auto">
//           {/* Left Column */}
//           <div className="flex flex-col gap-4">
//             {leftColumn.map((t, i) => (
//               <TestimonialCard
//                 key={`left-${i}`}
//                 {...t}
//                 isCenter={false}
//                 // Push each card down by 50px for stagger
//                 style={{ marginTop: 0 }}
//               />
//             ))}
//           </div>

//           {/* Center Column */}
//           <div className="flex flex-col gap-8">
//             {centerColumn.map((t, i) => (
//               <TestimonialCard
//                 key={`center-${i}`}
//                 {...t}
//                 isCenter={true}
//                 style={{ marginTop: 0 }}
//               />
//             ))}
//           </div>

//           {/* Right Column */}
//           <div className="flex flex-col gap-4">
//             {rightColumn.map((t, i) => (
//               <TestimonialCard
//                 key={`right-${i}`}
//                 {...t}
//                 isCenter={false}
//                 // Push each card down by 50px for stagger
//                 style={{ marginTop: 0 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function TestimonialCard({
//   name,
//   role,
//   text,
//   isCenter,
//   style,
// }: {
//   name: string;
//   role: string;
//   text: string;
//   isCenter: boolean;
//   style?: React.CSSProperties;
// }) {
//   return (
//     <div
//       style={{ minHeight: isCenter ? 250 : 160, width: 300, ...style }} // fixed width here
//       className={`relative rounded-2xl border bg-[#f5f5f4] shadow-sm transition-all
//         flex flex-col
//         ${isCenter ? "p-6 scale-105" : "p-4"}
//       `}
//     >
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-3">
//           {/* <Image
//             src="/avatar.png"
//             alt={name}
//             width={36}
//             height={36}
//             className="rounded-full"
//           /> */}
//           <User2 className="h-9 w-9 text-gray-400" />
//           <div>
//             <p className="text-sm font-semibold text-gray-900">{name}</p>
//             <p className="text-xs text-gray-500">{role}</p>
//           </div>
//         </div>
//         <span className="text-gray-400 text-sm"> <Play/> </span>
//       </div>

//       <p className="text-sm leading-relaxed text-gray-600 flex-grow">{text}</p>
//     </div>
//   );
// }
"use client";

import { Loader, Play, User2 } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Smith",
    role: "Student",
    text:
      "Whether your site is packed with loads of media or a wide range of products, media or a wide range of products.",
  },
  {
    name: "Sarah Smith",
    role: "Business man",
    text:
      "Whether your site is packed with loads of media or a wide range of products, media or a wide range of products.",
    featured: true,
  },
  {
    name: "Sarah Smith",
    role: "Pir Shaheb",
    text:
      "Whether your site is packed with loads of media or a wide range of products.",
  },
  {
    name: "Sarah Smith",
    role: "Influencer",
    text:
      "Whether your site is packed with loads of media or a wide range of products, media or a wide range of products.",
  },
  {
    name: "Sarah Smith",
    role: "Entrepreneur",
    text:
      "Whether your site is packed with loads of media or a wide range of products, media or a wide range of products.",
  },
  {
    name: "Sarah Smith",
    role: "BCS Cadre",
    text:
      "Whether your site is packed with loads of media or a wide range of products.",
  },
];

export default function Testimonials() {
  // Split testimonials into columns for desktop
  const leftColumn = testimonials.filter((_, i) => i % 3 === 0);
  const centerColumn = testimonials.filter((_, i) => i % 3 === 1);
  const rightColumn = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-red-400 mb-4">
          <Loader className="h-5 w-5 animate-spin" />
          <p className="font-semibold text-sm">TESTIMONIALS</p>
        </div>

        <h2 className="text-center text-4xl hidden md:block font-extrabold text-gray-900 mb-14">
          What Our Users Share <br /> About Us!
        </h2>
        <h2 className="text-center md:hidden block text-4xl font-extrabold text-gray-900 mb-14">
          What Our Users Share About Us!
        </h2>

        {/* DESKTOP: 3-column layout */}
        <div className="hidden md:flex justify-center gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            {leftColumn.map((t, i) => (
              <TestimonialCard key={`left-${i}`} {...t} isCenter={false} />
            ))}
          </div>
          <div className="flex flex-col gap-8">
            {centerColumn.map((t, i) => (
              <TestimonialCard key={`center-${i}`} {...t} isCenter={true} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {rightColumn.map((t, i) => (
              <TestimonialCard key={`right-${i}`} {...t} isCenter={false} />
            ))}
          </div>
        </div>

        {/* MOBILE: horizontal marquee */}
        <div className="md:hidden relative overflow-hidden">
          <div className="flex animate-marquee gap-4">
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={`mobile-${i}`} {...t} isCenter={true} />
            ))}
          </div>
        </div>
      </div>

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
    </section>
  );
}

function TestimonialCard({
  name,
  role,
  text,
  isCenter,
}: {
  name: string;
  role: string;
  text: string;
  isCenter: boolean;
}) {
  return (
    <div
      style={{ minHeight: isCenter ? 250 : 160, width: 300, minWidth: 300 }}
      className={`relative rounded-2xl border bg-[#f5f5f4] shadow-sm flex flex-col ${
        isCenter ? "p-6 scale-105" : "p-4"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <User2 className="h-9 w-9 text-gray-400" />
          <div>
            <p className="text-sm font-semibold text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
        <span className="text-gray-400 text-sm">
          <Play />
        </span>
      </div>
      <p className="text-sm leading-relaxed text-gray-600 flex-grow">{text}</p>
    </div>
  );
}
