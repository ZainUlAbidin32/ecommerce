"use client"

import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdCancel, MdEdit, MdSave } from "react-icons/md";
import { toast } from "sonner";

interface Category {
    _id: string;
    name: string;
}
export default function CreateCategoriesPage() {
    const [name, setName] = useState("")
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState("")
    const [editingName, setEditingName] = useState("")

    const getCategories = async() => {
        try{
            setLoading(true)
            const response = await axiosInstance.get("/categories")
            setCategories(response.data.categories)
        } catch (err:any) {
            toast.error(err?.response?.data?.message || "Failed to load categories");
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=>{
     getCategories()
    },[])
    const createCategory = async(e: React.FormEvent) => {
        e.preventDefault()
        try{
            if (!name.trim()){
            toast.error("Enter Category Name")
            return
        }
        await axiosInstance.post("/categories", {
            name
        })
        setName("")
        await getCategories()
        } catch (err : any) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    }

    const deleteCategory = async(id:string) => {
        try {
            await axiosInstance.delete(`/categories/${id}`)
            toast.success("Category deleted successfully.")
            await getCategories()
        } catch (err:any) {
            toast.error(err.response?.data.message || 'Something went wrong')
        }
    }

    const updateCategory = async() => {
        try{
            if(!editingName.trim()){
                toast.error("Enter Category Name")
                return
            }
            await axiosInstance.put(`/categories/${editingId}`, {
                name: editingName,
            })
            await getCategories()
            toast.success('Category Updated Successfully')
            setEditingId("")
            setEditingName("")
        } catch (err:any) {
            toast.error(err.response?.data?.message || "Something Went Wrong")
        }
    }

    
        return (
  <main className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100 px-4 py-10">
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Manage Categories
        </h1>

        <p className="text-gray-500 text-lg mt-2">
          Create, edit and organize your product categories.
        </p>
      </div>

      {/* Create Category */}
      <form
        onSubmit={createCategory}
        className="relative mb-10"
      >
        <label className="absolute -top-3 left-6 bg-white px-2 text-gray-500 font-semibold">
          Category Name
        </label>

        <div className="flex flex-col sm:flex-row gap-4">

          <input
            type="text"
            placeholder="Enter Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-full border-2 border-gray-300 py-3 px-5 outline-none focus:border-amber-600 transition"
          />

          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 transition text-white rounded-full px-8 py-3 font-semibold cursor-pointer"
          >
            Create
          </button>

        </div>
      </form>

      {/* Categories Heading */}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Categories
        </h2>

        <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full font-semibold">
          {categories.length}
        </span>
      </div>

      {/* Loading */}

      {loading ? (

        <div className="flex justify-center py-20">
          <p className="text-lg text-gray-500">
            Loading...
          </p>
        </div>

      ) : categories.length === 0 ? (

        <div className="text-center py-16">

          <h3 className="text-2xl font-semibold text-gray-700">
            No Categories Found
          </h3>

          <p className="text-gray-500 mt-2">
            Create your first category above.
          </p>

        </div>

      ) : (

        <div className="flex flex-wrap gap-4">

          {categories.map((category) => (

            <div
              key={category._id}
              className="bg-gray-100 rounded-full px-5 py-3 shadow-sm flex items-center gap-3"
            >

              {editingId === category._id ? (

                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) =>
                      setEditingName(e.target.value)
                    }
                    style={{
                      width: `${Math.max(
                        editingName.length + 2,
                        10
                      )}ch`,
                    }}
                    className="bg-white border rounded-full px-3 py-1 outline-none focus:border-amber-600"
                  />

                  <button
                    type="button"
                    onClick={updateCategory}
                    className="w-9 h-9 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition cursor-pointer"
                  >
                    <MdSave />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingId("");
                      setEditingName("");
                    }}
                    className="w-9 h-9 rounded-full bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center transition cursor-pointer"
                  >
                    <MdCancel />
                  </button>
                </>

              ) : (

                <>
                  <span className="font-semibold text-gray-700 whitespace-nowrap">
                    {category.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(category._id);
                      setEditingName(category.name);
                    }}
                    className="w-9 h-9 rounded-full bg-white hover:bg-amber-600 hover:text-white transition flex items-center justify-center cursor-pointer"
                  >
                    <MdEdit />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteCategory(category._id)
                    }
                    className="w-9 h-9 rounded-full bg-white hover:bg-red-600 hover:text-white transition flex items-center justify-center cursor-pointer"
                  >
                    <IoClose />
                  </button>
                </>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  </main>
)
}