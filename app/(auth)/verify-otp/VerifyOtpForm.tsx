"use client"
import axiosInstance from "@/lib/axios"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useState } from "react"
import { FaSpinner } from "react-icons/fa"
import { toast } from "sonner"

export default function VerifyOtpForm(){
    const searchParams = useSearchParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState("")
    const [resendOtp, setResendOtp] = useState(false)

    const email = searchParams.get("email") 
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        if(!email){
            toast.error("Email not found.")
            return
        }
        if (otp.length !== 6) {
            toast.error("OTP must be 6 digits")
            return
        }
        setLoading(true)
        try{
            const response = await axiosInstance.post("/auth/verify-otp", {
                email, otp
            })
            toast.success(response.data.message)
            router.push("/login")
        } catch (err:any) {
            toast.error(err.response?.data?.message || "Something Went Wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleResendOtp = async() => {
        if (!email) {
            toast.success("Email not found")
            return;
        }
        setResendOtp(true)
        try {
            const response = await axiosInstance.post('/auth/resend-otp', {
                email
            })
            toast.success(response.data.message)
        } catch (err:any) {
            toast.error(err.response?.data?.message || "Something Went Wrong")
        } finally {
            setResendOtp(false)
        }
    }

    return (
        <main className="h-screen flex items-center justify-center px-4 py-6 bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100">
  <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl px-6 py-8">
    <div className="flex flex-col items-center text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900">
        Verify Email
      </h2>

      <p className="text-lg text-gray-600">
        Enter the 6-digit verification code sent to your email.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
      <div className="relative">
        <label
          htmlFor="otp"
          className="absolute -top-3 left-6 bg-white px-2 text-lg font-bold text-gray-400"
        >
          Verification Code
        </label>

        <input
          id="otp"
          type="text"
          name="otp"
          maxLength={6}
          className="w-full rounded-4xl border-2 border-gray-400 py-3 pl-4 pr-4 text-center tracking-[0.5em] text-2xl font-semibold text-gray-900 outline-none placeholder:text-gray-500 focus:border-green-600"
          placeholder="123456"
          onChange={(e)=>{
            const value = e.target.value.replace(/\D/g,"")
            setOtp(value)
          }}
          value={otp}
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 text-2xl font-bold text-white cursor-pointer"
        disabled={loading}
      >
        {loading ? (
    <>
        <FaSpinner className="animate-spin" />
        Verifying...
    </>
) : (
    "Verify OTP"
)}
      </button>
    </form>

    <div className="pt-6 text-center">
      <p className="font-semibold text-gray-700">
        Didn&apos;t receive the code?
      </p>

      <button
        type="button"
        className="mt-2 font-semibold cursor-pointer text-amber-600 hover:text-amber-700"
        onClick={handleResendOtp}
        disabled={resendOtp}
      >
        {resendOtp?"Sending...":"Resend OTP"}
      </button>
    </div>
  </div>
</main>
    )
}