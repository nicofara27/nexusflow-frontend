import type { InputHTMLAttributes } from "react";
import type { FieldError as RHFFieldError } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: RHFFieldError;
}

export default function FormInput({
  label,
  error,
  id,
  ...props
}: FormInputProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <Input id={id} aria-invalid={!!error} {...props} />

      <div className="min-h-4 mb-2">
        {error && <FieldError className="text-xs" errors={[error]} />}
      </div>
    </Field>
  );
}
