import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import ProfileDetails from "@/components/profile/ProfileDetails";
import ProfileEditForm from "@/components/profile/ProfileEditForm";

import { userService } from "@/services/user.service";
import { useAuthStore } from "@/store/auth.store";

import type {
  UserProfileResponse,
  UpdateProfileRequest,
} from "@/types/user.types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const updateAuthProfile = useAuthStore((state) => state.updateProfile);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
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

  const handleSave = async (data: UpdateProfileRequest) => {
    const updated = await userService.updateProfile(data);

    setProfile((current) => (current ? { ...current, ...updated } : current));

    updateAuthProfile(updated.firstName, updated.lastName);

    setIsEditing(false);
    setSuccess("Tus datos se actualizaron correctamente.");
  };

  const handleEdit = () => {
    setSuccess("");
    setIsEditing(true);
  };

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
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Información personal</h2>

              {!isEditing && (
                <Button type="button"  onClick={handleEdit}>
                  Editar
                </Button>
              )}
            </div>

            {success && (
              <p role="status" className="mt-4 text-sm text-green-700">
                {success}
              </p>
            )}

            {isEditing ? (
              <ProfileEditForm
                profile={profile}
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <ProfileDetails profile={profile} />
            )}
          </section>
        ) : null}
      </div>
    </main>
  );
}