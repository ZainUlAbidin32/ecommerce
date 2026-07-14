import { createCategoryController, getCategoryController } from "@/controllers/category.controller";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    return createCategoryController(req)
}

export async function GET() {
    return getCategoryController()
}