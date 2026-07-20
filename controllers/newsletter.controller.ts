import { subscribeNewsletter } from "@/services/newsletter.service";
import { NextRequest, NextResponse } from "next/server";

export const subscribeNewsletterController = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    const trimmedEmail= email?.trim()

    if (!trimmedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 },
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    const subscriber = await subscribeNewsletter(email.trim());

    return NextResponse.json(
      {
        success: true,
        message: "Subscribed successfully.",
        subscriber,
      },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 400 },
    );
  }
};
