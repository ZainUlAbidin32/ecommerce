import { deleteCategoryController, updateCategoryController } from "@/controllers/category.controller";
import { NextRequest } from "next/server";

export async function PUT(
    req: NextRequest,
    {params} : { params : Promise<{id:string}>}
) {
    const {id} = await params
    return updateCategoryController(req,id)
}

export async function DELETE(
    req:NextRequest,
    {params}: {params: Promise<{id:string}>}
){
    const {id} = await params
    return deleteCategoryController(req,id)
}