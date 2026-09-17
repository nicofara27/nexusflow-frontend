import { forwardRef, useImperativeHandle, useState } from "react";

import GalleryDialog from "./GalleryDialog";
import GalleryPreview from "./GalleryPreview";

import type {
  BusinessGalleryHandle,
  BusinessGalleryProps,
  GallerySection,
} from "@/types/gallery.types";

const BusinessGallery = forwardRef<BusinessGalleryHandle, BusinessGalleryProps>(
  function BusinessGallery(
    { businessName, establishmentImages, employeePortfolios },
    ref,
  ) {
    const [open, setOpen] = useState(false);

    const [section, setSection] =
      useState<GallerySection>("establishment");

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(
      employeePortfolios[0]?.id ?? "",
    );

    const establishmentImageUrls = establishmentImages.map(
      (image) => image.url,
    );

    const openEstablishment = () => {
      setSection("establishment");
      setOpen(true);
    };

    const openPortfolio = (employeeId?: string) => {
      setSection("portfolio");

      if (employeeId) {
        setSelectedEmployeeId(employeeId);
      }

      setOpen(true);
    };

    useImperativeHandle(ref, () => ({
      openEstablishment,
      openPortfolio,
    }));

    return (
      <>
        <GalleryPreview
          businessName={businessName}
          images={establishmentImageUrls}
          onOpen={openEstablishment}
        />

        <GalleryDialog
          open={open}
          onOpenChange={setOpen}
          businessName={businessName}
          establishmentImages={establishmentImageUrls}
          employeePortfolios={employeePortfolios}
          section={section}
          onSectionChange={setSection}
          selectedEmployeeId={selectedEmployeeId}
          onEmployeeChange={setSelectedEmployeeId}
        />
      </>
    );
  },
);

export default BusinessGallery;