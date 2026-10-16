import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/HomePage";
import PublicLayout from "@/components/layout/PublicLayout";
import SearchResultsPage from "@/pages/search/SearchResultsPage";
import BusinessDetailsPage from "@/pages/business/BusinessDetailsPage";
import BookAppointmentPage from "@/pages/bookAppointment/BookAppointmentPage";
import ConfirmAppointmentPage from "@/pages/confirmAppointment/ConfirmAppointmentPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/businesses/:id" element={<BusinessDetailsPage />} />
          <Route path="/businesses/:businessId/book/:serviceId" element={<BookAppointmentPage />} />
          <Route path="/appointments/confirm" element={<ConfirmAppointmentPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
