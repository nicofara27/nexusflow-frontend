interface BusinessAsideProps {
  category: string;
  name: string;
  address: string;
  statusText: string;
  onChooseService: () => void;
}

export default function BusinessAside({
  category,
  name,
  address,
  statusText,
  onChooseService,
}: BusinessAsideProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-xl border border-neutral-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <p className="text-sm font-medium text-primary">{category}</p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 xl:text-4xl">
          {name}
        </h1>

        <div className="mt-5 space-y-2 text-sm text-neutral-600">
          <p>{address}</p>

          <p>
            <span className="font-medium text-primary">Abierto</span>{" "}
            {statusText}
          </p>
        </div>
        <div className="my-6 border-t border-neutral-200" />

        <button
          type="button"
          onClick={onChooseService}
          className="w-full cursor-pointer rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Elegir un servicio
        </button>
      </div>
    </aside>
  );
}
