import { authenticateUser } from "@/lib/authMiddleware";
import { addToCart, clearCart, getCart, removeFromCart, updateCartQuantity } from "@/services/cart.service";
import { NextRequest, NextResponse } from "next/server";

export const addToCartController = async(req: NextRequest) => {
    try{
        const userId = authenticateUser(req)
        const {productId, quantity} = await req.json()
        if(!productId || !quantity){
            return NextResponse.json({
                success: false,
                message: "Product ID and quantity are required",
            }, {status: 400})
        }
        const cart = await addToCart(userId, productId, quantity)
        return NextResponse.json({
            success: true,
            message: "Product added to cart successfully.",
            cart,
        }, {status: 200})
    } catch (err:any) {
        return NextResponse.json({
            success: false,
            message: err.message
        }, {status:400})
    }
}

export const getCartController = async (req: NextRequest) => {
    try {
        const userId = authenticateUser(req)
        const cart = await getCart(userId)
        return NextResponse.json({
            success: true,
            cart,
        }, {status: 200})
    } catch (err:any) {
        return NextResponse.json({
            success: false,
            message: err.message
        }, {status: 400})
    }
}

export const updateCartQuantityController = async (req: NextRequest) => {
  try {
    const userId = authenticateUser(req);
    const { productId, quantity } = await req.json();
    if (!productId || quantity === undefined) {
      return NextResponse.json({
          success: false,
          message: "Product ID and quantity are required",
        },{ status: 400 });
    }
    const cart = await updateCartQuantity(userId,productId,quantity)
    return NextResponse.json({
        success: true,
        message: "Cart quantity updated successfully",
        cart,
      },{ status: 200 })
  } catch (err: any) {
    return NextResponse.json({
        success: false,
        message: err.message,
      },{ status: 400 });
  }
}

export const removeFromCartController = async (req: NextRequest) => {
  try {
    const userId = authenticateUser(req);
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required",
        },
        { status: 400 },
      );
    }
    const cart = await removeFromCart(userId, productId); 
    return NextResponse.json({
        success: true,
        message: "Product removed from cart successfully",
        cart,
      },{ status: 200 });
  } catch (err: any) {
    return NextResponse.json({
        success: false,
        message: err.message,
      },{ status: 400 });
  }
};

export const clearCartController = async (req: NextRequest) => {
  try {
    const userId = authenticateUser(req);
    const response = await clearCart(userId); 

    return NextResponse.json({
        success: true,
        message: response.message,
      },{ status: 200 });
  } catch (err: any) {
    return NextResponse.json({
        success: false,
        message: err.message,
      },{ status: 400 });
  }
}