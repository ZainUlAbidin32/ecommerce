"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function GuestRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (isLoggedIn) {
      router.replace("/");
    }
  }, [loading, isLoggedIn, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}