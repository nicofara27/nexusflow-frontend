import { useAuthStore } from "@/store/auth.store";
import type { BusinessRole } from "@/types/auth.types";
import { Navigate, Outlet } from "react-router";

type ProtectedRouteProps = {
  allowedRoles?: BusinessRole[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    (!user?.businessRole || !allowedRoles.includes(user.businessRole))
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
