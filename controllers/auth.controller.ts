import { verifyToken } from "@/lib/auth";
import { registerUser, loginUser, getProfile, verifyEmail, forgotPassword, resetPassword } from "@/services/auth.service";
import { NextRequest, NextResponse } from "next/server";

export const register = async(req:NextRequest) => {
    try{
        const {name,email,password} = await req.json();
        const user = await registerUser(name,email,password)
        return NextResponse.json({
            success: true,
            message: "User Registered Successfully",
            user,
        },{status:201})
    } catch(error:any) {
        return NextResponse.json({
            success: false,
            message: error.message,
        },{status:400})
    }

};

export const login = async (req: NextRequest) => {
    try {
        const {email, password} = await req.json()
        const {user, token} = await loginUser(email, password)
        return NextResponse.json({
            success: true,
            message: "Login Successfull",
            user,
            token,
        }, {status: 200})
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, {status: 400})
    }
}

export const profile = async (req: NextRequest) => {
    try {
        const authHeader = await req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")){
            throw new Error ("Unauthorized")
        }
        const token = authHeader.split(" ")[1]
        const decoded = verifyToken(token)
        const user = await getProfile(decoded.userId)
        return NextResponse.json({
            success: true,
            user,
        }, {status: 200})
    } catch(err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, {status:401})
    }
}

export const verifyUserEmail = async (req: NextRequest) => {
    try {
        const token = req.nextUrl.searchParams.get("token")
        if (!token) {
            throw new Error ("Verification Token is missing")
        } 
        await verifyEmail(token)
        return NextResponse.json({
            success: true,
            message: "Email verified successfully. You can return to login page."
        }, {status:200})
    } catch (err:any) {
        return NextResponse.json({
            success: false,
            message: err.message
        },{status: 400})
    }
}

export const forgotPasswordController = async (req: NextRequest) => {
    try {
        const {email} = await req.json()
        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email is required.",
                },
                {
                    status: 400,
                }
            );
        }
        const response = await forgotPassword(email)
        return NextResponse.json({
            success: true,
            message: response.message
        }, {status: 200})
    } catch (err: any ) {
        return NextResponse.json({
            success: false,
            message: err.message
        }, {status:400})
    }
}

export const resetPasswordController = async (req: NextRequest) => {
    try {
        const {token, password} = await req.json()
         if (!token || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Token and password are required.",
                },
                {
                    status: 400,
                }
            );
        }
        const response = await resetPassword(token, password)
        return NextResponse.json({
            success: true,
            message: response.message
        }, {status: 200})
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, {status:400})
    }
}