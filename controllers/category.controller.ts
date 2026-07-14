import { createCategory, deleteCategory, getCategories, updateCategory } from "@/services/category.service";
import { NextRequest, NextResponse } from "next/server";

export const createCategoryController = async (req: NextRequest) => {

    try {
        const { name } = await req.json()
        if (!name?.trim()) {
            return NextResponse.json({
                success: false,
                message: "Ctaegory name is required"
            }, { status: 400 })
        }
        const category = await createCategory(name.trim())
        return NextResponse.json({
            success: true,
            message: "Category created Successfully",
            category,

        }, { status: 201 })
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message
        }, { status: 400 })
    }
}

export const getCategoryController = async () => {
    try {
        const categories = await getCategories()
        return NextResponse.json({
            success: true,
            categories,
    }, {status: 200})
    } catch (err:any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        } , {status: 400})
    }
}

export const updateCategoryController = async(req: NextRequest, id:string) => {
    try{
        const {name} = await req.json()
        if(!name?.trim()){
            return NextResponse.json({
                success: false,
                message: "Category name is required"
            },{status:400})
        }
        const category = await updateCategory(id,name.trim())
        return NextResponse.json({
            success: true,
            message: "Category updated successfully",
            category,
        }, {status:200})
    } catch(err:any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        },{status:400})
    }
}

export const deleteCategoryController = async(
    req: NextRequest,
    id: string
) => {
    try {
        const category = await deleteCategory(id)
        return NextResponse.json({
            success: true,
            message: category.message,
        }, {status:200})
    } catch (err: any){
        return NextResponse.json({
            success: false,
            message: err.message
        }, {status: 400})
    }
}