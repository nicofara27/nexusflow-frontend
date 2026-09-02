import BusinessCard from "@/components/business/BusinessCard";
import BusinessCategories from "@/components/business/BusinessCategories";
import BusinessSearch from "@/components/search/BusinessSearch";

const featuredBusinesses = [
  {
    id: "1",
    name: "Estetica Asdasd",
    category: "Barbería",
    address: "Laprida 1439",
  },
  {
    id: "2",
    name: "Rocky’s ",
    category: "Estética",
    address: "Laprida 1439",
  },
  {
    id: "3",
    name: "Akuma",
    category: "Peluquería",
    address: "Laprida 1439",
  },
];
export default function HomePage() {
  return (
    <main>
      <div className="marketplace-background relative isolate overflow-hidden">
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M-100 180 C250 40 480 320 820 180 C1100 60 1280 120 1540 20"
            stroke="currentColor"
            className="text-emerald-700/15"
            strokeWidth="2"
          />
          <path
            d="M-120 420 C220 260 470 550 850 390 C1120 275 1320 330 1540 240"
            stroke="currentColor"
            className="text-emerald-600/12"
            strokeWidth="2"
          />
          <path
            d="M-80 690 C280 510 540 760 900 620 C1160 520 1370 560 1530 500"
            stroke="currentColor"
            className="text-emerald-500/10"
            strokeWidth="2"
          />
        </svg>
        <div className="relative z-10">
          <section className="page-container pb-20 pt-20 md:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex rounded-full bg-[var(--color-brand-soft)] px-4 py-2 text-sm font-medium text-[var(--color-brand)]">
                San Miguel de Tucumán
              </span>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl">
                Encontrá tu próximo servicio
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
                Descubrí emprendimientos en San Miguel de Tucumán y reservá tu
                próximo turno de forma simple.
              </p>

              <BusinessSearch />
              <BusinessCategories />
            </div>
          </section>

          <section>
            <div className="page-container py-16 md:py-20">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
                  Emprendimientos destacados
                </h2>

                <p className="mt-2 text-neutral-600">
                  Descubrí lugares y profesionales para tu próximo turno.
                </p>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featuredBusinesses.map((business) => (
                  <BusinessCard
                    key={business.id}
                    id={business.id}
                    name={business.name}
                    category={business.category}
                    address={business.address}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
