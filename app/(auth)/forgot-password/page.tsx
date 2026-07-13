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
    <main className="min-h-screen px-4 flex justify-center py-5 items-center bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100">
      <div className="flex flex-col justify-center items-center py-4 bg-white w-full md:w-[70%] lg:w-[40%] px-4 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-3xl">Forgot Password?</h2>
          <p className="text-gray-700 text-lg text-center">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>
        <form className="pt-10 flex flex-col gap-10 md:w-full" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute -top-3 left-6 bg-white px-2 text-lg text-gray-400 z-10 font-bold"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full rounded-4xl border-2 border-gray-400 py-3 pl-4 pr-12 outline-none focus:border-green-600"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center gap-2 bg-amber-600 text-white py-3 text-2xl font-bold rounded-xl cursor-pointer"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Sending Email...
              </>
            ) : (
              "Send Email"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
