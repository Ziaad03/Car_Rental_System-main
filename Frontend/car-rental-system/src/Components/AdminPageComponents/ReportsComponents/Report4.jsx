import React, { useState } from "react";

export default function Report4() {
  const [customerID, setCustomerID] = useState("");
  const [reservations, setReservations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerate = async () => {
    if (!customerID) {
      setErrorMessage("Please enter a Customer ID.");
      return;
    }

    setErrorMessage("");
    try {
      const response = await fetch(
        `http://localhost/Car_Rental_System-main/Backend/Reporting/admin_customer_reservations.php?customer_id=${encodeURIComponent(
          customerID
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reservations.");
      }
      const data = await response.json();
      setReservations(data.reservations);
    } catch (error) {
      setErrorMessage(error.message);
      setReservations([]);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Reservations of a Specific Customer</h3>
      <p>All reservations of a specific customer including customer information, car model, and plate ID.</p>
      <div className="mb-4">
        <input
          type="text"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
          placeholder="Enter Customer ID"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {reservations.length > 0 && (
        <table className="border-collapse border border-gray-300 w-full mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Reservation ID</th>
              <th className="border border-gray-300 px-4 py-2">Reservation Date</th>
              <th className="border border-gray-300 px-4 py-2">Car Model</th>
              <th className="border border-gray-300 px-4 py-2">Plate ID</th>
              <th className="border border-gray-300 px-4 py-2">Customer Name</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.ReservationID}>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.ReservationID}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.ReservationDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.ModelName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.PlateID}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.FirstName} {reservation.LastName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
