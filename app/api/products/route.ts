import {
  createProductController,
  getProductsController,
} from "@/controllers/product.controller";
import { authorizeAdmin } from "@/lib/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await authorizeAdmin(req);
    return createProductController(req);
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: err.message.startsWith("Forbidden") ? 403 : 401 }
    );
  }
}

export async function GET(req: NextRequest) {
  return getProductsController(req);
}