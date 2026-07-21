"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import axiosInstance from "@/lib/axios";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import ProductHero from "./ProductsHero";
import ProductToolbar from "./ProductToolbar";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sort, setSort] = useState("newest");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
  const category = searchParams.get("category");
  return category ? category.split(",") : [];
});

  const [selectedPrice, setSelectedPrice] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(() => {
  return searchParams.get("featured") === "true";
});
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
  const category = searchParams.get("category");
  const featured = searchParams.get("featured")

  setSelectedCategories(category ? category.split(",") : []);
  setFeaturedOnly(featured === 'true');

  setPage(1);
}, [searchParams]);

  const getProducts = async () => {
    try {
      const params = new URLSearchParams();

      if (debouncedSearch.trim()) {
        params.set("q", debouncedSearch);
      }

      if (selectedCategories.length > 0) {
        params.set("category", selectedCategories.join(","));
      }
      if (featuredOnly) {
        params.set("featured", "true");
      }

      if (minPrice || maxPrice) {
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
      } else {
        switch (selectedPrice) {
          case "under50":
            params.set("maxPrice", "50");
            break;

          case "50to100":
            params.set("minPrice", "50");
            params.set("maxPrice", "100");
            break;

          case "above100":
            params.set("minPrice", "100");
            break;
        }
      }
      params.set("page", page.toString());
      params.set("limit", "8");
      params.set("sort", sort);

      const response = await axiosInstance.get(
        `/products?${params.toString()}`,
      );

      setProducts(response.data.products);
      setTotalProducts(response?.data.totalProducts);
      setTotalPages(response?.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetToFirstPage = () => {
    setPage(1);
  };
  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    getProducts();
  }, [debouncedSearch, selectedCategories, selectedPrice, featuredOnly, page, sort]);
  return (
    <>
      <ProductHero />
      <section className="bg-cyan-50 py-16">
        <div className="mx-auto max-w-7xl px-8">
          <ProductToolbar
            totalProducts={totalProducts}
            search={search}
            setSearch={setSearch}
            sort={sort}
            handleSortChange={handleSortChange}
            handleSearchChange={handleSearchChange}
          />
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <ProductFilters
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                featuredOnly={featuredOnly}
                setFeaturedOnly={setFeaturedOnly}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                getProducts={getProducts}
                resetToFirstPage={resetToFirstPage}
              />
            </div>
            <div className="col-span-3">
              <ProductGrid products={products} />
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
