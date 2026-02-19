import { Facebook, Instagram, Linkedin, Loader, Twitter } from "lucide-react";

export default function Contact() {
  return (
    <section id="How It works" className="w-full bg-white">
      <div className="mx-auto container py-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
             <div className="flex items-center justify-start gap-2 text-red-400 mb-4">
          <Loader className="h-5 w-5 " />
          <p className="font-semibold text-sm">CONTACT</p>
        </div>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900">Get It Touch</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
              We would love to hear you, Send us a message we will respond as soon as possible.
            </p>

            <div className="mt-6 md:mt-12 space-y-3 text-sm text-gray-700">
              <div>
                <div className="font-extrabold">Sarangsho</div>
                <div className="text-gray-600">sarangsho@gmail.com</div>
                <div className="text-gray-600">Dhaka Firmgate</div>
              </div>

              <div className="pt-6 md:pt-12">
                <div className="font-extrabold">Socials</div>
                <div className="mt-4 flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-400 ring-1 ring-orange-300 flex justify-center items-center" >
                    <Linkedin className="h-5 w-5 text-white" />
                  </div>
                   <div className="h-10 w-10 rounded-full bg-white flex justify-center items-center" >
                    <Facebook className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white flex justify-center items-center" >
                    <Twitter className="h-5 w-5 text-gray-600" />
                  </div>
                     <div className="h-10 w-10 rounded-full bg-white flex justify-center items-center" >
                    <Instagram className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="rounded-xl bg-white p-6 ">
            <div className="grid gap-2">
              <div>
                <label className="text-xs font-semibold text-gray-600">Name</label>
                <input
                  placeholder="Ehsan Habib Sumon"
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Email</label>
                <input
                  placeholder="ehsanhabib@gmail.com"
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Phone</label>
                <input
                  placeholder="+880 ....."
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Message</label>
                <textarea
                  placeholder="Let us know about you and how can we help?"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
                />
              </div>

              <button
                type="button"
                className="mt-2 w-full rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
              >
                Submit Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
