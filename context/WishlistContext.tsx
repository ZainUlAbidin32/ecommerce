"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axiosInstance from "@/lib/axios";

interface WishlistProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
  brand: string;
  stock: number;
}

interface WishlistItem {
  product: WishlistProduct;
}

interface Wishlist {
  user: string;
  items: WishlistItem[];
}

interface WishlistContextType {
  wishlist: Wishlist | null;
  loading: boolean;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  resetWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/wishlist");

      setWishlist(response.data.wishlist);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    const response = await axiosInstance.post("/wishlist", {
      productId,
    });

    setWishlist(response.data.wishlist);
  };

  const removeFromWishlist = async (productId: string) => {
    const response = await axiosInstance.delete(`/wishlist/${productId}`);

    setWishlist(response.data.wishlist);
  };

  const isInWishlist = (productId: string) => {
    return (
      wishlist?.items.some(
        (item) => item.product._id === productId,
      ) ?? false
    );
  };

  const resetWishlist = () => {
    setWishlist(null);
  };

  const wishlistCount = wishlist?.items.length ?? 0;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        resetWishlist,
        wishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}