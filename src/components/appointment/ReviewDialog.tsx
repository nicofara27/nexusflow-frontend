import { useState, type SubmitEvent } from "react";
import { Star } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ReviewDialogProps {
  businessName: string;
  onSubmit: (rating: number, comment: string | null) => Promise<void>;
}

export default function ReviewDialog({
  businessName,
  onSubmit,
}: ReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (rating === 0 || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError("");

      await onSubmit(rating, comment.trim() || null);

      setOpen(false);
    } catch {
      setError("No se pudo guardar la reseña. Intentá nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer text-sm font-medium text-primary hover:underline"
      >
        Dejar reseña
      </button>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!isSubmitting) setOpen(nextOpen);
        }}
      >
        <DialogContent showCloseButton={!isSubmitting}>
          <DialogHeader>
            <DialogTitle>Dejar una reseña</DialogTitle>
            <DialogDescription>
              Contanos cómo fue tu experiencia en {businessName}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-3 text-sm font-medium">
                ¿Cómo calificarías el servicio?
              </p>

              <div
                className="flex gap-2"
                role="group"
                aria-label="Calificación"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`${value} ${value === 1 ? "estrella" : "estrellas"}`}
                    aria-pressed={rating === value}
                    onClick={() => setRating(value)}
                    disabled={isSubmitting}
                    className="cursor-pointer disabled:opacity-50"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        value <= rating ? "text-amber-500" : "text-neutral-300"
                      }`}
                      fill={value <= rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="review-comment"
                className="mb-2 block text-sm font-medium"
              >
                Comentario (opcional)
              </label>

              <textarea
                id="review-comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                maxLength={1000}
                rows={4}
                disabled={isSubmitting}
                placeholder="Contanos sobre tu experiencia..."
                className="w-full resize-none rounded-lg border border-neutral-200 p-3 text-sm outline-none focus:border-primary disabled:opacity-50"
              />

              <p className="mt-1 text-right text-xs text-neutral-500">
                {comment.length}/1000
              </p>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <DialogFooter>
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
                className="cursor-pointer rounded-lg border border-neutral-200 px-4 py-2 text-sm disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={rating === 0 || isSubmitting}
                className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Publicar reseña"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}