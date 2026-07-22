import { clearCartController } from "@/controllers/cart.controllers";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  return clearCartController(req);
}