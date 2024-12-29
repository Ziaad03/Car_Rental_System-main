import ManageReservations from "./ReservationComponents/ManageReservation";
import AdvancedSearch from "./ReservationComponents/AdvancedSearch";

export default function ReservationManagement() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reservation Management</h2>
      <div className="space-y-8">
        <ManageReservations />
        <AdvancedSearch />
      </div>
    </div>
  );
}
