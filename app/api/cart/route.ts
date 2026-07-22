import { addToCartController, getCartController, removeFromCartController, updateCartQuantityController } from "@/controllers/cart.controllers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return addToCartController(req);
}

export async function GET(req: NextRequest) {
  return getCartController(req);
}

export async function PATCH(req: NextRequest) {
  return updateCartQuantityController(req);
}

export async function DELETE(req: NextRequest) {
  return removeFromCartController(req);
}