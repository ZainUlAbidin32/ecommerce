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

export const getProducts = async() => {
    await connectDB()
    const products = await Product.find().populate("category").sort({createdAt:-1})
    return products
}

export const updateProduct = async(
    id: string,
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
    const product = await Product.findById(id)
    if(!product){
        throw new Error("Product not found")
    }
    const existingCategory = await Product.findById(category)
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
    product.images = images;
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