import { cancelOrderController } from "@/controllers/order.controller";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return cancelOrderController(req, id);
}