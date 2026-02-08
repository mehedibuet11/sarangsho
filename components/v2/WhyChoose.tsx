import { Loader } from "lucide-react";

export default function WhyChoose() {
  return (
    // <section classNameName="w-full bg-red-600">
    //   <div classNameName="mx-auto container pt-24 pb-16">
    //     <div classNameName="w-full flex flex-col md:flex-row items-start gap-2">
    //       <div classNameName="text-white w-full">
    //         <div classNameName="flex gap-2 text-lg font-semibold uppercase items-center opacity-95">
    //           <Loader classNameName="h-5 w-5 animate-spin" />
    //           <p classNameName="">Why Choose Saransho?</p>
    //         </div>
    //         <h2 classNameName="mt-2 text-4xl font-extrabold leading-tight">
    //           Experience news like <br classNameName="hidden md:block" /> never before
    //         </h2>
    //         <p classNameName="mt-4  text-base leading-relaxed opacity-95">
    //           Sarangsho brings you short, easy-to-read news from trusted sources, designed for modern readers who value speed and simplicity.
    //           Whether you’re a student, professional, or curious mind, Sarangsho keeps you updated without wasting time.
    //         </p>

         

            
    //       </div>

    //       {/* Right side spacing like PDF */}
    //       <div classNameName="hidden md:block w-full " />
    //       <div classNameName="">
    //                 <Image
    //               src="/v2/iphone.png"
    //               alt="Founder"
    //               width={44}
    //               height={44}
    //               classNameName="w-full h-full "
    //             />
    //             </div>
    //     </div>
    //        <div classNameName="mt-7 rounded-xl2 bg-white/10 p-5 ring-1 ring-white/20">
    //           <div classNameName="flex items-center gap-3 w-full">
              
    //             <div>
    //               <div classNameName="text-sm font-bold">Mahmudul Hasan Hohag</div>
    //               <div classNameName="text-xs opacity-90">Founder Of OnnoRokom Group</div>
    //                <p classNameName="mt-4 text-sm leading-relaxed opacity-95">
    //             “I would have use this app of it’s turn into a paid version. Great for preliminary. It would be great if theres also an editorial section.
    //             Take subscription but do it kindly”
    //           </p>
    //             </div>
                
                
    //           </div>

             
    //         </div>
    //   </div>
     
    // </section>
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
          <div className="w-[240px] h-[510px] bg-black rounded-[40px] shadow-2xl p-2">
            <div className="w-full h-full bg-gray-200 rounded-[32px] overflow-hidden">
              {/* Replace this with image */}
              <div className="h-full flex items-center justify-center text-gray-500">
                App UI Screenshot
              </div>
            </div>
            {/* notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    {/* TESTIMONIAL*/}
    <div className="relative mt-4 md:mt-[-140px] z-10 w-full">
      <div className="bg-white rounded-2xl shadow-xl px-4 md:px-8 py-6 ">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
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
