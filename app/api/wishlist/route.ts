import {
  addToWishlistController,
  getWishlistController,
} from "@/controllers/wishlist.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getWishlistController(req);
}

export async function POST(req: NextRequest) {
  return addToWishlistController(req);
}