import {
  deleteProductController,
  getProductByIdController,
  updateProductController,
} from "@/controllers/product.controller";
import { authorizeAdmin } from "@/lib/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await authorizeAdmin(req);

    const { id } = await params;

    return updateProductController(req, id);
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await authorizeAdmin(req);

    const { id } = await params;

    return deleteProductController(id);
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return getProductByIdController(id);
}