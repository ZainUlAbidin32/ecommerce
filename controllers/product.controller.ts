import { createProduct, deleteProduct, getProducts, updateProduct } from "@/services/product.service";
import { NextRequest, NextResponse } from "next/server";

export const createProductController = async(req: NextRequest) => {
    try {
        const {name,description,price,stock,brand,featured,images,category} = await req.json()
        if (
            !name?.trim() ||
            !description?.trim() ||
            price === undefined ||
            stock === undefined ||
            !brand?.trim() ||
            !Array.isArray(images) ||
            images.length === 0 ||
            !category
        ) {
            return NextResponse.json({
                success: false,
                message: "All the fields must be provided"
            }, {status:400})
        }
        const product = await createProduct(
            name.trim(),
            description.trim(),
            Number(price),
            Number(stock),
            brand.trim(),
            featured?? false,
            images,
            category
        )
        return NextResponse.json({
            success: true,
            message: "Product Created Successfully",
            product,
        }, {status: 201})
    } catch (err:any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        },{status:400})
    }
}


export const getProductsController = async() => {
    try {
        const products = await getProducts()
        return NextResponse.json({
            success: true,
            products, 
        },{status: 200})
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message
        }, {status:400})
    }
}

export const updateProductController = async(
    req: NextRequest,
    id: string,
) => {
    try {
        const {
            name,
            description,
            price,
            stock,
            brand,
            featured,
            images,
            category
    } = await req.json()
    if (
            !name?.trim() ||
            !description?.trim() ||
            price === undefined ||
            stock === undefined ||
            !brand?.trim() ||
            !Array.isArray(images) ||
            images.length === 0 ||
            !category
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required.",
                }, {status: 400});
        }
        const product = await updateProduct(
            id,
            name.trim(),
            description.trim(),
            Number(price),
            Number(stock),
            brand.trim(),
            featured ?? false,
            images,
            category
        )
        return NextResponse.json({
            success: true,
            message: "Product Updated Successfully",
            product
        }, {status:200})
    } catch (err:any) {
        return NextResponse.json({
            success: false,
            message: err.message
        },{status:400})
    }
}

export const deleteProductController = async(req:NextRequest, id:string ) => {
    try {
        const product = await deleteProduct(id)
        return NextResponse.json({
            success: true,
            message: product.message
        },{status: 200})
    } catch(err:any){
        return NextResponse.json({
            success: false,
            message: err.message
        },{status:400})
    }
}