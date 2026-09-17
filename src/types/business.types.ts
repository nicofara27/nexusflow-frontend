export interface BusinessPublicResponse {
  id: string;
  name: string;
  address: string;
  businessCategoryId: string;
  businessCategoryName: string;
  businessCategorySlug: string;
  mainImageUrl: string | null;
}

export interface BusinessImagePublicResponse {
  id: string;
  url: string;
  order: number;
}

export interface BusinessScheduleResponse {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface ServiceResponse {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  serviceCategoryId: string | null;
}

export interface ReviewResponse {
  id: string;
  author: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface ServiceCategoryPublicResponse {
  id: string;
  name: string;
  order: number;
  services: ServiceResponse[];
}

export interface EmployeePublicResponse {
  id: string;
  firstName: string;
  lastName: string;
}

export interface BusinessPublicDetailsResponse {
  id: string;
  name: string;
  address: string;
  about: string | null;
  latitude: number | null;
  longitude: number | null;
  accentColor: string | null;
  businessCategoryId: string;
  businessCategoryName: string;
  businessCategorySlug: string;
  images: BusinessImagePublicResponse[];
  schedules: BusinessScheduleResponse[];
  serviceCategories: ServiceCategoryPublicResponse[];
  services: ServiceResponse[];
  employees: EmployeePublicResponse[];
  averageRating: number;
  totalReviews: number;
  reviews: ReviewResponse[];
}
