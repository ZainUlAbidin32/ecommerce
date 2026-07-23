"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { FaBolt } from "react-icons/fa";
import axiosInstance from "@/lib/axios";
import { Product } from "@/types/product";
import RelatedProducts from "@/components/RelatedProducts";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [error, setError] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const getProduct = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(`/products/${id}`);

      setProduct(response.data.product);
    } catch (error) {
      console.error(error);
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }
    if (!product || product.stock <= 0) {
      return;
    }

    try {
      setAddingToCart(true);

      await addToCart(product._id, quantity);

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

  if (loading) {
    return (
      <main className="bg-cyan-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid animate-pulse gap-12 lg:grid-cols-2">
            <div className="aspect-square rounded-3xl bg-gray-200" />

            <div className="flex flex-col justify-center">
              <div className="h-5 w-24 rounded bg-gray-200" />
              <div className="mt-5 h-12 w-3/4 rounded bg-gray-200" />
              <div className="mt-6 h-6 w-32 rounded bg-gray-200" />

              <div className="mt-8 space-y-3">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
              </div>

              <div className="mt-10 h-14 w-full rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-cyan-50 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            Sorry, we couldn't find the product you're looking for.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white transition hover:bg-yellow-700"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <main className="bg-cyan-50">
      {/* Breadcrumb */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-yellow-600">
              Home
            </Link>

            <span>/</span>

            <Link href="/products" className="transition hover:text-yellow-600">
              Products
            </Link>

            <span>/</span>

            <span className="font-medium text-gray-900">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="px-6 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Images */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Brand */}
                <span className="absolute left-5 top-5 rounded-full bg-yellow-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow">
                  {product.brand}
                </span>
              </div>

              {/* Image Thumbnails */}
              {product.images.length > 1 && (
                <div className="mt-5 flex gap-4 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition ${
                        selectedImage === index
                          ? "border-yellow-500"
                          : "border-gray-200 hover:border-yellow-400"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center">
              {/* Category */}
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">
                {product.category.name}
              </p>

              {/* Name */}
              <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-6">
                <span className="text-4xl font-bold text-yellow-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Stock */}
              <div className="mt-6">
                {isOutOfStock ? (
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                    <FaBolt />
                    Out of Stock
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                    <FaBolt />
                    {product.stock} items available
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="mt-8 text-base leading-8 text-gray-600">
                {product.description}
              </p>

              <hr className="my-8 border-gray-200" />

              {!isOutOfStock && (
                <>
                  {/* Quantity */}
                  <div>
                    <p className="mb-3 text-sm font-semibold text-gray-900">
                      Quantity
                    </p>

                    <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <button
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="flex h-12 w-12 items-center justify-center text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FiMinus />
                      </button>

                      <span className="flex h-12 w-14 items-center justify-center border-x border-gray-200 font-semibold text-gray-900">
                        {quantity}
                      </span>

                      <button
                        onClick={increaseQuantity}
                        disabled={quantity >= product.stock}
                        className="flex h-12 w-12 items-center justify-center text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <button
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {addingToCart ? (
                        "Adding..."
                      ) : addedToCart ? (
                        "Added to Cart ✓"
                      ) : (
                        <>
                          <FiShoppingCart size={20} />
                          Add to Cart
                        </>
                      )}
                    </button>

                    <button className="flex flex-1 items-center justify-center rounded-xl bg-yellow-600 px-6 py-4 font-semibold text-white transition hover:bg-yellow-700 cursor-pointer">
                      Buy Now
                    </button>
                  </div>

                  {/* Wishlist */}
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-700 transition hover:border-yellow-500 hover:text-yellow-600 cursor-pointer">
                    <FiHeart size={20} />
                    Add to Wishlist
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <RelatedProducts
        categoryId={product.category._id}
        currentProductId={product._id}
      />
    </main>
  );
}
