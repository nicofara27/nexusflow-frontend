import { useEffect, useState } from "react";

import { userService } from "@/services/user.service";
import type { UserProfileResponse } from "@/types/user.types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        setError("");

        const data = await userService.getProfile();

        if (active) {
          setProfile(data);
        }
      } catch {
        if (active) {
          setError("No se pudo cargar el perfil.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="p-6 lg:p-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-neutral-950">Mi perfil</h1>

        <p className="mt-2 text-neutral-600">
          Consultá y administrá tus datos personales.
        </p>

        {isLoading ? (
          <p className="mt-8 text-sm text-neutral-500">Cargando perfil...</p>
        ) : error ? (
          <p role="alert" className="mt-8 text-sm text-red-600">
            {error}
          </p>
        ) : profile ? (
          <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Información personal</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-neutral-500">Nombre</p>
                <p className="mt-1 font-medium">{profile.firstName}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">Apellido</p>
                <p className="mt-1 font-medium">{profile.lastName}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm text-neutral-500">Correo electrónico</p>
                <p className="mt-1 font-medium">{profile.email}</p>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
