import { createProductController, getProductsController } from "@/controllers/product.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    return createProductController(req)
}

export async function GET(req: NextRequest){
    return getProductsController(req)
}