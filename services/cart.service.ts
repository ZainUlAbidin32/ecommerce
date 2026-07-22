import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import Product from "@/models/Product";

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  await connectDB();
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found.");
  }
  if (product.stock < quantity) {
    throw new Error("Not enough stock available.");
  }
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [
        {
          product: productId,
          quantity,
        },
      ],
    });
    return await cart.populate("items.product")
  }
  const existingItem = cart.items.find((item: { product: string; quantity: number })=>item.product.toString()===productId)
  if (existingItem){
    const newQuantity = existingItem.quantity + quantity
    if (newQuantity>product.stock){
        throw new Error("Not enough Stock available")
    }
    existingItem.quantity = newQuantity
  } else {
    cart.items.push({
        product: productId,
        quantity
    })
  }
  await cart.save()
  return await cart.populate("items.product")
};


export const getCart = async (userId: string) => {
    await connectDB()
    const cart = await Cart.findOne({user: userId}).populate("items.product")
    if(!cart) {
        return {
            user: userId,
            items: []
        }
    }
    return cart
}

export const updateCartQuantity = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  await connectDB();

  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item: { product: string; quantity: number }) => item.product.toString() === productId,
  );

  if (!item) {
    throw new Error("Product not found in cart");
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (quantity > product.stock) {
    throw new Error("Not enough stock available");
  }

  item.quantity = quantity;
  await cart.save();
  return await cart.populate("items.product");
};

export const removeFromCart = async (
  userId: string,
  productId: string,
) => {
  await connectDB();

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const itemExists = cart.items.some(
    (item: { product: string; quantity: number }) => item.product.toString() === productId,
  );

  if (!itemExists) {
    throw new Error("Product not found in cart");
  }

  cart.items = cart.items.filter(
    (item: { product: string; quantity: number }) => item.product.toString() !== productId,
  );
  await cart.save();
  return await cart.populate("items.product");
};

export const clearCart = async (userId: string) => {
  await connectDB();
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];
  await cart.save();
  return {
    message: "Cart cleared successfully",
  };
};