import mongoose, { models, Schema, Document } from "mongoose";

 export interface ICategory extends Document {
    name: string;
 }

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
    }, {
        timestamps: true,
    }
)

const Category = models.Category || mongoose.model<ICategory>("Category", categorySchema)

export default Category