import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import categoryImages from "@/lib/categoryImages";

interface CategoryCardProps {
  id: string;
  name: string;
  productCount: number;
}

export default function CategoryCard({
  id,
  name,
  productCount,
}: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${id}`}
      className="group relative overflow-hidden rounded-2xl h-80 block"
    >
      <Image
        src={categoryImages[name] ?? categoryImages.default}
        alt={name}
        fill
        className="object-cover transition duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold">{name}</h3>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-gray-200">
            {productCount} Products
          </p>

          <FaArrowRight className="transition group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
}