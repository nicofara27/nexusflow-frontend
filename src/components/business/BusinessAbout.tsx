interface BusinessAboutProps {
  description: string;
}

export default function BusinessAbout({ description }: BusinessAboutProps) {
  return (
    <section >
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
        Acerca de
      </h2>

      <p className="mt-4 break-words whitespace-pre-line text-sm leading-7 text-neutral-600">
        {description}
      </p>
    </section>
  );
}
