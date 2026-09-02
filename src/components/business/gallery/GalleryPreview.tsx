interface GalleryPreviewProps {
  businessName: string;
  images: string[];
  onOpen: () => void;
}

export default function GalleryPreview({
  businessName,
  images,
  onOpen,
}: GalleryPreviewProps) {
  const renderImage = (index: number) => {
    const image = images[index];

    if (!image) {
      return <div className="h-full w-full bg-neutral-200" />;
    }

    return (
      <img
        src={image}
        alt={`${businessName} - foto ${index + 1}`}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
    );
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="grid h-[300px] gap-2 md:h-[420px] md:grid-cols-[2fr_1fr] md:grid-rows-2">
        <button
          type="button"
          onClick={onOpen}
          className="group cursor-pointer overflow-hidden p-0 md:row-span-2"
        >
          {renderImage(0)}
        </button>

        <button
          type="button"
          onClick={onOpen}
          className="group hidden cursor-pointer overflow-hidden p-0 md:block"
        >
          {renderImage(1)}
        </button>

        <button
          type="button"
          onClick={onOpen}
          className="group hidden cursor-pointer overflow-hidden p-0 md:block"
        >
          {renderImage(2)}
        </button>
      </div>

      {images.length > 0 && (
        <button
          type="button"
          onClick={onOpen}
          className="absolute bottom-4 right-4 cursor-pointer rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-950 shadow-sm transition-colors hover:bg-neutral-100"
        >
          Ver todas las fotos
        </button>
      )}
    </div>
  );
}
