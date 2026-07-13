"use client";

import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaLock} from "react-icons/fa";
import { MdEmail} from "react-icons/md";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter()
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
        const response = await axiosInstance.post('auth/login',formData)
        const {user, token, message } = response.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        toast.success(message)
        router.push("/")
    } catch (err: any){
        toast.error(err.response?.data?.message || "Something went wrong")
    }
  };
  return (
    <main className="min-h-screen px-4 flex justify-center md:py-5 md:items-center md:bg-linear-to-br md:from-amber-50 md:via-orange-50 md:to-yellow-100">
      <div className="flex flex-col justify-center items-center md:py-4 md:bg-white md:w-[70%] lg:w-[40%] md:px-4 md:rounded-2xl md:shadow-2xl">
        <div className="flex flex-col items-start md:w-full md:items-center">
        <h2 className="font-bold text-3xl">Good Afternoon!</h2>
        <p className="text-gray-700 text-lg">Welcome to BuySphere</p>
      </div>
      <form onSubmit={handleSubmit} action="" className="pt-10 flex flex-col md:w-full">
        <div className="relative mb-10">
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
            onChange={handleChange}
            value={formData.email}
          />
          <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
        </div>
        <div className="relative mb-5">
          <label
            htmlFor="password"
            className="absolute -top-3 left-6 bg-white px-2 text-lg text-gray-400 z-10 font-bold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="w-full rounded-4xl border-2 border-gray-400 py-3 pl-4 pr-12 outline-none focus:border-green-600"
            placeholder="Enter Your Password"
            onChange={handleChange}
            value={formData.password}
          />
          <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
        </div>
        <Link href="/forgot-password" className="mb-5 text-right font-bold underline text-amber-600">Forgot Password?</Link>
        <button type="submit" className="bg-amber-600 text-white py-3 text-2xl font-bold rounded-xl cursor-pointer">Login</button>
      </form>
      <div className="pt-4 flex justify-start lg:w-full lg:justify-center">
        <p className="font-semibold">Don&rsquo;t have an account yet?{" "}
        <Link href="/signup" className="text-amber-600">Register?</Link></p>
      </div>
      </div>
    </main>
  );
}