import { useState } from "react";

import ChangePasswordForm from "@/components/security/ChangePasswordForm";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

import type { ChangePasswordRequest } from "@/types/auth.types";

export default function SecurityPage() {
  const [success, setSuccess] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleChangePassword = async (data: ChangePasswordRequest) => {
    setSuccess(false);

    const response = await authService.changePassword(data);

    setAuth(response);

    setSuccess(true);
  };

  return (
    <main className="p-6 lg:p-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-neutral-950">Seguridad</h1>

        <p className="mt-2 text-neutral-600">
          Administrá la seguridad de tu cuenta.
        </p>

        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-950">
            Cambiar contraseña
          </h2>

          <p className="mt-2 text-sm text-neutral-600">
            Ingresá tu contraseña actual y elegí una nueva.
          </p>

          {success && (
            <p role="status" className="mt-4 text-sm text-green-700">
              Tu contraseña se actualizó correctamente.
            </p>
          )}

          <ChangePasswordForm onSave={handleChangePassword} />
        </section>
      </div>
    </main>
  );
}
