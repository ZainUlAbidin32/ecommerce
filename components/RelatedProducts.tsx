"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRelatedProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `/products?category=${categoryId}&limit=5`,
        );

        const filteredProducts = response.data.products
          .filter((product: Product) => product._id !== currentProductId)
          .slice(0, 4);

        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error("Failed to load related products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && currentProductId) {
      getRelatedProducts();
    }
  }, [categoryId, currentProductId]);

  if (loading) {
    return (
      <section className="border-t border-gray-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <div className="mx-auto h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="mx-auto mt-4 h-10 w-72 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl bg-gray-100"
              >
                <div className="aspect-square bg-gray-200" />

                <div className="space-y-4 p-5">
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="h-6 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-2/3 rounded bg-gray-200" />
                  <div className="h-8 w-28 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-gray-200 bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="font-semibold uppercase tracking-[0.25em] text-yellow-600">
            You Might Also Like
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Related Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore more products from the same collection.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}