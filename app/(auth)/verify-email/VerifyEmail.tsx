"use client"
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState("")
    const searchParams = useSearchParams()
    const token = searchParams.get('token')    
    useEffect(()=>{
        if(!token){
            setLoading(false)
            setMessage("Inavlid Verification Link")
            return;
        }
        const verifyEmail = async() => {
            try {
                const response = await axiosInstance.get(`/auth/verify-email?token=${token}`)
                setSuccess(true)
                setMessage(response.data.message)
            } catch(err: any) {
                setSuccess(false)
                setMessage(err.response?.data?.message || "Verification failed")
            } finally {
                setLoading(false)
            }
        }
        verifyEmail()
    },[token])

    return (
        <main className="min-h-screen flex justify-center items-center bg-linear-to-br from-amber-50 via-orange-50 to to-yellow-100 px-4">
            <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center">
                {loading? (
                    <>
                    <h1 className="text-bold text-3xl">Verifying Email...</h1>
                    <p className="text-gray-600 mt-4">Please wait while we verify you email</p>
                    </>
                ): (
                    <>
                    <h1 className={`text-3xl font-bold ${success?'text-green-600':'text-red-600'}`}>{success?"Email Verified" : "Verification failed"}</h1>
                    <p className="text-gray-600 mt-4">{message}</p>
                    <Link href='/login' className="bg-amber-600 text-white mt-8 cursor-pointer inline-block py-3 px-6 rounded-xl font-semibold hover:bg-amber-700 transition-all"> Go to Login</Link>
                    </>
                )}
            </div>
        </main>
    )
}