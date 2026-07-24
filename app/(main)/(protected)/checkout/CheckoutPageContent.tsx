"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiCheck, FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function CheckoutPageContent() {
  const { cart, loading } = useCart();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.replace("/login");
      return;
    }

    setCheckingAuth(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    setPlacingOrder(true);

    const response = await axiosInstance.post("/orders", formData);

    toast.success(
      response.data.message || "Order placed successfully",
    );

    window.location.href = "/orders";
  } catch (err: any) {
    toast.error(
      err.response?.data?.message ||
        "Failed to place order",
    );
  } finally {
    setPlacingOrder(false);
  }
};

  const subtotal =
    cart?.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0,
    ) ?? 0;

  const shipping:number = 0;

  const total = subtotal + shipping;

  if (checkingAuth) {
    return null;
  }

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-cyan-50 px-6 py-16">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-10 w-48 rounded bg-gray-200" />

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="h-150 rounded-2xl bg-gray-200 lg:col-span-2" />

            <div className="h-96 rounded-2xl bg-gray-200" />
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
            <FiShoppingBag
              size={35}
              className="text-yellow-600"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            Add some products to your cart before checking out.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-yellow-600"
          >
            <FiShoppingBag />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-cyan-50 px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-10">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-yellow-600"
          >
            <FiArrowLeft />
            Back to Cart
          </Link>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">
            Secure Checkout
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Complete Your Order
          </h1>

          <p className="mt-3 text-gray-500">
            Enter your information and shipping details to place your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
        
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2"
          >
            
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Customer Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Provide your contact information.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Shipping Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Where should we deliver your order?
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Shipping Address
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Postal Code
                    </label>

                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Enter postal code"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={placingOrder}
              className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-yellow-600"
            >
              <FiCheck size={18} />
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">
              {cart.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex gap-4"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                      {item.product.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="mt-1 font-semibold text-yellow-600">
                      $
                      {(
                        item.product.price * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-6 border-gray-200" />

            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0
                    ? "Free"
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <p className="text-center text-sm text-gray-500">
                Your order will be processed securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}