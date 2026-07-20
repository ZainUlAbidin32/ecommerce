import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { FaBolt } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

export interface productCardProps {
  product: Product;
}
export default function ProductCard({ product }: productCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <span className="absolute top-5 left-3 uppercase rounded-full bg-yellow-600 px-3 py-1 text-xs font-semibold text-white shadow">
          {product.brand}
        </span>

        <button
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow backdrop-blur transition hover:bg-yellow-600 hover:text-white cursor-pointer"
          aria-label="Add to Wishlist"
        >
          <FiHeart size={18} />
        </button>
      </div>

      <div className="flex h-73 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-600">
          {product.category.name}
        </p>

        <Link href={`/products/${product._id}`}>
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900 transition group-hover:text-yellow-600">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        <div className="mt-auto">
          <hr className="mb-4 border-gray-200" />
          <div className="mb-4 flex items-center justify-between">
            <p className="text-2xl font-bold text-yellow-600">
              ${product.price.toFixed(2)}
            </p>

            {product.stock > 0 ? (
              <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                <FaBolt size={15} />
                <span>{product.stock} Left</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                <FaBolt size={15} />
                <span>Out of Stock</span>
              </div>
            )}
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 font-medium text-white transition hover:bg-yellow-600 cursor-pointer">
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
