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
  establishmentImages: string[];
  employeePortfolios: EmployeePortfolio[];
}