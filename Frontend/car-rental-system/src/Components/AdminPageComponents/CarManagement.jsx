import AddCarForm from "./CarManagementComponents/AddCarForm";
import UpdateCarStatus from "./CarManagementComponents/UpdateCarStatus";

export default function CarManagement() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Car Management</h2>
      <div className="space-y-8">
        <AddCarForm />
        <UpdateCarStatus />
      </div>
    </div>
  );
}
