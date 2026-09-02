import BusinessCard from "@/components/business/BusinessCard";
import BusinessSearch from "@/components/search/BusinessSearch";
import { useSearchParams } from "react-router";

const businesses = [
  {
    id: "1",
    name: "Nombre del emprendimiento",
    category: "Barbería",
    address: "San Miguel de Tucumán",
  },
  {
    id: "2",
    name: "Nombre del emprendimiento",
    category: "Estética",
    address: "San Miguel de Tucumán",
  },
  {
    id: "3",
    name: "Nombre del emprendimiento",
    category: "Peluquería",
    address: "San Miguel de Tucumán",
  },
];

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");
  const category = searchParams.get("category");

  const searchTitle = query
    ? `Resultados para "${query}"`
    : category
      ? "Emprendimientos"
      : "Explorá emprendimientos";

  return (
    <main className="page-container py-10 md:py-14">
      <div className="max-w-3xl">
        <BusinessSearch />
      </div>

      <section className="mt-12">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
          {searchTitle}
        </h1>

        <p className="mt-2 text-neutral-600">
          Encontrá servicios y emprendimientos en San Miguel de Tucumán.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard
              key={business.id}
              id={business.id}
              name={business.name}
              category={business.category}
              address={business.address}
            />
          ))}
        </div>
      </section>
    </main>
  );
}