import { deleteProductController, getProductByIdController, updateProductController } from "@/controllers/product.controller";
import { NextRequest } from "next/server";

export async function PUT(
 req: NextRequest,
 {params} : {params: Promise<{id:string}>}
){
    const {id} = await params
    return updateProductController(req,id)
}

export async function DELETE(
    req:NextRequest,
    {params} : {params: Promise<{id:string}>}
){
    const {id} = await params
    return deleteProductController(id)
}

export async function GET(
    req:NextRequest,
    {params} : {params: Promise<{id:string}>}
) {
    const {id} = await params
    return getProductByIdController(id)
}