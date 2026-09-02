interface BusinessAboutProps {
  description: string;
}

export default function BusinessAbout({ description }: BusinessAboutProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
        Acerca de
      </h2>

      <p className="mt-4 max-w-4xl whitespace-pre-line text-base leading-7 text-neutral-600">
        {description}
      </p>
    </section>
  );
}
