import { connectDB } from "@/lib/db"
import Product from "@/models/Product"
import Wishlist, { IWishlistItem } from "@/models/Wishlist"

export const getWishlist = async(userId: string) => {
    await connectDB()
    let wishlist = await Wishlist.findOne({user: userId}).populate("items.product")
    if (!wishlist){
        wishlist = await Wishlist.create({
            user: userId,
            items: []
        })
    }
    return wishlist
}

export const addToWishlist = async (userId: string, productId: string) => {
    await connectDB()
    const product = await Product.findById(productId)
    if(!product){
        throw new Error("Product not found.")
    }
    let wishlist = await Wishlist.findOne({user: userId})
    if(!wishlist){
        wishlist = await Wishlist.create({
            user: userId,
            items: [
                {
                    product: productId
                }
            ]
        })
        return await wishlist.populate("items.product")
    }
    const existingProduct = wishlist.items.some((item: IWishlistItem)=>item.product.toString() === productId) 
    if (existingProduct){
        throw new Error("Product already exists in wishlist")
    }
    wishlist.items.push({
        product: productId
    })
    await wishlist.save()
    return await wishlist.populate("items.product")
}

export const removeFromWishlist = async(userId: string, productId: string) => {
    await connectDB()
    const wishlist = await Wishlist.findOne({user: userId})
    if(!wishlist) {
        throw new Error("No wishlist found")
    }
    const existingProduct = wishlist.items.some((item: IWishlistItem)=>item.product.toString()===productId)
    if(!existingProduct){
        throw new Error("Product does not exist in Wishlist")
    }
    wishlist.items = wishlist.items.filter((item: IWishlistItem)=>item.product.toString()!==productId)
    await wishlist.save()
    return wishlist.populate("items.product")
}