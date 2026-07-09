import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const registerUser = async(
    name: string, email: string, password: string
) =>{
    console.log("1. Service started");
    await connectDB();
    console.log("2. Database connected");
    const existingUser = await User.findOne({email})
    console.log("3. Checked existing user");
    if (existingUser){
        throw new Error("User already exists")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    return user;
}