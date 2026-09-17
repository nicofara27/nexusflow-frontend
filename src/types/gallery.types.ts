import type { BusinessImagePublicResponse } from "./business.types";

export type GallerySection = "establishment" | "portfolio";

export interface EmployeePortfolio {
  id: string;
  name: string;
  avatarUrl?: string;
  images: string[];
}

export interface BusinessGalleryHandle {
  openEstablishment: () => void;
  openPortfolio: (employeeId?: string) => void;
}

export interface BusinessGalleryProps {
  businessName: string;
  establishmentImages: BusinessImagePublicResponse[];
  employeePortfolios: EmployeePortfolio[];
}