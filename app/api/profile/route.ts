import { profile } from "@/controllers/auth.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    return profile(req)
}