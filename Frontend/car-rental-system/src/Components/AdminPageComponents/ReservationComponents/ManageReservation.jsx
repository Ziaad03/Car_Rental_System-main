import { useState } from "react";

export default function ManageReservations() {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      car: "Toyota Corolla",
      customer: "John Doe",
      date: "2024-12-30",
      status: "Confirmed",
    },
    {
      id: 2,
      car: "Honda Civic",
      customer: "Jane Smith",
      date: "2024-12-31",
      status: "Pending",
    },
  ]);

  const handleCancelReservation = (id) => {
    // Logic to cancel the reservation
    setReservations((prev) =>
      prev.filter((reservation) => reservation.id !== id)
    );
  };

  const handleModifyReservation = (id) => {
    // Logic to modify reservation details
    console.log(`Modify reservation with ID: ${id}`);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Manage Reservations</h3>
      <ul className="space-y-4">
        {reservations.map((reservation) => (
          <li
            key={reservation.id}
            className="p-4 border border-gray-700 rounded bg-gray-800 text-white"
          >
            <p>
              <strong>Car:</strong> {reservation.car}
            </p>
            <p>
              <strong>Customer:</strong> {reservation.customer}
            </p>
            <p>
              <strong>Date:</strong> {reservation.date}
            </p>
            <p>
              <strong>Status:</strong> {reservation.status}
            </p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => handleModifyReservation(reservation.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Modify
              </button>
              <button
                onClick={() => handleCancelReservation(reservation.id)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
