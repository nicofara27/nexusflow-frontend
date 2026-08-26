import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let active = true;

    const initializeAuth = async () => {
      const currentToken = useAuthStore.getState().token;

      if (currentToken) {
        if (active) {
          setInitialized(true);
        }
        return;
      }

      try {
        const response = await authService.refresh();

        if (active) {
          setAuth(response);
        }
      } catch {
        if (active) {
          useAuthStore.getState().clearAuth();
        }
      } finally {
        if (active) {
          setInitialized(true);
        }
      }
    };

    initializeAuth();

    return () => {
      active = false;
    };
  }, [setAuth]);

  if (!initialized) {
    return null;
  }

  return <>{children}</>;
}