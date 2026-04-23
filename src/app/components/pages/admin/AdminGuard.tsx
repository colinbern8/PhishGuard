import { Navigate } from "react-router";
import { getCurrentUserRole } from "../../../lib/auth";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const role = getCurrentUserRole();
  if (role !== "admin") return <Navigate to="/app" replace />;
  return <>{children}</>;
}

