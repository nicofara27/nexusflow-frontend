import { Link } from "react-router";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
} from "lucide-react";

export type ConfirmationStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type ConfirmationCardProps = {
  status: ConfirmationStatus;
  error: string | null;
  canRetry: boolean;
  onConfirm: () => void;
};

export default function ConfirmationCard({
  status,
  error,
  canRetry,
  onConfirm,
}: ConfirmationCardProps) {
  const isSuccess = status === "success";
  const isError = status === "error";

  const title = isSuccess
    ? "Turno confirmado"
    : isError
      ? "No pudimos confirmar el turno"
      : "Confirmá tu turno";

  const description = isSuccess
    ? "Tu turno fue confirmado correctamente. Ya quedó reservado con el profesional."
    : isError
      ? error
      : "Tu reserva está pendiente de confirmación. Presioná el botón para confirmar el turno.";

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <div
          className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${
            isError ? "bg-red-50" : "bg-primary/10"
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-7 w-7 text-primary" />
          ) : isError ? (
            <AlertCircle className="h-7 w-7 text-red-600" />
          ) : (
            <Mail className="h-7 w-7 text-primary" />
          )}
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-600">
          {description}
        </p>

        {!isSuccess && (!isError || canRetry) && (
          <button
            type="button"
            onClick={onConfirm}
            disabled={status === "loading"}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}

            {status === "loading"
              ? "Confirmando..."
              : isError
                ? "Intentar nuevamente"
                : "Confirmar turno"}
          </button>
        )}

        <Link
          to="/"
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}