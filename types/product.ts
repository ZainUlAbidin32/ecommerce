export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    brand: string;
    featured: boolean;
    images: string[];
    category: {
        _id: string;
        name: string;
    }
}