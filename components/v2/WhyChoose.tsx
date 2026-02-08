import { Loader } from "lucide-react";
import Image from "next/image";

export default function WhyChoose() {
  return (

<section className="bg-red-600 py-10 md:py-20 overflow-hidden">
  <div className="container mx-auto relative px-6">

    {/* TOP CONTENT */}
    <div className="flex flex-col md:flex-row items-start justify-betweenA between">

      {/* LEFT TEXT */}
      <div className="md:w-1/2 text-white z-10">
        <div className="flex items-center gap-2 text-base font-semibold opacity-90 mb-4">
          <Loader className="animate-spin w-4 h-4" />
          WHY CHOOSE SARANSHO?
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Experience news like <br /> never before
        </h1>

        <p className="text-gray-100 text-lg opacity-90 max-w-xl">
          Sarangsho brings you short, easy-to-read news from trusted sources,
          designed for modern readers who value speed and simplicity. Whether
          you're a student, professional, or curious mind, Sarangsho keeps you
          updated without wasting time.
        </p>
      </div>

      {/* RIGHT PHONE */}
      <div className="w-full md:w-1/2 relative flex justify-center mt-12 md:mt-0">
        <div className="relative z-20">
              <div className="w-[280px] h-[510px]">
                {/*  bg-black rounded-[40px] shadow-2xl p-2 */}
            {/* <div className="w-full h-full bg-gray-200 rounded-[32px] overflow-hidden">
           
              <div className="h-full flex items-center justify-center text-gray-500">
                <Image src="/v2/iphone.png" alt="Phone Mockup" width={240} height={510} className="h-full w-auto" />
              </div>
            </div>
        
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full"></div> */}
                     <div className="h-full w-full flex items-center justify-center text-gray-500">
                <Image src="/v2/iphone.png" alt="Phone Mockup" width={280} height={510} className="h-[510px] w-[280px]" />
                </div>
          </div>
        </div>
      </div>
    </div>

    {/* TESTIMONIAL*/}
    <div className="relative mt-4 md:mt-[-140px] z-10 w-full">
      <div className="bg-white rounded-2xl shadow-xl px-4 md:px-8 py-6 ">
        <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 bg-gray-700 rounded-full">
                <Image src="/v2/man.png" alt="User Avatar" width={40} height={40} className="h-full w-full rounded-full" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">
              Mahmudul Hasan Hohag
            </p>
            <p className="text-xs text-gray-500">
              Founder of OnnoRokom Group
            </p>
              </div>
                   <span className="absolute right-6 top-4 text-red-500 text-6xl  font-serif">
          ”
        </span>
        </div>

        <p className="text-gray-900 leading-relaxed max-w-xl">
          “I would have use this app if it's turn into a paid version. Great for
          preliminary. It would be great if there's also an editorial section.
          Take subscription but do it kindly.”
        </p>

   
      </div>
    </div>

  </div>
</section>

  );
}
