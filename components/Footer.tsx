import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold">
              <span className="text-white">BUY</span>
              <span className="text-blue-500">SPHERE</span>
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Discover premium sports gear designed for every athlete.
              Performance, quality, and style—all in one place.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 transition hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 transition hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
              >
                <FaInstagram />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 transition hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
              >
                <FaXTwitter />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 transition hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link className="transition hover:text-yellow-500" href="/">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className="transition hover:text-yellow-500"
                  href="/products"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  className="transition hover:text-yellow-500"
                  href="/categories"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  className="transition hover:text-yellow-500"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Customer Services
            </h3>

            <ul className="mt-6 space-y-4">
              <li className="transition hover:text-yellow-500 cursor-pointer">
                FAQ
              </li>

              <li className="transition hover:text-yellow-500 cursor-pointer">
                Shipping Policy
              </li>

              <li className="transition hover:text-yellow-500 cursor-pointer">
                Returns & Refunds
              </li>

              <li className="transition hover:text-yellow-500 cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <FaLocationDot className="mt-1 text-yellow-500" />
                <p>Pakistan</p>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-yellow-500" />
                <p>+92 300 1234567</p>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-500" />
                <p>support@buysphere.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BUYSPHERE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}