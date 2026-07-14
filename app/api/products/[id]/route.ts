import { updateProductController } from "@/controllers/product.controller";
import { NextRequest } from "next/server";

export async function PUT(
 req: NextRequest,
 {params} : {params: Promise<{id:string}>}
){
    const {id} = await params
    return updateProductController(req,id)
}
