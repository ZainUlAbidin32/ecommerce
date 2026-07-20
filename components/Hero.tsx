import Image from "next/image";
import heroImage from "../public/images/Hero3.jpg";
import Link from "next/link";

import { FaShippingFast, FaStar } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { MdVerifiedUser } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Hero Image"
          fill
          priority
          className="object-cover object-[75%] lg:object-center"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-black/85 via-black/45 to-black/85" />
      <div className="relative z-10 mx-auto grid min-h-[95vh] max-w-7xl items-center px-6 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-4 py-20 text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-gray-500 px-4 py-2 text-sm font-semibold text-yellow-500">
            <FaStar />
            NEW COLLECTION 2026
          </p>
          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
            GEAR UP.
            <br />
            <span className="text-yellow-500">PLAY GREAT.</span>
          </h1>
          <p className="max-w-xl text-lg text-gray-300">
            Discover premium jerseys, shoes, clothing and accessories from the
            world&apos;s leading sports brands.
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="flex min-w-55 items-center justify-center gap-3 bg-yellow-600 px-8 py-4 font-semibold text-black transition hover:bg-yellow-500"
            >
              SHOP NOW
              <HiArrowRight />
            </Link>
            <Link
              href="/categories"
              className="flex min-w-55 items-center justify-center border-2 border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              BROWSE CATEGORIES
            </Link>
          </div>
          <div className="mt-12 hidden w-full gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-4">
            <div className="flex items-center gap-3 bg-black/50 p-3 backdrop-blur-sm">
              <FaShippingFast size={28} className="text-yellow-500" />
              <div>
                <p className="text-sm font-semibold text-white">
                  FREE SHIPPING
                </p>
                <span className="text-xs text-gray-400">Orders over $99</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-black/50 p-3 backdrop-blur-sm">
              <MdVerifiedUser size={28} className="text-yellow-500" />
              <div>
                <p className="text-sm font-semibold text-white">
                  100% ORIGINAL
                </p>
                <span className="text-xs text-gray-400">
                  Authentic Products
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-black/50 p-3 backdrop-blur-sm">
              <TbArrowsExchange size={28} className="text-yellow-500" />
              <div>
                <p className="text-sm font-semibold text-white">EASY RETURNS</p>
                <span className="text-xs text-gray-400">30-Day Returns</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-black/50 p-3 backdrop-blur-sm">
              <BiSupport size={28} className="text-yellow-500" />
              <div>
                <p className="text-sm font-semibold text-white">24/7 SUPPORT</p>
                <span className="text-xs text-gray-400">
                  We&apos;re here to help
                </span>
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>
    </section>
  );
}
