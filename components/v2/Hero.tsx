"use client";
import { useSettings } from "@/context/SettingsContext";
import { ArrowRight, Download, Globe, Star } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

function Stat({ value, label, icon }: { value: string; label: string, icon: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {/* <div className="h-9 w-9 rounded-full bg-brand-50 ring-1 ring-brand-100" /> */}
      <div className="flex flex-row gap-2">
         {icon}
        <p className="text-2xl font800 font-extrabold text-gray-900 flex flex-col gap-1">
         
          {value}
        <span className="text-sm font-medium text-gray-600">{label}</span>
        </p>
        
      </div>
    </div>
  );
}

export default function Hero() {
   const settings = useSettings();
  return (
    <section className="w-full">
      <div className="mx-auto container px-4 pt-8 md:pt-[60px] ">
        <div className="grid items-start md:grid-cols-2 ">
          {/* Left */}
          <div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-[#BC3C1F] to-[#FD2F00] bg-clip-text text-transparent">
                  {settings?.siteName || "Sarangsho"}
                </span>
                <span className="font-serif text-2xl  text-gray-700">
                  (Beta)
                </span>
              </h1>

            <h1 className="text-lg mt-4 md:mt-8  leading-relaxed text-gray-900 md:text-xl">
              Stay informed in seconds with Sarangsho, Bangladesh’s smart short-news platform.    We turn complex stories into 60–70 word updates from trusted sources, so you get the facts fast without the noise.
            </h1>

           

            <div className="md:mt-9 mt-8 flex md:flex-row flex-col gap-3 w-full">
             

               <button className="flex justify-center items-center gap-2 border rounded-full  h-[42px] px-4 w-full md:w-auto border-red-300  bg-red-500 text-white ">
              <img src="/v2/playwhite.png" className="w-[24px] h-[24px]" />  Download App 
            </button>
   





              <button className="flex justify-center items-center gap-2 border rounded-full   h-[42px] px-4 w-full md:w-auto border-orange-300">
              Request a feature <ArrowRight />
            </button>
            </div>

            <div className="pt-10 md:pt-36 flex flex-wrap gap-4">
              <Stat icon={<Download className="h-5 w-5 text-gray-900" />} value="32k+" label="Downloads" />
              <Stat icon={<Star className="h-5 w-5 text-gray-900" />} value="4.5" label="Rating" />
              <Stat icon={<Globe className="h-5 w-5 text-gray-900" />} value="2000+" label="News Sources" />
            </div>
          </div>

          {/* Right */}
          <div className="relative md:pt-0 pt-6 max-h-[620px] overflow-hidden">
           <Image
                    src="/v2/banner.png"
                    alt="App Preview"
                    width={520}
                    height={580}
                    className="h-auto w-full"
                    priority
                  />

        
          </div>
        </div>
      </div>
    </section>
  );
}
