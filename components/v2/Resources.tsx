import Image from "next/image";

const sources = Array.from({ length: 18 }).map((_, i) => ({
  src: `/resources/source-${i + 1}.png`,
  alt: `Source ${i + 1}`,
}));

export default function Resources() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <p className="text-center text-sm font-semibold text-gray-600">RESOURCES</p>
        <h2 className="mt-2 text-center text-4xl font-extrabold text-gray-900">
          Resources We Collect The <br /> News From
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {sources.map((s) => (
            <div
              key={s.src}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-soft ring-1 ring-black/5"
            >
              <Image src={s.src} alt={s.alt} width={28} height={28} className="h-7 w-7" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
