"use client";

import { FiSearch } from "react-icons/fi";

interface ProductToolbarProps {
  totalProducts: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  handleSortChange: (value: string) => void;
  handleSearchChange: (value: string) => void;
}

export default function ProductToolbar({
  totalProducts,
  search,
  setSearch,
  sort,
  handleSortChange,
  handleSearchChange
}: ProductToolbarProps) {
  return (
    <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}

        <div className="relative w-full lg:max-w-xl">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search Nike, Adidas, Football..."
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/15"
          />
        </div>

        {/* Right */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Count */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Showing
            </p>

            <p className="mt-1 font-bold text-slate-900">
              {totalProducts} Products
            </p>
          </div>

          {/* Sort */}

          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="h-14 cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-5 font-medium text-slate-700 outline-none transition-all duration-300 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/15"
          >
            <option value="newest">Newest</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="nameAZ">Name: A-Z</option>
            <option value="nameZA">Name: Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
