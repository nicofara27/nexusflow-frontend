import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/forms/FormInput";
import { personNameSchema } from "@/schemas/auth.schema";

import type {
  UpdateProfileRequest,
  UserProfileResponse,
} from "@/types/user.types";

const profileSchema = z.object({
  firstName: personNameSchema,
  lastName: personNameSchema,
});

interface ProfileEditFormProps {
  profile: UserProfileResponse;
  onSave: (data: UpdateProfileRequest) => Promise<void>;
  onCancel: () => void;
}

export default function ProfileEditForm({
  profile,
  onSave,
  onCancel,
}: ProfileEditFormProps) {
  const form = useForm<UpdateProfileRequest>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
    },
  });

  const handleSubmit = async (data: UpdateProfileRequest) => {
    try {
      form.clearErrors("root");
      await onSave(data);
    } catch {
      form.setError("root", {
        message: "No se pudieron guardar los cambios. Intentá nuevamente.",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          {...form.register("firstName")}
          id="profile-first-name"
          label="Nombre"
          autoComplete="given-name"
          disabled={form.formState.isSubmitting}
          error={form.formState.errors.firstName}
        />

        <FormInput
          {...form.register("lastName")}
          id="profile-last-name"
          label="Apellido"
          autoComplete="family-name"
          disabled={form.formState.isSubmitting}
          error={form.formState.errors.lastName}
        />
      </div>

      <div className="mt-2">
        <p className="text-sm text-neutral-500">Correo electrónico</p>
        <p className="mt-1 font-medium">{profile.email}</p>
      </div>

      {form.formState.errors.root && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {form.formState.errors.root.message}
        </p>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={form.formState.isSubmitting}
        >
          Cancelar
        </Button>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}
