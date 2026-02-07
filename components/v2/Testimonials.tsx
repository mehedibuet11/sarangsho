import Image from "next/image";

const users = [
  { name: "Sarah Smith", role: "Student" },
  { name: "Sarah Smith", role: "Influencer" },
  { name: "Sarah Smith", role: "Business man" },
  { name: "Sarah Smith", role: "Entrepreneur" },
  { name: "Sarah Smith", role: "Pir Shaheb" },
  { name: "Sarah Smith", role: "BCS Cadre" },
];

function TestiCard({ name, role, i }: { name: string; role: string; i: number }) {
  return (
    <div className="rounded-xl2 bg-white p-6 shadow-soft ring-1 ring-black/5">
      <div className="flex items-center gap-3">
        <Image
          src={`/people/user-${(i % 5) + 1}.png`}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-extrabold text-gray-900">{name}</div>
          <div className="text-xs font-medium text-gray-600">{role}</div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">
        Whether your site is packed with loads of media or a wide range of products,
        <br />
        Whether your site is packed with loads of media or a wide range of products,
      </p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full bg-brand-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-center text-sm font-semibold text-gray-600">TESTIMONIALS</p>
        <h2 className="mt-2 text-center text-4xl font-extrabold text-gray-900">
          What Our Users Share <br /> About Us!
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {users.map((u, idx) => (
            <TestiCard key={idx} name={u.name} role={u.role} i={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
