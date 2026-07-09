import { register } from "@/controllers/auth.controller";
import { NextRequest } from "next/server";

export async function POST (req: NextRequest) {
    return register(req);
}