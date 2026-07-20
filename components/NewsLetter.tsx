"use client";

import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post("/newsletter", {
        email,
      });

      toast.success(response.data.message);

      setEmail("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-600">
            Stay Connected
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Subscribe To Our Newsletter
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            Be the first to discover new collections, exclusive offers, and
            sports gear updates delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email address"
              className="h-14 flex-1 rounded-full border border-gray-700 bg-gray-900 px-6 text-white outline-none transition focus:border-yellow-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-yellow-600 px-8 font-semibold text-white transition hover:bg-yellow-500"
            >
              {loading?"Subscribing...":"Subscribe"}
              {!loading && <FaPaperPlane />}
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-500">
            No spam. Just exclusive offers and the latest product updates.
          </p>
        </div>
      </div>
    </section>
  );
}
