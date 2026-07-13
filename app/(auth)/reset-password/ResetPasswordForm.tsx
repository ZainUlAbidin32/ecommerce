"use client"
import axiosInstance from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaLock, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false)  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!token){
        toast.error("Invalid or missing reset token")
        return;
    }
    if (password !== confirmPassword){
        toast.error("Passwords do not match")
        return;
    }
    try {
        setLoading(true)
        const response = await axiosInstance.post('/auth/reset-password', {
            token, password
        })
        toast.success(response.data.message)
        router.push('/login')
    } catch(err: any) {
        toast.error(err.response?.data?.message || "Something Went Wrong")
    } finally {
        setLoading(false)
    }
  }
  return (
    <main className="min-h-screen px-4 flex justify-center py-5 items-center bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100">
      <div className="flex flex-col justify-center items-center py-4 gap-10 bg-white w-full md:w-[70%] lg:w-[40%] px-4 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-3xl">Reset Password</h2>
          <p className="text-gray-700 text-lg text-center">
            Enter your new password below to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:w-full">
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
              className="w-full rounded-4xl border-2 border-gray-400 py-3 pl-4 pr-12 outline-none focus:border-green-600"
              placeholder="Enter Your New Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
          </div>
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="absolute -top-3 left-6 bg-white px-2 text-lg text-gray-400 z-10 font-bold"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="w-full rounded-4xl border-2 border-gray-400 py-3 pl-4 pr-12 outline-none focus:border-green-600"
              placeholder="Confirm Your New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
          </div>
          <button type="submit" disabled={loading} className="flex justify-center items-center gap-2 bg-amber-600 text-white py-3 text-2xl font-bold rounded-xl cursor-pointer"
          >{loading?(
            <>
            <FaSpinner className="animate-spin"/>
            Updating Password...
            </>
          ): "Submit"}</button>
        </form>
      </div>
    </main>
  );
}