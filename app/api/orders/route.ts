import { createOrderController, getUserOrdersController } from "@/controllers/order.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return createOrderController(req);
}

export async function GET(req: NextRequest) {
  return getUserOrdersController(req);
}