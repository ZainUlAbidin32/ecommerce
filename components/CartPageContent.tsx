"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

export default function CartPageContent() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { cart, loading, updateQuantity, removeFromCart, clearCart } =
    useCart();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.replace("/login");
      return;
    }
    setCheckingAuth(false);
  }, []);
  const handleIncrease = async (
    productId: string,
    currentQuantity: number,
    stock: number,
  ) => {
    if (currentQuantity >= stock) {
      toast.error("Not enough stock available");
      return;
    }

    try {
      await updateQuantity(productId, currentQuantity + 1);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const handleDecrease = async (productId: string, currentQuantity: number) => {
    if (currentQuantity <= 1) {
      return;
    }

    try {
      await updateQuantity(productId, currentQuantity - 1);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await removeFromCart(productId);
      toast.success("Product removed from cart");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to remove product");
    }
  };

  const handleClearCart = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your cart?",
    );

    if (!confirmed) {
      return;
    }
    try {
      await clearCart();
      toast.success("Cart cleared successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to clear cart");
    }
  };

  const subtotal =
    cart?.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ) ?? 0;


  if (checkingAuth) {
  return null;
}  

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-cyan-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-10 w-48 rounded bg-gray-200" />

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-40 rounded-2xl bg-gray-200" />
                ))}
              </div>

              <div className="h-72 rounded-2xl bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-cyan-50 px-6">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <FiShoppingBag size={35} className="text-yellow-600" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-yellow-600"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-cyan-50 px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">
              Shopping Cart
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">Your Cart</h1>

            <p className="mt-3 text-gray-500">
              Review your items before proceeding to checkout.
            </p>
          </div>

          <button
            onClick={handleClearCart}
            className="mt-5 inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-500 shadow-sm transition hover:border-red-500 hover:bg-red-500 hover:text-white md:mt-0 cursor-pointer"
          >
            Clear Cart
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row"
              >
                {/* Product Image */}
                <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-32">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/products/${item.product._id}`}
                        className="text-lg font-semibold text-gray-900 transition hover:text-yellow-600"
                      >
                        {item.product.name}
                      </Link>

                      <p className="mt-2 text-lg font-bold text-yellow-600">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="cursor-pointer text-gray-400 transition hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">
                      <button
                        className="flex h-10 w-10 cursor-pointer items-center justify-center transition hover:bg-gray-100"
                        onClick={() =>
                          handleDecrease(item.product._id, item.quantity)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus />
                      </button>

                      <span className="flex h-10 w-12 items-center justify-center border-x border-gray-200 font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        className="flex h-10 w-10 cursor-pointer items-center justify-center transition hover:bg-gray-100"
                        onClick={() =>
                          handleIncrease(
                            item.product._id,
                            item.quantity,
                            item.product.stock,
                          )
                        }
                        disabled={item.quantity >= item.product.stock}
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <p className="font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>

                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>

                <span>Free</span>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>

                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="mt-6 w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-yellow-600">
              Proceed to Checkout
            </button>

            <Link
              href="/products"
              className="mt-3 block text-center text-sm font-medium text-gray-500 transition hover:text-yellow-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}