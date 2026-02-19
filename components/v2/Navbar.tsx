"use client";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const nav = ["Features", "Resources", "How It works", "Blog"];

export default function Navbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 bg-white md:bg-transparent shadow-sm md:shadow-none md:h-[66px] h-[64px] backdrop-blur-md pt-[12px]">
      <div className="container h-full ">
        <div
          className="flex px-6 items-center justify-between h-full
                     md:rounded-[32px] md:shadow-md bg-white"
        >

       

          {/* CENTER LOGO */}
          <div onClick={() => router.push("/")} className="flex items-center cursor-pointer">
            <Image
              src="/v2/logo.png"
              alt="Sarangsho"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-7">
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* RIGHT ACTION BUTTONS (desktop) */}
          <div className="hidden md:flex justify-center items-center gap-2">
            <button className="flex justify-center items-center gap-2 border rounded-full h-[42px] px-4">
              Request a feature <ArrowRight />
            </button>

            <button className="flex justify-center items-center gap-2 border rounded-full h-[42px] px-4">
              <img src="/v2/playcolor.png" className="w-[24px] h-[24px]" />  Download App
            </button>
          </div>
             {/* LEFT: Hamburger Menu (mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* MOBILE DROPDOWN MENU */}
          {open && (
            <div
              ref={menuRef}
              className="absolute top-[66px] left-0 w-full bg-white shadow-lg rounded-b-2xl py-4 px-6 flex flex-col gap-4 md:hidden z-50"
            >
              {nav.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-gray-700 font-medium text-base hover:text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </a>
              ))}

              <div className="flex flex-col gap-3 mt-2">
                <button className="flex justify-center items-center gap-2 border rounded-full h-[42px] px-4 w-full">
                  Request a feature <ArrowRight />
                </button>
                <button className="flex justify-center items-center gap-2 border rounded-full h-[42px] px-4 w-full">
                  <img src="/v2/playcolor.png" className="w-[24px] h-[24px]" /> Download App
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
