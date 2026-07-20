"use client";

import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/products");

      setProducts(response.data.products);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async(id:string) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this product"
    )
    if (!confirmed) return;
    try {
        await axiosInstance.delete(`/products/${id}`)
        toast.success('Product Deleted Successfully.')
        await getProducts()
    } catch( err:any) {
        toast.error(err.response?.data?.message || "Something Went Wrong")
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100 px-4 py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Manage Products
            </h1>
            <p className="text-gray-500 text-lg mt-2">
              View, edit and delete your products.
            </p>
          </div>
          <Link href="/admin/products/create" className="bg-amber-600 hover:bg-amber-700 transition text-white px-6 py-3 rounded-xl font-semibold cursor-pointer">
            + Create Product
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-amber-100">
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Brand</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Stock</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Featured</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-amber-50 transition"
                  >
                    <td className="p-4">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={70}
                        height={70}
                        className="rounded-lg object-cover"
                      />
                    </td>

                    <td className="p-4 font-normal">{product.name}</td>

                    <td className="p-4">{product.brand}</td>

                    <td className="p-4">{product.price}</td>

                    <td className="p-4">{product.stock}</td>

                    <td className="p-4">{product.category.name}</td>

                    <td className="p-4">{product.featured ? "Yes" : "No"}</td>

                    <td className="p-4">
                      <div className="flex justify-center items-center gap-3">
                        <Link href={`/admin/products/${product._id}`}>
                            <button
                          type="button"
                          className="w-9 h-9 rounded-full bg-white hover:bg-amber-600 hover:text-white transition flex items-center justify-center cursor-pointer"
                        >
                            <MdEdit />
                            </button>
                        </Link>

                        <button
                          type="button"
                          onClick={()=>deleteProduct(product._id)}
                          className="w-9 h-9 rounded-full bg-white hover:bg-red-600 hover:text-white transition flex items-center justify-center cursor-pointer"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
