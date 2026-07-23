import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminProtectedRoute>
      {children}
    </AdminProtectedRoute>
  );
}