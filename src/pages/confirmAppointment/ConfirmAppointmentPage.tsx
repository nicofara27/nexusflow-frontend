import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router";
import ConfirmationCard, {
  type ConfirmationStatus,
} from "@/components/appointment/ConfirmationCard";
import { appointmentService } from "@/services/appointment.service";

export default function ConfirmAppointmentPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] =
    useState<ConfirmationStatus>("idle");

  const [error, setError] = useState<string | null>(null);
  const [canRetry, setCanRetry] = useState(false);

  const handleConfirm = async () => {
    if (!token) {
      setError("El enlace de confirmación no es válido.");
      setCanRetry(false);
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");
      setError(null);
      setCanRetry(false);

      await appointmentService.confirmAppointment(token);

      setStatus("success");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setError(
            "El enlace de confirmación no es válido o ya fue utilizado."
          );
          setCanRetry(false);
        } else if (error.response?.status === 400) {
          setError(
            "El enlace de confirmación expiró o el turno ya no puede confirmarse."
          );
          setCanRetry(false);
        } else {
          setError(
            "Ocurrió un error al confirmar el turno. Intentá nuevamente."
          );
          setCanRetry(true);
        }
      } else {
        setError(
          "Ocurrió un error al confirmar el turno. Intentá nuevamente."
        );
        setCanRetry(true);
      }

      setStatus("error");
    }
  };

  return (
    <ConfirmationCard
      status={token ? status : "error"}
      error={
        token
          ? error
          : "No encontramos un token de confirmación en este enlace."
      }
      canRetry={token ? canRetry : false}
      onConfirm={handleConfirm}
    />
  );
}