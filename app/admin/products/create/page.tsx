"use client"

import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react"
import { toast } from "sonner";

interface Category {
    _id: string;
    name: string
}

export default function CreateProductPage(){
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [featured, setFeatured] = useState(false)
    const [images, setImages] = useState<File[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)

    const getCategories = async() => {
        try {
            setLoading(true)
            const response = await axiosInstance.get("/categories")
            setCategories(response.data.categories)
        } catch (err: any ){
            toast.error(err.response?.data?.message || "Failed to fetch categories")
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=>{
        getCategories()
    },[])

    const createProduct = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (
            !name.trim() ||
            !description.trim() ||
            !price ||
            !stock ||
            !brand.trim() ||
            !category ||
            images.length === 0
        ) {
            toast.error("Please fill all the fields")
            return
        }
        setLoading(true)
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("stock", stock)
        formData.append("brand", brand)
        formData.append("category", category)
        formData.append("featured", featured.toString())
        images.forEach((image)=> {
            formData.append("images", image)
        })
        await axiosInstance.post("/products", formData)
        toast.success("Product Created Successfully")
        } 
        catch (err: any) {
        toast.error(
            err.response?.data?.message || "Something went wrong"
        );
        } 
        finally {
        setLoading(false);
        }
    } 
    
    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={createProduct}>
                <div>
                    <label>Product Name</label>
                    <input type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" placeholder="Enter Product Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" placeholder="Enter Product Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
                </div>
                <div>
                    <label>Stock</label>
                    <input type="number" placeholder="Enter Stock Quantity" value={stock} onChange={(e)=>setStock(e.target.value)} />
                </div>
                <div>
                    <label>Brand</label>
                    <input type="text" placeholder="Enter Product Brand" value={brand} onChange={(e)=>setBrand(e.target.value)} />
                </div>
                <div>
                    <label>Category</label>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map((category)=>(
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>
                        <input type="checkbox" checked={featured} onChange={(e)=>setFeatured(e.target.checked)}/>
                        Featured Product
                    </label>
                </div>
                <div>
                    <label >Images</label>
                    <input type="file" multiple 
                    onChange={(e)=>setImages(Array.from(e.target.files || []))} />
                </div>
                <button type="submit">
                    Create Product
                </button>
            </form>
        </div>
    )
}