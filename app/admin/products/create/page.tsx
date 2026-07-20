"use client"

import axiosInstance from "@/lib/axios";
import React, { useEffect, useRef, useState } from "react"
import { FaSpinner } from "react-icons/fa";
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
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setBrand("");
        setCategory("");
        setFeatured(false);
        setImages([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
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
  <main className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100 px-4 py-10">
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Create Product
        </h1>

        <p className="text-gray-500 text-lg mt-2">
          Add a new product to your store.
        </p>
      </div>

      <form
        onSubmit={createProduct}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >

        <div className="relative">
          <label className="absolute -top-3 left-6 bg-white px-2 text-gray-500 font-semibold">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-full border-2 border-gray-300 py-3 px-5 outline-none focus:border-amber-600"
          />
        </div>

        <div className="relative">
          <label className="absolute -top-3 left-6 bg-white px-2 text-gray-500 font-semibold">
            Brand
          </label>
          <input
            type="text"
            placeholder="Enter Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full rounded-full border-2 border-gray-300 py-3 px-5 outline-none focus:border-amber-600"
          />
        </div>

        <div className="relative">
          <label className="absolute -top-3 left-6 bg-white px-2 text-gray-500 font-semibold">
            Price
          </label>
          <input
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-full border-2 border-gray-300 py-3 px-5 outline-none focus:border-amber-600"
          />
        </div>

        <div className="relative">
          <label className="absolute -top-3 left-6 bg-white px-2 text-gray-500 font-semibold">
            Stock
          </label>
          <input
            type="number"
            placeholder="Enter Stock Quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-full border-2 border-gray-300 py-3 px-5 outline-none focus:border-amber-600"
          />
        </div>

        <div className="relative">
          <label className="absolute -top-3 left-6 bg-white px-2 text-gray-500 font-semibold">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-full border-2 border-gray-300 py-3 px-5 outline-none focus:border-amber-600 bg-white"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center mt-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 accent-amber-600"
            />
            <span className="text-gray-700 font-medium">
              Featured Product
            </span>
          </label>
        </div>

        <div className="relative md:col-span-2">
          <label className="absolute -top-3 left-6 bg-white px-2 text-gray-500 font-semibold">
            Description
          </label>
          <textarea
            placeholder="Enter Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-3xl border-2 border-gray-300 py-4 px-5 resize-none outline-none focus:border-amber-600"
          />
        </div>

        <div className="relative md:col-span-2">
          <label className="absolute -top-3 left-6 bg-white px-2 text-gray-500 font-semibold">
            Product Images
          </label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) =>
              setImages(Array.from(e.target.files || []))
            }
            className="w-full rounded-3xl border-2 border-dashed border-gray-300 py-5 px-5 cursor-pointer file:bg-amber-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:mr-4 hover:file:bg-amber-700"
          />

          {images.length > 0 && (
            <p className="mt-3 text-sm text-gray-500">
              {images.length} image(s) selected
            </p>
          )}
        </div>

        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 disabled:cursor-not-allowed transition text-white rounded-xl px-12 py-3 text-lg font-bold flex items-center justify-center gap-2 cursor-pointer">
                {loading ? (
                    <>
                        <FaSpinner className="animate-spin" /> 
                        Creating Product...
                    </>
                ) : (
                        "Create Product"
                    )}
            </button>
        </div>
      </form>
    </div>
  </main>
);
}