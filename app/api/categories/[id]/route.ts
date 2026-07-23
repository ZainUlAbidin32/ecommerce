import {
  deleteCategoryController,
  updateCategoryController,
} from "@/controllers/category.controller";
import { authorizeAdmin } from "@/lib/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await authorizeAdmin(req);

    const { id } = await params;

    return updateCategoryController(req, id);
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: err.message.startsWith("Forbidden") ? 403 : 401,
      }
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

    return deleteCategoryController(req, id);
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: err.message.startsWith("Forbidden") ? 403 : 401,
      }
    );
  }
}