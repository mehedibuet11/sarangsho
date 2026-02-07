import Image from "next/image";

export default function WhyChoose() {
  return (
    <section className="w-full bg-red-600">
      <div className="mx-auto container py-14">
        <div className="w-full">
          <div className="text-white">
            <p className="text-sm font-semibold opacity-95">Why Choose Saransho?</p>
            <h2 className="mt-2 text-4xl font-extrabold leading-tight">
              Experience news like <br className="hidden md:block" /> never before
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed opacity-95">
              Sarangsho brings you short, easy-to-read news from trusted sources, designed for modern readers who value speed and simplicity.
              Whether you’re a student, professional, or curious mind, Sarangsho keeps you updated without wasting time.
            </p>

            <div className="mt-7 rounded-xl2 bg-white/10 p-5 ring-1 ring-white/20">
              <div className="flex items-center gap-3 w-full">
              
                <div>
                  <div className="text-sm font-bold">Mahmudul Hasan Hohag</div>
                  <div className="text-xs opacity-90">Founder Of OnnoRokom Group</div>
                   <p className="mt-4 text-sm leading-relaxed opacity-95">
                “I would have use this app of it’s turn into a paid version. Great for preliminary. It would be great if theres also an editorial section.
                Take subscription but do it kindly”
              </p>
                </div>
                
                <div className="">
                    <Image
                  src="/v2/banner.png"
                  alt="Founder"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-white/30"
                />
                </div>
              </div>

             
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-soft hover:bg-gray-50"
              >
                Download App
              </a>
              <a
                href="#"
                className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/25 hover:bg-white/15"
              >
                Request a feature
              </a>
            </div>
          </div>

          {/* Right side spacing like PDF */}
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}
