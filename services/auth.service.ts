import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "@/lib/mail";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  await connectDB();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationOTP = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();
  const verificationOTPExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verificationOTP,
    verificationOTPExpiry,
  });
  await sendEmail({
    email: user.email,
    otp: verificationOTP,
    emailType: "VERIFY",
  });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email or Password");
  }
  if (!user.isVerified) {
    throw new Error("Please Verify Your Email First");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid Email or Password");
  }
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  return { user, token };
};

export const getProfile = async (userId: string) => {
  await connectDB();
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const verifyOTP = async (
    email: string,
    otp: string
) => {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    if (user.verificationOTP !== otp) {
        throw new Error("Invalid OTP");
    }

    if (
        !user.verificationOTPExpiry ||
        user.verificationOTPExpiry < new Date()
    ) {
        throw new Error("OTP has expired");
    }

    user.isVerified = true;
    user.verificationOTP = undefined;
    user.verificationOTPExpiry = undefined;

    await user.save();

    return user;
};

export const resendOTP = async (email: string) => {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    if (user.isVerified) {
        throw new Error("Email is already verified");
    }

    const verificationOTP = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const verificationOTPExpiry = new Date(
        Date.now() + 10 * 60 * 1000
    );

    user.verificationOTP = verificationOTP;
    user.verificationOTPExpiry = verificationOTPExpiry;

    await user.save();

    await sendEmail({
        email: user.email,
        otp: verificationOTP,
        emailType: "VERIFY",
    });

    return {
        message: "OTP sent successfully",
    };
};

export const forgotPassword = async (email: string) => {
  await connectDB();
  const user = await User.findOne({ email });
  if (!user)
    return {
      message:
        "If an account with that email exists, a password reset link has been sent.",
    };
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordToken = hashedToken;
  user.resetPasswordTokenExpiry = new Date(Date.now() + 1000 * 60 * 15);
  await user.save();
  await sendEmail({
    email: email,
    token: resetToken,
    emailType: "RESET",
  });
  return {
    message: "Password reset email sent successfully.",
  };
};

export const resetPassword = async (token: string, password: string) => {
  await connectDB();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({ resetPasswordToken: hashedToken });
  if (!user) {
    throw new Error("Invalid reset token");
  }
  if (
    !user.resetPasswordTokenExpiry ||
    user.resetPasswordTokenExpiry < new Date()
  ) {
    throw new Error("The Reset Link has expired");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiry = undefined;
  await user.save();
  return {
    message: "Password reset successfully",
  };
};
