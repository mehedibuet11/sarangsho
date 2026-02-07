const items = [
  { title: "Global News Search", desc: "Find news from Bangladesh and around the world instantly." },
  { title: "Trusted Sources Only", desc: "We bring you news from reliable publishers to keep you informed." },
  { title: "Short & Swipeable", desc: "Read important updates in just 60–70 words with an easy swipe interface." },
  { title: "Job Seeker Friendly", desc: "Special general knowledge and current affairs sections to help you stay exam-ready." },
  { title: "Stay Updated, Effortlessly", desc: "Quick access to the latest headlines without wasting time." },
];

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl2 bg-white p-6 shadow-soft ring-1 ring-black/5">
      <div className="mb-3 h-10 w-10 rounded-full bg-brand-50 ring-1 ring-brand-100" />
      <h3 className="text-base font-extrabold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{desc}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-center text-sm font-semibold text-gray-600">FEATURES</p>
        <h2 className="mt-2 text-center text-4xl font-extrabold text-gray-900">
          Why Sarangsho Works <br /> For You
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.slice(0, 3).map((x) => (
            <Card key={x.title} title={x.title} desc={x.desc} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {items.slice(3, 5).map((x) => (
            <Card key={x.title} title={x.title} desc={x.desc} />
          ))}

          {/* CTA pill like PDF */}
          <div className="flex items-center justify-center rounded-xl2 bg-brand-50 p-6 ring-1 ring-brand-100">
            <a
              href="#"
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
            >
              Request a feature
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
