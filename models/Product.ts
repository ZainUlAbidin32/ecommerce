import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  featured: boolean;
  images: string[];
  category: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  images: [
    {
        type: String,
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
}, {timestamps: true});

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema)
export default Product