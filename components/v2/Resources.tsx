import { Loader } from "lucide-react";
import Image from "next/image";

// only 5 icons
const icons = Array.from({ length: 5 }).map((_, i) => ({
  src: `/v2/resources/source-${i + 1}.png`,
  alt: `Source ${i + 1}`,
}));

const buildRow = () =>
  Array.from({ length: 14 }).map((_, i) => icons[i % icons.length]);

export default function Resources() {
  return (
    <section id="Resources" className="relative w-full bg-white overflow-hidden">

      {/* HEADER CONTAINER */}
      <div className="mx-auto container py-14">
        <div className="flex items-center justify-center gap-2 text-red-400">
          <Loader className="h-5 w-5 " />
          <p className="font-semibold text-sm">RESOURCES</p>
        </div>

        <h2 className="mt-2 hidden md:block text-center text-4xl font-extrabold text-gray-900">
          Resources We Collect The <br /> News From
        </h2>
        <h2 className="mt-2 block md:hidden text-center text-4xl font-extrabold text-gray-900">
          Resources We Collect The News From
        </h2>
      </div>

      {/* MARQUEE FULL WIDTH */}
      <div className="relative w-full space-y-6 pb-14">

        {/* ROW 1 */}
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-marquee p-1">
            {[...buildRow(), ...buildRow()].map((s, i) => (
              <Icon key={`r1-${i}`} src={s.src} alt={s.alt} />
            ))}
          </div>
        </div>

        {/* ROW 2 */}
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-marquee-reverse p-1">
            {[...buildRow(), ...buildRow()].map((s, i) => (
              <Icon key={`r2-${i}`} src={s.src} alt={s.alt} />
            ))}
          </div>
        </div>
      </div>

      {/* GLOSSY OVERLAYS */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[140px]
                      bg-gradient-to-r from-white via-white/80 to-transparent z-30" />

      <div className="pointer-events-none absolute inset-y-0 right-0 w-[140px]
                      bg-gradient-to-l from-white via-white/80 to-transparent z-30" />
    </section>
  );
}

function Icon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center
                    rounded-xl bg-white shadow-md ring-1 ring-black/5">
      <Image
        src={src}
        alt={alt}
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
      />
    </div>
  );
}
