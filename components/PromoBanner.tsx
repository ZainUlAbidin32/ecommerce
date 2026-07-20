import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-slate-950 via-black to-slate-900 py-20">
      <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-yellow-600/10 blur-3xl" />
      <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 text-center lg:flex-row lg:text-left">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/40 bg-yellow-600/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-500">
            Limited Time Offer
          </p>

          <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Save Up To{" "}
            <span className="text-yellow-500">50% OFF</span>
            <br />
            On Selected Sports Gear
          </h2>

          <p className="mt-6 max-w-xl text-lg text-gray-300">
            Upgrade your game with premium products at unbeatable prices.
            Explore our latest collection before the sale ends.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/products"
            className="rounded-full bg-yellow-600 px-8 py-4 font-semibold text-white transition hover:bg-yellow-500"
          >
            Shop Now
          </Link>

          <Link
            href="/products?featured=true"
            className="rounded-full border border-gray-600 px-8 py-4 font-semibold text-white transition hover:border-yellow-500 hover:text-yellow-500"
          >
            Explore Deals
          </Link>
        </div>
      </div>
    </section>
  );
}