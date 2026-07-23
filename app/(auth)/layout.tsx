import GuestRoute from "@/components/GuestRoute";
import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <GuestRoute>{children}</GuestRoute>;
}