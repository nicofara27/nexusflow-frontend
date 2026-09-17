import { Link } from "react-router";

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  address: string;
  imageUrl?: string;
}

export default function BusinessCard({
  id,
  name,
  category,
  address,
  imageUrl,
}: BusinessCardProps) {
  return (
    <Link
      to={`/businesses/${id}`}
      className="group block overflow-hidden rounded-xl transition-colors hover:border-neutral-300"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[var(--color-brand-subtle)]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-primary">
            NexusFlow
          </div>
        )}
      </div>

      <div className="pt-2">
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">
          {name}
        </h3>

        <p className="text-sm text-neutral-500">{address}</p>

        <p className="text-sm font-medium text-primary">
          {category}
        </p>
      </div>
    </Link>
  );
}
