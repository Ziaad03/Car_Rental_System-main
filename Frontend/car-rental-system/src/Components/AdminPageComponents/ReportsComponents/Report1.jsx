import { useState } from "react";

export default function Report1() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reservations, setReservations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to format the date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to fetch reservations
  const handleGenerate = async () => {
    if (!startDate || !endDate) {
      setErrorMessage("Please provide both start and end dates.");
      return;
    }

    try {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      const response = await fetch(
        `http://localhost/Car_Rental_System-main/Backend/Reporting/admin_reservations_within_period.php?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
      );

      const data = await response.json();

      if (data.success) {
        setReservations(data.data);
        setSuccessMessage("Data fetched successfully.");
        setErrorMessage("");
      } else {
        setReservations([]);
        setSuccessMessage("");
        setErrorMessage(data.message || "No data found for the specified period.");
      }
    } catch (error) {
      setReservations([]);
      setSuccessMessage("");
      setErrorMessage("Error connecting to the server.");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">All Reservations within a Period</h3>

      {/* Date Inputs */}
      <div className="mb-4">
        <label className="block mb-2">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </label>
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate
        </button>
      </div>

      {/* Error and Success Messages */}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      {/* Reservation Table */}
      {reservations.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Reservations:</h4>
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Reservation ID</th>
                <th className="border border-gray-300 px-4 py-2">Reservation Date</th>
                <th className="border border-gray-300 px-4 py-2">Car Model</th>
                <th className="border border-gray-300 px-4 py-2">Plate ID</th>
                <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                <th className="border border-gray-300 px-4 py-2">Customer Email</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.ReservationID}>
                  <td className="border border-gray-300 px-4 py-2">{res.ReservationID}</td>
                  <td className="border border-gray-300 px-4 py-2">{res.ReservationDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{res.ModelName}</td>
                  <td className="border border-gray-300 px-4 py-2">{res.PlateID}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {res.FirstName} {res.LastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{res.Email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
