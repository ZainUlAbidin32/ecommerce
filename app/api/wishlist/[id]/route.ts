import { removeFromWishlistController } from "@/controllers/wishlist.controller";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return removeFromWishlistController(req, id);
}