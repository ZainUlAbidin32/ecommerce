"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPackage, FiShoppingBag, FiX } from "react-icons/fi";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function OrdersPageContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrder, setCancellingOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders");

        setOrders(response.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingOrder(orderId);

      const response = await axiosInstance.patch(`/orders/${orderId}`);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: response.data.order.status,
              }
            : order,
        ),
      );

      toast.success("Order cancelled successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancellingOrder(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-cyan-50 px-6 py-16">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-10 w-48 rounded bg-gray-200" />

          <div className="mt-10 space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-40 rounded-2xl bg-gray-200" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-cyan-50 px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center md:text-left">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">
            Purchase History
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">My Orders</h1>

          <p className="mt-3 text-gray-500">
            View and track your previous orders.
          </p>
        </div>

        {/* Empty Orders */}
        {orders.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <FiPackage size={45} className="mx-auto text-yellow-600" />

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No Orders Yet
            </h2>

            <p className="mt-3 text-gray-500">
              You haven&apos;t placed any orders yet.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black px-7 py-3 font-semibold text-white transition hover:bg-yellow-600"
            >
              <FiShoppingBag />
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Orders */
          <div className="mt-10 space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  {/* Order Info */}
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>

                    <p className="mt-1 break-all font-semibold text-gray-900">
                      #{order._id}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status / Total / Cancel */}
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
                    <div className="flex items-center gap-4">
                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                          order.status === "cancelled"
                            ? "bg-red-50 text-red-600"
                            : order.status === "delivered"
                              ? "bg-green-50 text-green-600"
                              : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>

                      <p className="text-lg font-bold text-gray-900">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>

                    {order.status === "pending" && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={cancellingOrder === order._id}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                      >
                        <FiX size={16} />

                        {cancellingOrder === order._id
                          ? "Cancelling..."
                          : "Cancel Order"}
                      </button>
                    )}
                  </div>
                </div>

                 <hr className="my-5 border-gray-200" />

                {/* Order Products */}
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={`${order._id}-${index}`}
                      className="flex items-center gap-4"
                    >
                      {/* Product Image */}
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 font-semibold text-gray-900">
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      {/* Product Price */}
                      <p className="shrink-0 text-right font-semibold text-gray-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
