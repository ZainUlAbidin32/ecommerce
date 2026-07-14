import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export const createCategory = async (name: string) => {
  await connectDB();
  const existingCategory = await Category.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  });
  if (existingCategory) {
    throw new Error("Ctaegory already exists");
  }
  const category = await Category.create({ name });
  return category;
};

export const getCategories = async() => {
    await connectDB()
    const categories = await Category.find().select("-__v").sort({createdAt: -1})
    return categories
}

export const updateCategory = async (
    id: string,
    name: string,
) => {
    await connectDB()
    const category = await Category.findById(id)
    if (!category) {
        throw new  Error( "Category doesn't exist")
    }
    const existingCategory = await Category.findOne({
        name: {$regex: new RegExp(`^${name}$`,'i')},
        _id: {$ne: id}
    })
    if(existingCategory){
        throw new Error("Category with name already exists")
    }
    category.name = name
    await category.save()
    return category
}

export const deleteCategory = async(id: string) => {
    await connectDB()
    const category = await Category.findById(id)
    if (!category) {
        throw new Error("Category doesn't exists")
    }
    await category.deleteOne()
    return {
        message: "Category deleted successfully.",
    }
}