import { Product } from "@/types/product";
import Image from "next/image";
export interface productCardProps {
    product: Product;
}
export default function ProductCard({product}: productCardProps) {
    return (
        <div>
            <Image width={100} height={100} src={product.images[0]} alt={product.name}/>
            <h2>{product.name}</h2>
            <p>{product.brand}</p>
            <p>Rs. {product.price}</p>
        </div>
    )
}