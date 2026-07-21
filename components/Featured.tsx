"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import Link from "next/link";

export default function Featured() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const getFeaturedProducts = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get("/products?featured=true&limit=8");
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    <section className="flex flex-col gap-10 bg-cyan-50 py-24">
      <div className="mx-auto max-w-7xl px-6 gap-10 flex flex-col">
        <div className="flex flex-col items-center text-center">
        <span className="text-yellow-600 font-semibold uppercase tracking-widest">
          Featured
        </span>

        <h2 className="mt-2 text-4xl font-bold text-gray-900">
          Featured Products
        </h2>

        <p className="mt-4 text-gray-600 md:w-1/2">
          Discover our handpicked collection of premium products selected for
          their quality, style, and exceptional value.
        </p>
      </div>

      {/* Products */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="h-64 w-full bg-gray-200" />

              <div className="p-5">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="mt-4 h-6 w-3/4 rounded bg-gray-200" />
                <div className="mt-3 h-4 w-full rounded bg-gray-200" />
                <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
                <div className="mt-6 h-8 w-28 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      {/* View All Featured Products */} <div className="flex justify-center"> <Link href="/products?featured=true" className="rounded-xl bg-slate-900 px-8 py-3 font-semibold text-white transition hover:bg-yellow-600" > View All Featured Products </Link> </div> 
      </div>
    </section>
  );
}