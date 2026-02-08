import { AlignVerticalJustifyStart, ArrowRight, BadgeCheck, BriefcaseBusiness, Globe, Lightbulb, Loader, Play } from "lucide-react";

type FeatureItem = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
};

const items: FeatureItem[] = [
  {
    title: "Global News Search",
    desc: "Find news from Bangladesh and around the world instantly.",
    icon: (
      <div className="h-14 w-14 flex items-center justify-center rounded-md bg-sky-50">
        <Globe className="h-8 w-8 text-sky-400" />
      </div>
    ),
  },
  {
    title: "Trusted Sources Only",
    desc: "We bring you news from reliable publishers to keep you informed.",
    icon: (
      <div className="h-14 w-14 flex items-center justify-center rounded-md bg-blue-50">
        <BadgeCheck className="h-8 w-8 text-blue-400" />
      </div>
    ),
  },
  {
    title: "Short & Swipeable",
    desc: "Read important updates in just 60–70 words with an easy swipe interface.",
    icon: (
      <div className="h-14 w-14 flex items-center justify-center rounded-md bg-orange-50">
        <AlignVerticalJustifyStart className="h-8 w-8 text-orange-400" />
      </div>
    ),
  },
   
  {
    title: "Job Seeker Friendly",
    desc: "Special general knowledge and current affairs sections to help you stay exam-ready.",
     icon: (
      <div className="h-14 w-14 flex items-center justify-center rounded-md bg-green-50">
        <BriefcaseBusiness className="h-8 w-8 text-green-500" />
      </div>
    ),
  },
  {
    title: "Stay Updated, Effortlessly",
    desc: "Quick access to the latest headlines without wasting time.",
     icon: (
      <div className="h-14 w-14 flex items-center justify-center rounded-md bg-orange-50">
        <Lightbulb  className="h-8 w-8 text-orange-400" />
      </div>
    ),
  },
];

function Card({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-black/5">
      {icon && <div className="mb-12">{icon}</div>}

      <h3 className="text-base font-extrabold text-gray-900">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        {desc}
      </p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="w-full bg-white">
      <div className="container mx-auto py-16 px-4">

        {/* Header */}
        <div className="flex items-center justify-center gap-2 text-red-400">
          <Loader className="h-5 w-5 animate-spin" />
          <p className="font-semibold text-sm">FEATURES</p>
        </div>

        <h2 className="mt-3 hidden md:block text-center text-4xl font-extrabold text-gray-900">
          Why Sarangsho Works <br /> For You
        </h2>
          <h2 className="mt-3 block md:hidden text-center text-4xl font-extrabold text-gray-900">
          Why Sarangsho Works For You
        </h2>

        {/* Top cards */}
        <div className="mt-10 rounded-xl bg-[#fcf5f0] border border-orange-100 p-4">
          <div className="grid gap-3 md:grid-cols-3">
            {items.slice(0, 3).map((x) => (
              <Card
                key={x.title}
                title={x.title}
                desc={x.desc}
                icon={x.icon}
              />
            ))}
          </div>

          {/* Bottom row */}
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {items.slice(3, 5).map((x) => (
              <Card
                key={x.title}
                title={x.title}
                desc={x.desc}
                icon={x.icon}
              />
            ))}

            {/* CTA */}
            <div className="flex items-center justify-center rounded-xl bg-[#f7e8dd] p-6">
                  <div className=" flex flex-col gap-3 w-full">
             

               <button className="flex justify-center items-center gap-2 border rounded-full  h-[42px] px-4 w-full md:w-auto border-red-300  bg-red-500 text-white ">
              <Play /> Download App 
            </button>
              <button className="flex justify-center items-center gap-2 border rounded-full   h-[42px] px-4 w-full border-orange-300">
              Request a feature <ArrowRight />
            </button>
            </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
