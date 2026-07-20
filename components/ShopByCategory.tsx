"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import CategoryCard from "@/components/CategoryCard";

interface Category {
  _id: string;
  name: string;
  productCount: number;
}

export default function ShopByCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-yellow-600 font-semibold uppercase tracking-[0.25em]">
            Shop By Category
          </p>
          <h2 className="text-5xl font-bold mt-4 text-gray-900">
            Find Your Perfect Gear
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Browse our carefully selected categories and discover products made
            for every athlete.
          </p>
        </div>
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
      </div>
    </section>
  );
}