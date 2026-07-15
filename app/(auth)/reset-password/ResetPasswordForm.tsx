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
    <main className="h-screen flex items-center justify-center px-4 py-6 bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100">
  <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl px-6 py-8">
    <div className="flex flex-col items-center text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900">
        Reset Password
      </h2>
      <p className="text-lg text-gray-600">
        Enter your new password below to reset your password.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
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
          placeholder="Enter Your New Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
      </div>

      <div className="relative">
        <label
          htmlFor="confirmPassword"
          className="absolute -top-3 left-6 bg-white px-2 text-lg font-bold text-gray-400"
        >
          Confirm Password
        </label>

        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          className="w-full rounded-4xl border-2 border-gray-400 py-3 pl-4 pr-12 outline-none focus:border-green-600 text-gray-900 placeholder:text-gray-500"
          placeholder="Confirm Your New Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />

        <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 text-2xl font-bold text-white cursor-pointer"
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin" />
            Updating Password...
          </>
        ) : (
          "Update Password"
        )}
      </button>
    </form>
  </div>
</main>
  );
}