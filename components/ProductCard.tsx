"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBolt } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export interface productCardProps {
  product: Product;
}

export default function ProductCard({ product }: productCardProps) {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [updatingWishlist, setUpdatingWishlist] = useState(false);

  const wishlisted = isInWishlist(product._id);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      setAddingToCart(true);

      await addToCart(product._id, 1);

      setAddedToCart(true);

      toast.success("Product added to cart");

      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } catch (error: any) {
      console.error("Failed to add product to cart:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add product to cart. Please try again.",
      );
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      setUpdatingWishlist(true);

      if (wishlisted) {
        await removeFromWishlist(product._id);
        toast.success("Product removed from wishlist");
      } else {
        await addToWishlist(product._id);
        toast.success("Product added to wishlist");
      }
    } catch (error: any) {
      console.error("Failed to update wishlist:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update wishlist. Please try again.",
      );
    } finally {
      setUpdatingWishlist(false);
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <span className="absolute top-5 left-3 rounded-full bg-yellow-600 px-3 py-1 text-xs font-semibold uppercase text-white shadow">
          {product.brand}
        </span>

        <button
          onClick={handleWishlist}
          disabled={updatingWishlist}
          className={`absolute top-3 right-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition ${
            wishlisted
              ? "text-red-500"
              : "text-gray-700 hover:bg-yellow-600 hover:text-white"
          } disabled:cursor-not-allowed disabled:opacity-50`}
          aria-label={
            wishlisted
              ? "Remove from Wishlist"
              : "Add to Wishlist"
          }
        >
          <FiHeart
            size={18}
            className={wishlisted ? "fill-current" : ""}
          />
        </button>
      </div>

      <div className="flex h-73 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-600">
          {product.category.name}
        </p>

        <Link href={`/products/${product._id}`}>
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900 transition group-hover:text-yellow-600">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        <div className="mt-auto">
          <hr className="mb-4 border-gray-200" />

          <div className="mb-4 flex items-center justify-between">
            <p className="text-2xl font-bold text-yellow-600">
              ${product.price.toFixed(2)}
            </p>

            {product.stock > 0 ? (
              <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                <FaBolt size={15} />
                <span>{product.stock} Left</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                <FaBolt size={15} />
                <span>Out of Stock</span>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || addingToCart}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-black py-3 font-medium text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {addingToCart ? (
              "Adding..."
            ) : addedToCart ? (
              "Added to Cart ✓"
            ) : (
              <>
                <FiShoppingCart />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}