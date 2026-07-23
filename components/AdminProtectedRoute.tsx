"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    if (user?.role !== "admin") {
      router.replace("/");
    }
  }, [loading, isLoggedIn, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || user?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}