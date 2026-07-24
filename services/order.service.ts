import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Product from "@/models/Product";

interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export const createOrder = async (
  userId: string,
  shippingAddress: ShippingAddress,
) => {
  await connectDB();

  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    throw new Error("Your cart is empty");
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `Not enough stock available for ${product.name}`,
      );
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: item.quantity,
    });

    totalAmount += product.price * item.quantity;

    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    user: userId,
    items: orderItems,
    shippingAddress,
    totalAmount,
  });

  cart.items = [];
  await cart.save();

  return order;
};

export const getUserOrders = async (userId: string) => {
  await connectDB();

  const orders = await Order.find({ user: userId })
    .populate("items.product")
    .sort({ createdAt: -1 });

  return orders;
};

export const cancelOrder = async (
  userId: string,
  orderId: string,
) => {
  await connectDB();

  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (
    order.status === "shipped" ||
    order.status === "delivered" ||
    order.status === "cancelled"
  ) {
    throw new Error("This order cannot be cancelled");
  }

  order.status = "cancelled";
  await order.save();
  return order;
};