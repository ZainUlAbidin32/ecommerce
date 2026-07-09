import { registerUser } from "@/services/auth.service";
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