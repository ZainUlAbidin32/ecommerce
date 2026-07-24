import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/authMiddleware";
import { cancelOrder, createOrder, getUserOrders } from "@/services/order.service";

export const createOrderController = async (req: NextRequest) => {
  try {
    const userId = authenticateUser(req);

    const shippingAddress = await req.json();

    const order = await createOrder(userId, shippingAddress);

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order,
      },
      { status: 201 }
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

export const getUserOrdersController = async (req: NextRequest) => {
  try {
    const userId = authenticateUser(req);
    const orders = await getUserOrders(userId);
    return NextResponse.json(
      {
        success: true,
        orders,
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

export const cancelOrderController = async (
  req: NextRequest,
  orderId: string,
) => {
  try {
    const userId = authenticateUser(req);
    const order = await cancelOrder(userId, orderId);
    return NextResponse.json(
      {
        success: true,
        message: "Order cancelled successfully",
        order,
      },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 400 },
    );
  }
};