"use client";

import Link from "next/link";
import { FiSearch, FiHeart, FiMenu, FiX } from "react-icons/fi";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl md:hidden"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight md:text-3xl"
          >
            <span className="text-white">BUY</span>
            <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              SPHERE
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-semibold">
            <Link href="/" className="hover:text-yellow-500 transition">
              HOME
            </Link>
            <Link href="/products" className="hover:text-yellow-500 transition">
              PRODUCTS
            </Link>
            <Link
              href="/categories"
              className="hover:text-yellow-500 transition"
            >
              CATEGORIES
            </Link>
            <Link href="/about" className="hover:text-yellow-500 transition">
              ABOUT
            </Link>
            <Link href="/contact" className="hover:text-yellow-500 transition">
              CONTACT
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Desktop Search */}
            <div className="hidden lg:flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 border border-gray-700">
              <FiSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-48 bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Wishlist - Desktop Only */}
            <Link
              href="/wishlist"
              className="hidden md:flex text-xl hover:text-yellow-500 transition"
            >
              <FiHeart />
            </Link>

            {/* Profile - Desktop Only */}
            {/* Profile Dropdown */}
            <div className="relative hidden md:block group">
              <button className="flex items-center text-xl transition hover:text-yellow-500">
                <FaUser />
              </button>

              <div
                className="
      invisible absolute right-0 mt-4 w-56
      rounded-xl bg-white py-2 text-gray-800
      shadow-2xl opacity-0
      transition-all duration-200
      group-hover:visible
      group-hover:opacity-100
    "
              >
                <Link
                  href="/profile"
                  className="block px-5 py-3 hover:bg-gray-100"
                >
                  My Account
                </Link>

                <Link
                  href="/orders"
                  className="block px-5 py-3 hover:bg-gray-100"
                >
                  Orders
                </Link>

                {/* Show only for Admin */}

                {/* {user?.role === "admin" && ( */}
                <Link
                  href="/admin"
                  className="block px-5 py-3 text-yellow-600 hover:bg-yellow-50"
                >
                  Admin Dashboard
                </Link>
                {/* )} */}

                <hr className="my-2" />

                <button className="w-full px-5 py-3 text-left text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </div>
            </div>

            {/* Cart - Always Visible */}
            <Link
              href="/cart"
              className="relative text-xl hover:text-yellow-500 transition"
            >
              <FaCartShopping />

              {/* Cart Badge */}
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 md:hidden">
          <div className="flex items-center gap-3 rounded-full bg-gray-800 px-4 py-3 border border-gray-700">
            <FiSearch className="text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 top-full z-50 w-full bg-gray-900/95 backdrop-blur-md md:hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-5 text-lg font-semibold">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              HOME
            </Link>

            <Link href="/products" onClick={() => setMenuOpen(false)}>
              PRODUCTS
            </Link>

            <Link href="/categories" onClick={() => setMenuOpen(false)}>
              CATEGORIES
            </Link>

            <Link href="/about" onClick={() => setMenuOpen(false)}>
              ABOUT
            </Link>

            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              CONTACT
            </Link>

            <hr className="border-gray-700" />

            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <FiHeart />
              Wishlist
            </Link>

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <FaUser />
              My Account
            </Link>

            <Link
              href="/orders"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3"
            >
              📦 Orders
            </Link>

            {/* Show only for Admin */}

            {/* {user?.role === "admin" && ( */}
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-yellow-500"
            >
              🛠 Admin Dashboard
            </Link>
            {/* )} */}

            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-left text-red-400"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
