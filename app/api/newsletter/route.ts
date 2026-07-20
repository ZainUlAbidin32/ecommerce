import { NextRequest } from "next/server";
import { subscribeNewsletterController } from "@/controllers/newsletter.controller";

export async function POST(req: NextRequest) {
  return subscribeNewsletterController(req);
}