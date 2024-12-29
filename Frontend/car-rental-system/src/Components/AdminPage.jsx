import { useState } from "react";
import AdminHeader from "./AdminPageComponents/AdminHeader";
import CarManagement from "./AdminPageComponents/CarManagement";
import ReservationManagement from "./AdminPageComponents/ReservationManagement";
import Reporting from "./AdminPageComponents/Reporting";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("CarManagement");

  const renderSection = () => {
    switch (activeSection) {
      case "CarManagement":
        return <CarManagement />;
      case "ReservationManagement":
        return <ReservationManagement />;
      case "Reporting":
        return <Reporting />;
      default:
        return <CarManagement />;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AdminHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="mt-4">{renderSection()}</div>
    </div>
  );
}
