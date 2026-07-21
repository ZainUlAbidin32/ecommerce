"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import CategoryCard from "@/components/CategoryCard";

interface Category {
  _id: string;
  name: string;
  productCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <main>
      {/* ==================== HERO ==================== */}
      {/* ==================== HERO ==================== */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-8 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
            Explore Our Collection
          </p>

          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Shop By Category
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 mx-auto md:mx-0">
            Explore our carefully selected categories and find the perfect
            products for your style, performance, and everyday needs.
          </p>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Heading */}
          <div className="mb-14 text-center">
            <p className="font-semibold uppercase tracking-[0.25em] text-yellow-600">
              All Categories
            </p>

            <h2 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              Find What You&apos;re Looking For
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Browse all our product categories and discover products made for
              every athlete.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="relative h-80 animate-pulse overflow-hidden rounded-2xl bg-gray-200"
                >
                  <div className="absolute inset-0 bg-gray-300" />

                  <div className="absolute inset-0 bg-black/10" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="h-8 w-40 rounded-lg bg-gray-400" />

                    <div className="mt-4 flex items-center justify-between">
                      <div className="h-5 w-28 rounded bg-gray-400" />
                      <div className="h-6 w-6 rounded-full bg-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center">
              <p className="text-lg font-semibold text-red-600">
                Unable to load categories
              </p>

              <p className="mt-2 text-sm text-red-500">
                Something went wrong while loading the categories. Please try
                again later.
              </p>
            </div>
          )}

          {/* Categories */}
          {!loading && !error && (
            <>
              {categories.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-12 text-center">
                  <p className="text-lg font-semibold text-gray-700">
                    No categories available
                  </p>
                </div>
              ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map((category) => (
                    <CategoryCard
                      key={category._id}
                      id={category._id}
                      name={category.name}
                      productCount={category.productCount}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
