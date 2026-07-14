"use client";

import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaLock, FaSpinner, FaUser } from "react-icons/fa";
import { MdEmail} from "react-icons/md";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
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
    setLoading(true)
    try {
      const response = await axiosInstance.post('/auth/register',formData)
      toast.success(response.data.message)
      setFormData({
        name: "",
        email: "",
        password: ""
      })
      router.push("/login")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong")
    } finally{
      setLoading(false)
    }
  };
  return (
    <main className="h-screen flex items-center justify-center px-4 py-6 bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl px-6 py-8">
        <div className="flex flex-col items-center text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
        <p className="text-gray-600 text-lg">Hello there, sign up to continue.</p>
      </div>
      <form onSubmit={handleSubmit} action="" className="w-full pt-8 flex flex-col gap-8">
        <div className="relative">
          <label
            htmlFor="name"
            className="absolute -top-3 left-6 bg-white px-2 text-lg text-gray-400 z-10 font-bold"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full rounded-4xl border-2 border-gray-400 py-3 pl-4 pr-12 outline-none focus:border-green-600 text-gray-900 placeholder:text-gray-500"
            placeholder="Enter Your Name"
            onChange={handleChange}
            value={formData.name}
          />
          <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
        </div>
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
            className="w-full rounded-4xl border-2 border-gray-400 py-3 pl-4 pr-12 outline-none focus:border-green-600 text-gray-900 placeholder:text-gray-500"
            placeholder="Enter Your Email"
            onChange={handleChange}
            value={formData.email}
          />
          <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
        </div>
        <div className="relative">
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
            className="w-full rounded-4xl border-2 border-gray-400 py-3 pl-4 pr-12 outline-none focus:border-green-600 text-gray-900 placeholder:text-gray-500"
            placeholder="Enter Your Password"
            onChange={handleChange}
            value={formData.password}
          />
          <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
        </div>
        <button type="submit" disabled={loading} className="flex justify-center items-center gap-2 bg-amber-600 text-white py-3 text-2xl font-bold rounded-xl cursor-pointer">{loading?(
          <>
          <FaSpinner className="animate-spin"/>
          Creating Account...
          </>
        ): "Continue"}</button>
      </form>
      <div className="pt-6 text-center">
        <p className="font-semibold text-gray-700">Already have an account?{" "}
        <Link href="/login" className="text-amber-600 hover:text-amber-700">Login?</Link></p>
      </div>
      </div>
    </main>
  );
}