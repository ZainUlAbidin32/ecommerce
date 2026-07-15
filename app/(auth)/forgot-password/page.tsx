"use client";

import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      toast.success(response.data.message);
      setEmail("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
<main className="h-screen flex items-center justify-center px-4 py-6 bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100">
  <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl px-6 py-8">
    <div className="flex flex-col items-center text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900">
        Forgot Password?
      </h2>
      <p className="text-lg text-gray-600">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
      <div className="relative">
        <label
          htmlFor="email"
          className="absolute -top-3 left-6 bg-white px-2 text-lg font-bold text-gray-400"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          name="email"
          className="w-full rounded-4xl border-2 border-gray-400 py-3 pl-4 pr-12 outline-none focus:border-green-600 text-gray-900 placeholder:text-gray-500"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 text-2xl font-bold text-white cursor-pointer"
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin" />
            Sending Email...
          </>
        ) : (
          "Send Reset Link"
        )}
      </button>
    </form>
  </div>
</main>
  );
}
