const sections = [
  {
    id: "gallery",
    label: "Galeria"
  },
  {
    id: "services",
    label: "Servicios",
  },
  {
    id: "team",
    label: "Equipo",
  },
  {
    id: "reviews",
    label: "Reseñas",
  },
  {
    id: "about",
    label: "Acerca de",
  },
  {
    id: "hours",
    label: "Horarios y ubicación",
  },
];

export default function BusinessSectionNav() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="page-container flex gap-1 overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            className="shrink-0 cursor-pointer px-4 py-4 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
