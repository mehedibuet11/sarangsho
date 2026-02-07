import Image from "next/image";

const blogs = [
  { title: "The Rise of Short News in Bangladesh", tag: "Insight", min: "6 mins", img: "/blogs/blog-1.png" },
  { title: "How Sarangsho Simplifies Current Affairs for BCS Aspirants", tag: "Insight", min: "6 mins", img: "/blogs/blog-2.png" },
  { title: "Tips for Staying Updated on Global News Quickly", tag: "Insight", min: "6 mins", img: "/blogs/blog-3.png" },
];

export default function Blogs() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-center text-sm font-semibold text-gray-600">BLOGS</p>
        <h2 className="mt-2 text-center text-4xl font-extrabold text-gray-900">
          Connect With the Tools You <br /> Already Use
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {blogs.map((b) => (
            <article key={b.title} className="overflow-hidden rounded-xl2 bg-white shadow-soft ring-1 ring-black/5">
              <div className="relative h-44 w-full">
                <Image src={b.img} alt={b.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                  <span className="rounded-full bg-brand-50 px-3 py-1 ring-1 ring-brand-100">{b.tag}</span>
                  <span className="text-gray-400">•</span>
                  <span>{b.min}</span>
                </div>
                <h3 className="mt-3 text-base font-extrabold text-gray-900">{b.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
