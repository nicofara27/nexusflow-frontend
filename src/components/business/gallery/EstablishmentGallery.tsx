interface EstablishmentGalleryProps {
  businessName: string;
  images: string[];
}

export default function EstablishmentGallery({
  businessName,
  images,
}: EstablishmentGalleryProps) {
  return (
    <div className="grid grid-cols-2 items-start gap-4">
      {images.map((image, index) => {
        const isFullWidth = index % 3 === 0;

        return (
          <div
            key={`${image}-${index}`}
            className={
              isFullWidth
                ? "col-span-2 overflow-hidden rounded-xl"
                : "col-span-2 overflow-hidden rounded-xl sm:col-span-1"
            }
          >
            <img
              src={image}
              alt={`${businessName} - establecimiento ${index + 1}`}
              className="block h-auto w-full"
            />
          </div>
        );
      })}
    </div>
  );
}
