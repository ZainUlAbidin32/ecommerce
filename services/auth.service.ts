import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import { sendVerificationEmail } from "@/lib/mail";


export const registerUser = async(
    name: string, email: string, password: string
) =>{
    await connectDB();
    const existingUser = await User.findOne({email})
    if (existingUser){
        throw new Error("User already exists")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const verificationToken = crypto.randomBytes(32).toString("hex")
    const verificationTokenExpiry = new Date(
        Date.now() + 24*60*60*1000 
    )
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiry
    })
    await sendVerificationEmail(user.email,verificationToken)
    return user;
}

export const loginUser = async (
    email:string,
    password:string,
) =>{
    await connectDB()
    const user = await  User.findOne({email})
    if(!user) {
        throw new Error("Invalid Email or Password")
    }
    if (!user.isVerified) {
        throw new Error ("Please Verify Your Email First")
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch){
        throw new Error ("Invalid Email or Password")
    }
    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "7d",
        }
    )

    return {user,token};
}

export const getProfile = async(userId: string) => {
        await connectDB();
        const user = await User.findById(userId)
        if (!user){
            throw new Error("User not found")
        }
        return user
}

export const verifyEmail = async(token: string) => {
    await connectDB()
    const user = await User.findOne({verificationToken: token})
    if (!user) {
        throw new Error ("Invalid Token")
    }
    if (user.verificationTokenExpiry < new Date()){
        throw new Error ("Verification Token has expired")
    }
    user.isVerified= true
    user.verificationToken= ''
    user.verificationTokenExpiry= undefined
    await user.save()
    return user
}