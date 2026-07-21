import { uploadImage } from "@/lib/uploadImage";
import { createProduct, deleteProduct, getProducts, updateProduct, getProductById } from "@/services/product.service";
import { NextRequest, NextResponse } from "next/server";

export const createProductController = async(req: NextRequest) => {
    try {
        const formData = await req.formData()
        const name = formData.get("name") as string
        const description = formData.get("description") as string
        const price = Number(formData.get("price"))
        const stock = Number(formData.get("stock"))
        const brand = formData.get("brand") as string
        const featured = formData.get("featured") === "true"
        const category = formData.get("category") as string
        const files = formData.getAll("images") as File[]

        if (
            !name?.trim() ||
            !description?.trim() ||
            Number.isNaN(price) ||
            Number.isNaN(stock) || 
            !brand?.trim() ||
            files.length === 0 ||
            !category
        ) {
            return NextResponse.json({
                success: false,
                message: "All the fields must be provided"
            }, {status:400})
        }
        const imageUrls= await Promise.all(
            files.map((file)=>uploadImage(file))
        )
        const product = await createProduct(
            name.trim(),
            description.trim(),
            price,
            stock,
            brand.trim(),
            featured,
            imageUrls,
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


export const getProductsController = async(req: NextRequest) => {
    try {
        const search = req.nextUrl.searchParams.get("q") || ""
        const category = req.nextUrl.searchParams.get("category") || ""
        const minPrice = req.nextUrl.searchParams.get("minPrice") || "";
        const maxPrice = req.nextUrl.searchParams.get("maxPrice") || "";
        const featured = req.nextUrl.searchParams.get("featured") || "";
        const page = Number(req.nextUrl.searchParams.get("page")) || 1;
        const limit = Number(req.nextUrl.searchParams.get("limit")) || 8;
        const sort = req.nextUrl.searchParams.get("sort") || "newest";
        const result = await getProducts(search, category, minPrice, maxPrice, featured, page, limit, sort)
        return NextResponse.json({
            success: true,
            ...result, 
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
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));
        const brand = formData.get("brand") as string;
        const featured = formData.get("featured") === "true";
        const category = formData.get("category") as string;

const files = formData.getAll("images") as File[];
    if (
            !name?.trim() ||
            !description?.trim() ||
            !brand?.trim() ||
            Number.isNaN(price) ||
            Number.isNaN(stock) ||
            !category
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required.",
                }, {status: 400});
        }
        let imageUrls: string[] | undefined
        if (files.length > 0) {
            imageUrls = await Promise.all(
            files.map((file)=>uploadImage(file))
        )
        }
        const product = await updateProduct(
            id,
            name.trim(),
            description.trim(),
            price,
            stock,
            brand.trim(),
            featured,
            category,
            imageUrls
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

export const deleteProductController = async(id:string ) => {
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

export const getProductByIdController = async(id:string) => {
    try {
        const product = await getProductById(id)
        return NextResponse.json({
            success: true,
            product,
        },{status:200})
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message
        }, {status: 400})
    }
}