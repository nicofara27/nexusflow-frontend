import { useRef } from "react";
import BusinessAside from "@/components/business/BusinessAside";
import BusinessTeam from "@/components/business/BusinessTeam";
import BusinessReviews from "@/components/business/BusinessReviews";
import ServiceList from "@/components/business/ServiceList";
import BusinessGallery from "@/components/business/gallery/BusinessGallery";
import type { BusinessGalleryHandle } from "@/types/gallery.types";
import BusinessAbout from "@/components/business/BusinessAbout";
import BusinessLocation from "@/components/business/BusinessLocation";
import BusinessHours from "@/components/business/BusinessHours";

const businessSchedule = [
  {
    dayOfWeek: 1,
    day: "Lunes",
    isOpen: true,
    openTime: "09:00",
    closeTime: "20:00",
  },
  {
    dayOfWeek: 2,
    day: "Martes",
    isOpen: true,
    openTime: "09:00",
    closeTime: "20:00",
  },
  {
    dayOfWeek: 3,
    day: "Miércoles",
    isOpen: true,
    openTime: "09:00",
    closeTime: "20:00",
  },
  {
    dayOfWeek: 4,
    day: "Jueves",
    isOpen: true,
    openTime: "09:00",
    closeTime: "20:00",
  },
  {
    dayOfWeek: 5,
    day: "Viernes",
    isOpen: true,
    openTime: "09:00",
    closeTime: "20:00",
  },
  {
    dayOfWeek: 6,
    day: "Sábado",
    isOpen: true,
    openTime: "09:00",
    closeTime: "14:00",
  },
  {
    dayOfWeek: 0,
    day: "Domingo",
    isOpen: false,
  },
];

const businessLocation = {
  latitude: -26.82337469773951,
  longitude: -65.21076527713717,
};

const businessDescription =
  "Somos una barbería enfocada en brindar una atención personalizada y un espacio cómodo para cada cliente. Nuestro equipo se especializa en cortes, barba y tratamientos, buscando siempre adaptar cada servicio al estilo de quien nos visita.";

const reviews = [
  {
    id: "1",
    author: "María",
    rating: 5,
    comment:
      "Excelente atención, muy buen ambiente y quedé muy conforme con el resultado.",
    date: "Hace 2 semanas",
  },
  {
    id: "2",
    author: "Lucas",
    rating: 5,
    comment: "Muy buena atención y puntualidad. Sin dudas volvería a reservar.",
    date: "Hace 3 semanas",
  },
  {
    id: "3",
    author: "Sofía",
    rating: 4,
    comment: "Muy buena experiencia y excelente trato por parte del equipo.",
    date: "Hace 1 mes",
  },
];

const establishmentImages = [
  "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
  "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
  "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
];

const employeePortfolios = [
  {
    id: "1",
    name: "Bryan",
    avatarUrl: "/images/employees/bryan.jpg",
    images: [
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
    ],
  },
  {
    id: "2",
    name: "Juan",
    avatarUrl: "/images/employees/juan.jpg",
    images: [
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
    ],
  },
  {
    id: "3",
    name: "Carlos",
    avatarUrl: "/images/employees/carlos.jpg",
    images: [
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
      "https://images.fresha.com/locations/location-profile-images/2521853/5293983/53baaa2f-9ba6-4167-b120-1814a8d9717a-Fiorestudio-CO-Atlntico-Barranquilla-RiomarSantaMonica-Fresha.jpg?class=gallery-modal-small&watermark=true&f_width=1920&f_quality=75",
    ],
  },
];

const employees = [
  {
    id: "1",
    firstName: "Bryan",
    role: "Barbero",
    portfolioCount: 14,
  },
  {
    id: "2",
    firstName: "Juan",
    role: "Barbero",
    portfolioCount: 9,
  },
  {
    id: "3",
    firstName: "Carlos",
    role: "Colorista",
    portfolioCount: 21,
  },
];

const serviceCategories = [
  {
    id: "1",
    name: "Cabello",
  },
  {
    id: "2",
    name: "Barba",
  },
  {
    id: "3",
    name: "Tratamientos",
  },
];

const services = [
  {
    id: "1",
    name: "Corte clásico",
    duration: 30,
    price: 8000,
    categoryId: "1",
  },
  {
    id: "2",
    name: "Corte premium",
    duration: 45,
    price: 10000,
    categoryId: "1",
  },
  {
    id: "3",
    name: "Perfilado de barba",
    duration: 30,
    price: 6000,
    categoryId: "2",
  },
  {
    id: "4",
    name: "Afeitado",
    duration: 30,
    price: 7000,
    categoryId: "2",
  },
  {
    id: "5",
    name: "Hidratación capilar",
    duration: 45,
    price: 12000,
    categoryId: "3",
  },
  {
    id: "6",
    name: "Corte + barba",
    duration: 60,
    price: 14000,
    categoryId: "1",
  },
];

export default function BusinessDetailsPage() {
  const servicesRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<BusinessGalleryHandle>(null);

  const handleEmployeeClick = (employeeId: string) => {
    galleryRef.current?.openPortfolio(employeeId);
  };

  const handleChooseService = () => {
    servicesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main>
      <section className="page-container pt-8">
        <BusinessGallery
          ref={galleryRef}
          businessName="Nombre del emprendimiento"
          establishmentImages={establishmentImages}
          employeePortfolios={employeePortfolios}
        />
      </section>

      <section className="page-container py-10">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-14">
          <div className="min-w-0 space-y-16">
            <section ref={servicesRef}>
              <ServiceList
                services={services}
                categories={serviceCategories}
                showCategories
              />
            </section>

            <BusinessTeam
              employees={employees}
              onEmployeeClick={handleEmployeeClick}
            />
            <BusinessReviews
              rating={4.8}
              totalReviews={124}
              reviews={reviews}
            />
            <BusinessAbout description={businessDescription} />
            <div className="grid items-start gap-8 xl:grid-cols-2">
              <BusinessHours schedule={businessSchedule} />

              <BusinessLocation
                businessName="Nombre del emprendimiento"
                address="Catamarca 453, San Miguel de Tucumán"
                latitude={businessLocation.latitude}
                longitude={businessLocation.longitude}
              />
            </div>
          </div>

          <BusinessAside
            category="Barbería"
            name="Nombre del emprendimiento"
            address="Catamarca 453"
            statusText="hasta las 20:00"
            onChooseService={handleChooseService}
          />
        </div>
      </section>
    </main>
  );
}
