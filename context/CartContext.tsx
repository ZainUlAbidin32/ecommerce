"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axiosInstance from "@/lib/axios";

interface CartProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
  stock: number;
}

interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface Cart {
  user: string;
  items: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  cartCount: number;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  resetCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/cart");

      setCart(response.data.cart);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    const response = await axiosInstance.post("/cart", {
      productId,
      quantity,
    });

    setCart(response.data.cart);
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const response = await axiosInstance.patch("/cart", {
      productId,
      quantity,
    });

    setCart(response.data.cart);
  };

  const removeFromCart = async (productId: string) => {
    const response = await axiosInstance.delete("/cart", {
      data: {
        productId,
      },
    });

    setCart(response.data.cart);
  };

  const clearCart = async () => {
    await axiosInstance.delete("/cart/clear");

    setCart((prev) =>
      prev
        ? {
            ...prev,
            items: [],
          }
        : null,
    );
  };

  const resetCart = () => {
  setCart(null);
};

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, []);

  const cartCount =
    cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        resetCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
