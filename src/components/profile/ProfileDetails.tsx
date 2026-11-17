import type { UserProfileResponse } from "@/types/user.types";

interface ProfileDetailsProps {
  profile: UserProfileResponse;
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
  return (
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
  );
}
