import { connectDB } from "@/lib/db"
import Category from "@/models/Category"
import Product from "@/models/Product"

export const createProduct = async(
    name: string,
    description: string,
    price: number,
    stock: number,
    brand: string,
    featured: boolean,
    images: string[],
    category: string
) => {
    await connectDB()
    const existingCategory = await Category.findById(category)
    if(!existingCategory) {
        throw new Error("Category does not exists")
    }
    const product = await Product.create({
        name,
        description,
        price,
        stock,
        brand,
        featured,
        images,
        category
    })
    return product
}

export const getProducts = async(
    search: string,
    category: string,
    minPrice: string,
    maxPrice: string,
    featured: string,
    page: number,
    limit: number
) => {
    await connectDB()
    const filter: Record<string, unknown> = {};
    if (search.trim()){
        filter.$or = [
            {
                name: {
                $regex: search,
                $options: 'i', 
            },
            },
            {
                brand: {
                $regex: search,
                $options: 'i'    
                },
            },
        ]
    }
    if (category.trim()){
        const categoryIds = category.split(',')
        filter.category= {
            $in: categoryIds
        }
    }
    if (minPrice || maxPrice){
        filter.price = {}
        if (minPrice) {
            (filter.price as Record<string,number>).$gte= Number(minPrice)
        } 
        if (maxPrice) {
            (filter.price as Record<string,number>).$lte= Number(maxPrice)
        } 
    }
    if (featured){
        filter.featured = featured === "true"
    }
    const skip = (page - 1) * limit

    const products = await Product.find(filter).populate("category").sort({createdAt:-1}).skip(skip).limit(limit)
    const totalProducts = await Product.countDocuments(filter)
    const totalPages = Math.ceil(totalProducts/limit)
    return {
        products,
        currentPage: page,
        totalProducts,
        totalPages
    }
}

export const updateProduct = async(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    brand: string,
    featured: boolean,
    category: string,
    images?: string[]
) => {
    await connectDB()
    const product = await Product.findById(id)
    if(!product){
        throw new Error("Product not found")
    }
    const existingCategory = await Category.findById(category)
    if(!existingCategory){
        throw new Error("Category not found")
    }
    product.name= name
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.brand = brand;
    product.featured = featured;
    if(images){
        product.images=images
    }
    product.category = category;
    await product.save()
    return product
}


export const deleteProduct = async(id:string) => {
    await connectDB()
    const product = await Product.findById(id)
    if(!product){
        throw new Error("Product not found")
    }
    await product.deleteOne()
    return {
        message: "Product deleted Successfully."
    }
}

export const getProductById = async(id:string) => {
    await connectDB()
    const product = await Product.findById(id).populate("category")
    if(!product){
        throw new Error('Product not found.')
    }
    return product
}