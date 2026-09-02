import { Outlet } from "react-router";
import AppNavbar from "./AppNavbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <AppNavbar />
      <Outlet />
    </div>
  );
}
