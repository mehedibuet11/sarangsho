import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image src="/v2/logo.png" alt="Sarangsho" width={140} height={136} className="h-18 w-auto invert" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Stay informed in seconds with Sarangsho — smart short-news from trusted sources.
            </p>
            <div className="mt-4 flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-400 ring-1 ring-orange-300 flex justify-center items-center" >
                    <Linkedin className="h-5 w-5 text-white" />
                  </div>
                   <div className="h-10 w-10 rounded-full bg-white/10 flex justify-center items-center" >
                    <Facebook className="h-5 w-5 text-white" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white/10 flex justify-center items-center" >
                    <Twitter className="h-5 w-5 text-white" />
                  </div>
                     <div className="h-10 w-10 rounded-full bg-white/10 flex justify-center items-center" >
                    <Instagram className="h-5 w-5 text-white" />
                  </div>
                </div>
          </div>

          <div>
            <div className="text-sm font-extrabold">Quick Links</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Features</li>
              <li>Screenshot</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-extrabold">Company</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>About us</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Sarangsho. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Terms and Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
