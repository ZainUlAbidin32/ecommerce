"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPageContent() {
  const [checkingAuth, setCheckingAuth] = useState(true);

  const {
    wishlist,
    loading,
    removeFromWishlist,
  } = useWishlist();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.replace("/login");
      return;
    }

    setCheckingAuth(false);
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
      toast.success("Product removed from wishlist");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove product from wishlist",
      );
    }
  };

  if (checkingAuth) {
    return null;
  }

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-cyan-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-10 w-48 rounded bg-gray-200" />

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-96 rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!wishlist || wishlist.items.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-cyan-50 px-6">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <FiHeart size={35} className="text-pink-500" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Your Wishlist is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            Looks like you haven&apos;t added any products to your wishlist yet.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-pink-500"
          >
            <FiShoppingBag />
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-cyan-50 px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center md:text-left">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-500">
            Your Favorites
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            My Wishlist
          </h1>

          <p className="mt-3 text-gray-500">
            Save your favorite products and come back to them anytime.
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.items.map((item) => (
            <div
              key={item.product._id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Product Image */}
              <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Wishlist Button */}
                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-pink-500 shadow-sm transition hover:bg-pink-500 hover:text-white"
                  aria-label="Remove from wishlist"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {item.product.brand}
                    </p>

                    <Link
                      href={`/products/${item.product._id}`}
                      className="mt-1 block text-lg font-semibold text-gray-900 transition hover:text-pink-500"
                    >
                      {item.product.name}
                    </Link>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-bold text-pink-500">
                    ${item.product.price.toFixed(2)}
                  </p>

                  <span
                    className={`text-sm font-medium ${
                      item.product.stock > 0
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.product.stock > 0
                      ? `${item.product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                {/* View Product */}
                <Link
                  href={`/products/${item.product._id}`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-pink-500"
                >
                  <FiShoppingBag size={18} />
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-500 transition hover:text-pink-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}