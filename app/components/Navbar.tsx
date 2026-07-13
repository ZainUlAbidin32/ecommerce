import Image from "next/image";
import navbarLogo from "../../public/images/logo.png";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="flex justify-between gap-8 items-center max-w-7xl px-4">
        <Image height={50} src={navbarLogo} alt="BuySphere" />

        <div className="hidden md:flex items-center gap-6 font-bold">
          <Link href="/">HOME</Link>
          <Link href="/products">PRODUCTS</Link>
          <Link href="/categories">CATEGORIES</Link>
          <Link href="/about">ABOUT</Link>
          <Link href="/contact">CONTACT</Link>
        </div>
        <div className="hidden lg:block">
          <input
            type="text"
            placeholder="Search products..."
            className="rounded-full border border-gray-300 px-4 py-2 outline-none focus:border-amber-600"
          />
        </div>
        <div className="flex items-center gap-6">
          <Link href="/cart"><FaUser size={20}/></Link>
          <Link href="/login"><FaCartShopping size={20}/></Link>
        </div>
      </div>
    </nav>
  );
}
