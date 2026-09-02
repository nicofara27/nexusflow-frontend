import { Link, useNavigate } from "react-router";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export default function PublicNavbar() {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      clearAuth();
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-neutral-950"
        >
          NexusFlow
        </Link>

        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-neutral-600 sm:block">
                Hola, {user.firstName}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Iniciar sesión
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-hover)]"
              >
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}