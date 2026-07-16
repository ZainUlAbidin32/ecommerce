"use client"
import { useEffect, useState } from "react"
import {Product} from "@/types/product"
import axiosInstance from "@/lib/axios"
import ProductCard from "@/components/ProductCard"

export default function ProductsPage(){
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const getProducts = async() => {
        try{
            const response = await axiosInstance.get("/products")
            setProducts(response.data.products)
        } catch(error){
            console.log(error)
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getProducts()
    },[])
        return (
        <div>
            <h1>Products</h1>
            {products.map((product)=>(
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>
    )
}