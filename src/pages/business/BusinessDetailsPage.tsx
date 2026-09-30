import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import BusinessAside from "@/components/business/BusinessAside";
import BusinessTeam from "@/components/business/BusinessTeam";
import BusinessReviews from "@/components/business/BusinessReviews";
import ServiceList from "@/components/business/service-section/ServiceList";
import BusinessGallery from "@/components/business/gallery/BusinessGallery";
import BusinessAbout from "@/components/business/BusinessAbout";
import BusinessLocation from "@/components/business/BusinessLocation";
import BusinessHours from "@/components/business/BusinessHours";

import { businessService } from "@/services/business.service";
import type { BusinessGalleryHandle } from "@/types/gallery.types";
import type { BusinessPublicDetailsResponse } from "@/types/business.types";
import BusinessSectionNav from "@/components/business/BusinessSectionNav";

export default function BusinessDetailsPage() {
  const [business, setBusiness] =
    useState<BusinessPublicDetailsResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const galleryRef = useRef<BusinessGalleryHandle>(null);

  useEffect(() => {
    if (!id) {
      setError("No se encontró el emprendimiento.");
      setIsLoading(false);
      return;
    }

    const loadBusiness = async () => {
      try {
        const data = await businessService.getPublicById(id);

        setBusiness(data);
      } catch {
        setError("No se pudo cargar el emprendimiento.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBusiness();
  }, [id]);

  const handleEmployeeClick = (employeeId: string) => {
    galleryRef.current?.openPortfolio(employeeId);
  };

  const handleChooseService = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (isLoading) {
    return <p>Cargando emprendimiento...</p>;
  }

  if (error || !business) {
    return <p>{error ?? "No se encontró el emprendimiento."}</p>;
  }

  const employeePortfolios = business.employees.map((employee) => ({
    id: employee.id,
    name: `${employee.firstName} ${employee.lastName}`,
    images: employee.portfolioImages.map((image) => image.url),
  }));

  const handleReserve = (serviceId: string) => {
    navigate(`/businesses/${business.id}/book/${serviceId}`);
  };

  return (
    <main>
      <section id="gallery" className="page-container pt-8">
        <BusinessGallery
          ref={galleryRef}
          businessName={business.name}
          establishmentImages={business.images}
          employeePortfolios={employeePortfolios}
        />
      </section>
      <BusinessSectionNav />
      <div className="page-container py-10">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-14">
          <div className="min-w-0 space-y-16">
            <section id="services" className="scroll-mt-24">
              <ServiceList
                services={business.services}
                serviceCategories={business.serviceCategories}
                onReserve={handleReserve}
              />
            </section>

            <section id="team" className="scroll-mt-20">
              <BusinessTeam
                employees={business.employees}
                onEmployeeClick={handleEmployeeClick}
              />
            </section>

            <section id="reviews" className="scroll-mt-20">
              <BusinessReviews
                rating={business.averageRating}
                totalReviews={business.totalReviews}
                reviews={business.reviews}
              />
            </section>

            <section id="about" className="scroll-mt-20">
              <BusinessAbout description={business.about ?? ""} />
            </section>

            <section id="hours" className="scroll-mt-20">
              <div className="grid items-start gap-8 xl:grid-cols-2">
                <BusinessHours schedule={business.schedules} />
                {business.latitude !== null && business.longitude !== null && (
                  <BusinessLocation
                    businessName={business.name}
                    address={business.address}
                    latitude={business.latitude}
                    longitude={business.longitude}
                  />
                )}
              </div>
            </section>
          </div>

          <BusinessAside
            category={business.businessCategoryName}
            name={business.name}
            address={business.address}
            schedule={business.schedules}
            onChooseService={handleChooseService}
          />
        </div>
      </div>
    </main>
  );
}
