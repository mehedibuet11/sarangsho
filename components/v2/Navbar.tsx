import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

const nav = ["Features", "Resources", "How It works", "Blog"];

export default function Navbar() {
  return (
    <header className="w-full h-[66px]">
      <div className=" container h-full">
        <div className="flex bg-white rounded-[32px] shadow-md px-6 items-center justify-between h-full  ">
          <div className="flex items-center gap-3">
            <Image
              src="/v2/logo.png"
              alt="Sarangsho"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex justify-center items-center gap-2">
            <button className="flex justify-center items-center gap-2 border rounded-full   h-[42px] px-4">
              Request a feature <ArrowRight />
            </button>

               <button className="flex justify-center items-center gap-2 border rounded-full  h-[42px] px-4">
              <Play /> Download App 
            </button>
          </div>

     
        </div>
      </div>
    </header>
  );
}
