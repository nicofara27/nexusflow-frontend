import { useNavigate } from "react-router";

const categories = [
  {
    label: "Barberías",
    value: "barberias",
  },
  {
    label: "Peluquerías",
    value: "peluquerias",
  },
  {
    label: "Uñas",
    value: "unas",
  },
  {
    label: "Estética",
    value: "estetica",
  },
];

export default function BusinessCategories() {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/search?category=${category}`);
  };
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          onClick={() => handleCategoryClick(category.value)}
          className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
