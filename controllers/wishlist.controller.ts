import { NextRequest, NextResponse } from "next/server";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/services/wishlist.service";
import { authenticateUser } from "@/lib/authMiddleware";

export const getWishlistController = async (req: NextRequest) => {
  try {
    const userId = authenticateUser(req);

    const wishlist = await getWishlist(userId);

    return NextResponse.json(
      {
        success: true,
        wishlist,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 401 }
    );
  }
};

export const addToWishlistController = async (req: NextRequest) => {
  try {
    const userId = authenticateUser(req);

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required",
        },
        { status: 400 }
      );
    }

    const wishlist = await addToWishlist(userId, productId);

    return NextResponse.json(
      {
        success: true,
        message: "Product added to wishlist",
        wishlist,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 400 }
    );
  }
};

export const removeFromWishlistController = async (req: NextRequest, productId: string) => {
  try {
    const userId = authenticateUser(req);

    const wishlist = await removeFromWishlist(userId, productId);

    return NextResponse.json(
      {
        success: true,
        message: "Product removed from wishlist",
        wishlist,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 400 }
    );
  }
};