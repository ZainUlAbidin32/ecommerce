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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const category = searchParams.get("category");
    return category ? category.split(",") : [];
  });
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const getProducts = async () => {
    try {
      const params = new URLSearchParams();

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

      const response = await axiosInstance.get(
        `/products?${params.toString()}`,
      );

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, [selectedCategories, selectedPrice, featuredOnly]);
  return (
    <>
      <ProductHero />
      <section className="bg-cyan-50 py-16">
        <div className="mx-auto max-w-7xl px-8">
          <ProductToolbar totalProducts={products.length} />
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
              />
            </div>
            <div className="col-span-3">
              <ProductGrid products={products} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}