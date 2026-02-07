import Image from "next/image";

export default function About() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold text-gray-600">ABOUT US</p>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900">Built to Simplify News</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Sarangsho was created with one goal to make news easier to consume in a fast-moving world.
              We turn long articles into clear, 60-word summaries so you can stay informed without wasting time.
              Our platform is built for speed, simplicity, and accuracy, helping you focus on what truly matters.
              With effortless swiping and smart curation, staying updated has never been this easy.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#"
                className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
              >
                Download App
              </a>
              <a
                href="#"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 ring-1 ring-black/10 hover:bg-gray-50"
              >
                Request a feature
              </a>
            </div>
          </div>

          {/* collage */}
          <div className="grid grid-cols-2 gap-4">
            {["/v2/banner.png", "/v2/banner.png", "/v2/banner.png", "/v2/banner.png"].map(
              (src) => (
                <div key={src} className="overflow-hidden rounded-xl2 shadow-soft ring-1 ring-black/5">
                  <Image src={src} alt="Team" width={520} height={520} className="h-44 w-full object-cover md:h-48" />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
