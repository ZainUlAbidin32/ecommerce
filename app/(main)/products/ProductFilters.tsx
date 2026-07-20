"use client";

import { FaFire, FaSliders } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

interface Category {
  _id: string;
  name: string;
  productCount: number;
}
interface ProductFiltersProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;

  selectedPrice: string;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string>>;

  featuredOnly: boolean;
  setFeaturedOnly: React.Dispatch<React.SetStateAction<boolean>>;

  minPrice: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;

  maxPrice: string;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;

  getProducts: () => Promise<void>;
}

export default function ProductFilters(
  {
  selectedCategories,
  setSelectedCategories,
  selectedPrice,
  setSelectedPrice,
  featuredOnly,
  setFeaturedOnly,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  getProducts
}: ProductFiltersProps
) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const priceOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Under $50",
      value: "under50",
    },
    {
      label: "$50 - $100",
      value: "50to100",
    },
    {
      label: "Above $100",
      value: "above100",
    },
  ];
  const getCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id],
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice("all");
    setFeaturedOnly(false);

    // later
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <>
    {/* Mobile Filter Button */}
    <div className="mb-6 lg:hidden">
      <button
        onClick={() => setShowFilters(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 font-semibold text-white shadow-lg"
      >
        <FaSliders />
        Filters
      </button>
    </div>

    <aside className="hidden lg:block sticky top-24 rounded-3xl border border-gray-200 bg-slate-900 text-white p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-700 pb-5">
        <FaSliders className="text-yellow-500 text-xl" />
        <h2 className="text-2xl font-bold text-white">Filters</h2>
      </div>

      {/* Categories */}

      <div className="mt-8 pb-5 border-b">
        <h3 className="mb-4 font-semibold text-white">Categories</h3>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const selected = selectedCategories.includes(category._id);

            return (
              <button
                key={category._id}
                onClick={() => toggleCategory(category._id)}
                className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200
          ${
            selected
              ? "border-yellow-500 bg-yellow-500 text-white shadow-md"
              : "border-slate-600 bg-slate-800 text-gray-200 hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
          }`}
              >
                {category.name}
                <span className="mx-2 text-yellow-300">•</span>
                <span>{category.productCount}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Price */}

      {/* Price */}

      <div className="mt-8 border-b border-gray-700 pb-8">
        <h3 className="mb-4 font-semibold text-white">Price</h3>

        <div className="flex flex-wrap gap-3">
          {priceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedPrice(option.value)}
              className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200
        ${
          selectedPrice === option.value
            ? "border-yellow-500 bg-yellow-500 text-white shadow-md"
            : "border-slate-600 bg-slate-800 text-gray-200 hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
        }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm text-gray-400">Or choose your own range</p>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min"
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-yellow-500"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Max"
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-yellow-500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <button onClick={getProducts} className="mt-4 w-full rounded-xl bg-yellow-600 py-3 font-semibold text-white transition hover:bg-yellow-700 cursor-pointer">
            Go
          </button>
        </div>
      </div>

      {/* Featured */}

      <div className="mt-8 border-b border-gray-700 pb-8">
        <h3 className="mb-4 font-semibold text-white">Special</h3>

        <button
          onClick={() => setFeaturedOnly(!featuredOnly)}
          className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200
      ${
        featuredOnly
          ? "border-yellow-500 bg-yellow-500 text-white shadow-md"
          : "border-slate-600 bg-slate-800 text-gray-200 hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
      }`}
        >
          <FaFire />
          Featured
        </button>
      </div>

      {/* Buttons */}

      <div className="mt-10 space-y-3">
        <button
          onClick={resetFilters}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 py-3 font-medium text-white transition hover:bg-slate-800 cursor-pointer"
        >
          <IoClose />
          Reset Filters
        </button>
      </div>
    </aside>

    {/* Mobile Drawer */}
    {showFilters && (
      <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
        <div className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-slate-900 p-6 text-white shadow-2xl">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <FaSliders />
              Filters
            </h2>

            <button
              onClick={() => setShowFilters(false)}
              className="text-3xl"
            >
              <IoClose />
            </button>
          </div>

          {/* COPY EVERYTHING FROM YOUR <aside> EXCEPT THE HEADER */}
          <div className="mt-8 pb-5 border-b">
        <h3 className="mb-4 font-semibold text-white">Categories</h3>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const selected = selectedCategories.includes(category._id);

            return (
              <button
                key={category._id}
                onClick={() => toggleCategory(category._id)}
                className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200
          ${
            selected
              ? "border-yellow-500 bg-yellow-500 text-white shadow-md"
              : "border-slate-600 bg-slate-800 text-gray-200 hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
          }`}
              >
                {category.name}
                <span className="mx-2 text-yellow-300">•</span>
                <span>{category.productCount}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Price */}

      {/* Price */}

      <div className="mt-8 border-b border-gray-700 pb-8">
        <h3 className="mb-4 font-semibold text-white">Price</h3>

        <div className="flex flex-wrap gap-3">
          {priceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedPrice(option.value)}
              className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200
        ${
          selectedPrice === option.value
            ? "border-yellow-500 bg-yellow-500 text-white shadow-md"
            : "border-slate-600 bg-slate-800 text-gray-200 hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
        }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm text-gray-400">Or choose your own range</p>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min"
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-yellow-500"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Max"
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-yellow-500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <button onClick={getProducts} className="mt-4 w-full rounded-xl bg-yellow-600 py-3 font-semibold text-white transition hover:bg-yellow-700 cursor-pointer">
            Go
          </button>
        </div>
      </div>

      {/* Featured */}

      <div className="mt-8 border-b border-gray-700 pb-8">
        <h3 className="mb-4 font-semibold text-white">Special</h3>

        <button
          onClick={() => setFeaturedOnly(!featuredOnly)}
          className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200
      ${
        featuredOnly
          ? "border-yellow-500 bg-yellow-500 text-white shadow-md"
          : "border-slate-600 bg-slate-800 text-gray-200 hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
      }`}
        >
          <FaFire />
          Featured
        </button>
      </div>

      {/* Buttons */}

      <div className="mt-10 space-y-3">
        <button
          onClick={resetFilters}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 py-3 font-medium text-white transition hover:bg-slate-800 cursor-pointer"
        >
          <IoClose />
          Reset Filters
        </button>
      </div>

        </div>
      </div>
    )}
    </>
  );
}