import type { ReviewResponse } from "@/types/business.types";

interface BusinessReviewsProps {
  rating: number;
  totalReviews: number;
  reviews: ReviewResponse[];
}

const formatReviewDate = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const differenceInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000,
  );

  const formatter = new Intl.RelativeTimeFormat("es-AR", {
    numeric: "always",
  });

  if (differenceInSeconds < 60) {
    return "Creado hace unos segundos";
  }

  const minutes = Math.floor(differenceInSeconds / 60);

  if (minutes < 60) {
    return `Creado ${formatter.format(-minutes, "minute")}`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `Creado ${formatter.format(-hours, "hour")}`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `Creado ${formatter.format(-days, "day")}`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `Creado ${formatter.format(-months, "month")}`;
  }

  const years = Math.floor(months / 12);

  return `Creado ${formatter.format(-years, "year")}`;
};

export default function BusinessReviews({
  rating,
  totalReviews,
  reviews,
}: BusinessReviewsProps) {
  const visibleReviews = reviews.slice(0, 3);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Reseñas
          </h2>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-xl font-semibold text-neutral-950">
              {rating.toFixed(1)}
            </span>

            <span className="text-amber-500">★</span>

            <span className="text-sm text-neutral-500">
              {totalReviews} reseñas
            </span>
          </div>
        </div>

        {totalReviews > 3 && (
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-100"
          >
            Ver todas
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleReviews.map((review) => (
          <article
            key={review.id}
            className="rounded-xl border border-neutral-200 bg-white p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium text-neutral-950">{review.author}</p>

              <span className="text-xs text-neutral-400">
                {formatReviewDate(review.createdAt)}
              </span>
            </div>

            <div className="mt-3 flex gap-0.5 text-sm text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={
                    index < review.rating
                      ? "text-amber-500"
                      : "text-neutral-200"
                  }
                >
                  ★
                </span>
              ))}
            </div>

            {review.comment && (
              <p className="mt-4 line-clamp-4 text-sm leading-6 text-neutral-600">
                {review.comment}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
