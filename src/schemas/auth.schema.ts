import * as z from "zod";

export const personNameSchema = z
  .string()
  .trim()
  .min(2, "Mínimo  2 caracteres.")
  .max(50, "Máximo 50 caracteres.")
  .regex(
    /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u,
    "Solo se permiten letras, espacios, apóstrofes y guiones.",
  );

export const emailSchema = z.email("Ingresa un email válido.");

export const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres.");

export const registerFormSchema = z.object({
  firstName: personNameSchema,
  lastName: personNameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
