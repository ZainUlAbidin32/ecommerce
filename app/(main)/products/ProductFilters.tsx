"use client";

import { FaFire, FaSliders } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";

// Category data returned from the API
interface Category {
  _id: string;
  name: string;
  productCount: number;
}

// Props received from the parent Products component
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
  resetToFirstPage: () => void;
}

export default function ProductFilters({
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
  getProducts,
  resetToFirstPage,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Categories fetched from the backend
  const [categories, setCategories] = useState<Category[]>([]);

  // Controls the mobile filter drawer
  const [showFilters, setShowFilters] = useState(false);

  // Predefined price filter options
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

  // Fetch all categories for the filter buttons
  const getCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fetch categories when the component first loads
  useEffect(() => {
    getCategories();
  }, []);

  // Select or deselect a category
  const toggleCategory = (id: string) => {
    resetToFirstPage();

    const newCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((categoryId) => categoryId !== id)
      : [...selectedCategories, id];

    setSelectedCategories(newCategories);

    const params = new URLSearchParams(searchParams.toString());

    if (newCategories.length > 0) {
      params.set("category", newCategories.join(","));
    } else {
      params.delete("category");
    }

    router.push(`/products?${params.toString()}`);
  };

  // Clear all active filters
  const resetFilters = () => {
    resetToFirstPage();

    setSelectedCategories([]);
    setSelectedPrice("all");
    setFeaturedOnly(false);
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <>
      {/* ==================== MOBILE FILTER BUTTON ==================== */}
      <div className="mb-6 lg:hidden">
        <button
          onClick={() => setShowFilters(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 font-semibold text-white shadow-lg"
        >
          <FaSliders />
          Filters
        </button>
      </div>

      {/* ==================== DESKTOP FILTER SIDEBAR ==================== */}
      <aside className="sticky top-24 hidden rounded-3xl border border-gray-200 bg-slate-900 p-6 text-white shadow-lg lg:block">
        {/* Filter sidebar header */}
        <div className="flex items-center gap-2 border-b border-gray-700 pb-5">
          <FaSliders className="text-xl text-yellow-500" />
          <h2 className="text-2xl font-bold text-white">Filters</h2>
        </div>

        {/* ==================== CATEGORIES ==================== */}
        <div className="mt-8 border-b pb-5">
          <h3 className="mb-4 font-semibold text-white">Categories</h3>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              // Check if this category is currently selected
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

        {/* ==================== PRICE FILTER ==================== */}
        <div className="mt-8 border-b border-gray-700 pb-8">
          <h3 className="mb-4 font-semibold text-white">Price</h3>

          {/* Predefined price ranges */}
          <div className="flex flex-wrap gap-3">
            {priceOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  // Reset pagination when price filter changes
                  resetToFirstPage();
                  setSelectedPrice(option.value);
                }}
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

          {/* Custom price range */}
          <div className="mt-6">
            <p className="mb-3 text-sm text-gray-400">
              Or choose your own range
            </p>

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

            {/* Apply custom price range */}
            <button
              onClick={getProducts}
              className="mt-4 w-full cursor-pointer rounded-xl bg-yellow-600 py-3 font-semibold text-white transition hover:bg-yellow-700"
            >
              Go
            </button>
          </div>
        </div>

        {/* ==================== FEATURED FILTER ==================== */}
        <div className="mt-8 border-b border-gray-700 pb-8">
          <h3 className="mb-4 font-semibold text-white">Special</h3>

          <button
            onClick={() => {
              resetToFirstPage();

              const newFeatured = !featuredOnly;

              setFeaturedOnly(newFeatured);

              const params = new URLSearchParams(searchParams.toString());

              if (newFeatured) {
                params.set("featured", "true");
              } else {
                params.delete("featured");
              }

              router.push(`/products?${params.toString()}`);
            }}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200
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

        {/* ==================== RESET FILTERS ==================== */}
        <div className="mt-10 space-y-3">
          <button
            onClick={resetFilters}
            className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-700 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            <IoClose />
            Reset Filters
          </button>
        </div>
      </aside>

      {/* ==================== MOBILE FILTER DRAWER ==================== */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-slate-900 p-6 text-white shadow-2xl">
            {/* Mobile drawer header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <FaSliders />
                Filters
              </h2>

              {/* Close mobile filter drawer */}
              <button
                onClick={() => setShowFilters(false)}
                className="text-3xl"
              >
                <IoClose />
              </button>
            </div>

            {/* ==================== MOBILE CATEGORIES ==================== */}
            <div className="mt-8 border-b pb-5">
              <h3 className="mb-4 font-semibold text-white">Categories</h3>

              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  // Check if this category is currently selected
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

            {/* ==================== MOBILE PRICE FILTER ==================== */}
            <div className="mt-8 border-b border-gray-700 pb-8">
              <h3 className="mb-4 font-semibold text-white">Price</h3>

              {/* Predefined price ranges */}
              <div className="flex flex-wrap gap-3">
                {priceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      // Reset pagination when price filter changes
                      resetToFirstPage();
                      setSelectedPrice(option.value);
                    }}
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

              {/* Custom price range */}
              <div className="mt-6">
                <p className="mb-3 text-sm text-gray-400">
                  Or choose your own range
                </p>

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

                {/* Apply custom price range */}
                <button
                  onClick={getProducts}
                  className="mt-4 w-full cursor-pointer rounded-xl bg-yellow-600 py-3 font-semibold text-white transition hover:bg-yellow-700"
                >
                  Go
                </button>
              </div>
            </div>

            {/* ==================== MOBILE FEATURED FILTER ==================== */}
            <div className="mt-8 border-b border-gray-700 pb-8">
              <h3 className="mb-4 font-semibold text-white">Special</h3>

              <button
                onClick={() => {
                  resetToFirstPage();

                  const newFeatured = !featuredOnly;

                  setFeaturedOnly(newFeatured);

                  const params = new URLSearchParams(searchParams.toString());

                  if (newFeatured) {
                    params.set("featured", "true");
                  } else {
                    params.delete("featured");
                  }

                  router.push(`/products?${params.toString()}`);
                }}
                className={`flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200
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

            {/* ==================== MOBILE RESET FILTERS ==================== */}
            <div className="mt-10 space-y-3">
              <button
                onClick={resetFilters}
                className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-700 py-3 font-medium text-white transition hover:bg-slate-800"
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
