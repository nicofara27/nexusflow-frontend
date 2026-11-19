import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import { passwordSchema } from "@/schemas/auth.schema";

import type { ChangePasswordRequest } from "@/types/auth.types";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Ingresá tu contraseña actual."),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Confirmá la nueva contraseña."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "La nueva contraseña debe ser diferente a la actual.",
    path: ["newPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface ChangePasswordFormProps {
  onSave: (data: ChangePasswordRequest) => Promise<void>;
}

export default function ChangePasswordForm({
  onSave,
}: ChangePasswordFormProps) {
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: ChangePasswordFormData) => {
    try {
      form.clearErrors("root");

      await onSave({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      form.reset();
    } catch (error) {
      const message = axios.isAxiosError<{ detail?: string }>(error)
        ? error.response?.data?.detail
        : undefined;

      form.setError("root", {
        message:
          message ?? "No se pudo cambiar la contraseña. Intentá nuevamente.",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 space-y-4">
      <FormInput
        {...form.register("currentPassword")}
        id="current-password"
        label="Contraseña actual"
        type="password"
        autoComplete="current-password"
        disabled={form.formState.isSubmitting}
        error={form.formState.errors.currentPassword}
      />

      <FormInput
        {...form.register("newPassword")}
        id="new-password"
        label="Nueva contraseña"
        type="password"
        autoComplete="new-password"
        disabled={form.formState.isSubmitting}
        error={form.formState.errors.newPassword}
      />

      <FormInput
        {...form.register("confirmPassword")}
        id="confirm-password"
        label="Confirmar nueva contraseña"
        type="password"
        autoComplete="new-password"
        disabled={form.formState.isSubmitting}
        error={form.formState.errors.confirmPassword}
      />

      <p className="text-xs text-neutral-500">
        La nueva contraseña debe tener al menos 8 caracteres.
      </p>

      {form.formState.errors.root && (
        <p role="alert" className="text-sm text-red-600">
          {form.formState.errors.root.message}
        </p>
      )}

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? "Actualizando..."
            : "Cambiar contraseña"}
        </Button>
      </div>
    </form>
  );
}
