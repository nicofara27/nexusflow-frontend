import { Link, useNavigate } from "react-router";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export default function AppNavbar() {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      clearAuth();
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold">
          NexusFlow
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <span>
              {user.firstName} {user.lastName}
            </span>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  );
}