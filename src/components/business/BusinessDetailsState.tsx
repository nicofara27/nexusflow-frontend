import { ArrowLeft, Loader2, Store, TriangleAlert } from "lucide-react";

type BusinessDetailsStateProps = {
  type: "loading" | "not-found" | "error";
  onBack?: () => void;
};

export default function BusinessDetailsState({
  type,
  onBack,
}: BusinessDetailsStateProps) {
  if (type === "loading") {
    return (
      <main className="min-h-screen bg-neutral-50">
        <div className="page-container flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />

            <p className="mt-4 text-sm text-neutral-500">
              Cargando emprendimiento...
            </p>
          </div>
        </div>
      </main>
    );
  }

  const isNotFound = type === "not-found";

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="page-container flex min-h-[70vh] items-center justify-center">
        <section className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <div
            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
              isNotFound ? "bg-primary/10" : "bg-red-50"
            }`}
          >
            {isNotFound ? (
              <Store className="h-7 w-7 text-primary" />
            ) : (
              <TriangleAlert className="h-7 w-7 text-red-600" />
            )}
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-950">
            {isNotFound
              ? "Emprendimiento no encontrado"
              : "No pudimos cargar el emprendimiento"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-600">
            {isNotFound
              ? "El emprendimiento que estás buscando no existe o ya no está disponible."
              : "Ocurrió un problema al cargar la información. Intentá nuevamente más tarde."}
          </p>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>
          )}
        </section>
      </div>
    </main>
  );
}