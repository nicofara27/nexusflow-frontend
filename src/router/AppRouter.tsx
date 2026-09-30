import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/HomePage";
import PublicLayout from "@/components/layout/PublicLayout";
import SearchResultsPage from "@/pages/search/SearchResultsPage";
import BusinessDetailsPage from "@/pages/business/BusinessDetailsPage";
import BookAppointmentPage from "@/pages/bookAppointment/BookAppointmentPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/businesses/:id" element={<BusinessDetailsPage />} />
          <Route
            path="/businesses/:businessId/book/:serviceId"
            element={<BookAppointmentPage />}
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
