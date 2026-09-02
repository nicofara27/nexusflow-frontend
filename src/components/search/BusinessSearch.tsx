import { useState } from "react";
import { useNavigate } from "react-router";

export default function BusinessSearch() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();
    if (!query) return;

    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex max-w-3xl flex-col gap-2 rounded-xl border border-white/70 bg-white p-2 shadow-lg shadow-[rgba(23,107,91,0.10)] sm:flex-row"
    >
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscá barberías, cortes, uñas, estética..."
        aria-label="Buscar emprendimientos o servicios"
        className="min-h-12 flex-1 rounded-lg bg-transparent px-4 text-sm text-neutral-950 outline-none placeholder:text-neutral-400"
      />
      <button
        type="submit"
        className="min-h-12 rounded-lg bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Buscar
      </button>
    </form>
  );
}
