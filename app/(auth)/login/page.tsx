"use client";

import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast } from "sonner";

export default function LoginPage() {
  const {login} = useAuth()
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("auth/login", formData);
      const { user, token, message } = response.data;
      login(user, token);
      toast.success(message);
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <main className="h-screen flex items-center justify-center px-4 py-6 bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl px-6 py-8">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
          <p className="text-lg text-gray-600">
            Login to continue to BuySphere.
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
              onChange={handleChange}
              value={formData.email}
            />

            <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="absolute -top-3 left-6 bg-white px-2 text-lg font-bold text-gray-400"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              className="w-full rounded-4xl border-2 border-gray-400 py-3 pl-4 pr-12 outline-none focus:border-green-600 text-gray-900 placeholder:text-gray-500"
              placeholder="Enter Your Password"
              onChange={handleChange}
              value={formData.password}
            />

            <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
          </div>

          <Link
            href="/forgot-password"
            className="text-right font-semibold text-amber-600 hover:text-amber-700 cursor-pointer"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            className="rounded-xl bg-amber-600 py-3 text-2xl font-bold text-white cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="pt-6 text-center">
          <p className="font-semibold text-gray-700">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-amber-600 hover:text-amber-700"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
