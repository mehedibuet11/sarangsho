import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-full bg-brand-50 ring-1 ring-brand-100" />
      <div>
        <div className="text-lg font800 font-extrabold text-gray-900">{value}</div>
        <div className="text-xs font-medium text-gray-600">{label}</div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 py-8 md:grid-cols-2 md:py-14">
          {/* Left */}
          <div>
            <div className="mb-3 gap-2 flex justify-start items-end">
             
              <span className="text-[52px] font-bold text-red-500">Sarangsho </span>
              <span className="text-lg">(Beta)</span>
            </div>

            <h1 className="text-md  leading-tight text-gray-900 md:text-lg">
              Stay informed in seconds with Sarangsho, Bangladesh’s smart short-news platform.    We turn complex stories into 60–70 word updates from trusted sources, so you get the facts fast without the noise.
            </h1>

           

            <div className="mt-6 flex flex-wrap gap-3">
             

               <button className="flex justify-center items-center gap-2 border rounded-full  h-[42px] px-4">
              <Play /> Download App 
            </button>
              <button className="flex justify-center items-center gap-2 border rounded-full   h-[42px] px-4">
              Request a feature <ArrowRight />
            </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-7">
              <Stat value="22k+" label="Downloads" />
              <Stat value="4.6" label="Rating" />
              <Stat value="2000+" label="News Sources" />
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-brand-50" />
              <div className="absolute -bottom-8 -right-6 h-28 w-28 rounded-full bg-brand-50" />

              <div className="relative overflow-hidden rounded-xl2 bg-white shadow-soft ring-1 ring-black/5">
                <div className="p-3">
                  <Image
                    src="/v2/banner.png"
                    alt="App Preview"
                    width={520}
                    height={680}
                    className="h-auto w-full"
                    priority
                  />
                </div>
              </div>
            </div>

        
          </div>
        </div>
      </div>
    </section>
  );
}
