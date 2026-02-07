export default function Contact() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-sm font-semibold text-gray-600">CONTACT</p>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900">Get It Touch</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
              We would love to hear you, Send us a message we will respond as soon as possible.
            </p>

            <div className="mt-7 space-y-3 text-sm text-gray-700">
              <div>
                <div className="font-extrabold">Sarangsho</div>
                <div className="text-gray-600">sarangsho@gmail.com</div>
                <div className="text-gray-600">Dhaka Firmgate</div>
              </div>

              <div>
                <div className="font-extrabold">Socials</div>
                <div className="mt-2 flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-50 ring-1 ring-brand-100" />
                  <div className="h-10 w-10 rounded-full bg-brand-50 ring-1 ring-brand-100" />
                  <div className="h-10 w-10 rounded-full bg-brand-50 ring-1 ring-brand-100" />
                </div>
              </div>
            </div>
          </div>

          <form className="rounded-xl2 bg-white p-6 shadow-soft ring-1 ring-black/5">
            <div className="grid gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600">Name</label>
                <input
                  defaultValue="Ehsan Habib Sumon"
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Email</label>
                <input
                  defaultValue="ehsanhabib@gmail.com"
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Phone</label>
                <input
                  defaultValue="+880 ....."
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Message</label>
                <textarea
                  defaultValue="Let us know about you and how can we help?"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
                />
              </div>

              <button
                type="button"
                className="mt-2 w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
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
