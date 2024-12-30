import React, { useState } from "react";

export default function Report3() {
  const [date, setDate] = useState("");
  const [carStatuses, setCarStatuses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerate = async () => {
    if (!date) {
      setErrorMessage("Please select a date.");
      return;
    }

    setErrorMessage("");
    try {
      const response = await fetch(
        `http://localhost/Car_Rental_System-main/Backend/Reporting/admin_cars_status_on_date.php?date=${encodeURIComponent(
          date
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch car statuses.");
      }
      const data = await response.json();
      setCarStatuses(data.cars);
    } catch (error) {
      setErrorMessage(error.message);
      setCarStatuses([]);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Car Status on a Specific Day</h3>
      <p>The status of all cars on a specific day.</p>
      <div className="mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
      {carStatuses.length > 0 && (
        <table className="border-collapse border border-gray-300 w-full mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Car ID</th>
              <th className="border border-gray-300 px-4 py-2">Plate ID</th>
              <th className="border border-gray-300 px-4 py-2">Model Name</th>
              <th className="border border-gray-300 px-4 py-2">Model Year</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {carStatuses.map((car) => (
              <tr key={car.CarID}>
                <td className="border border-gray-300 px-4 py-2">{car.CarID}</td>
                <td className="border border-gray-300 px-4 py-2">{car.PlateID}</td>
                <td className="border border-gray-300 px-4 py-2">{car.ModelName}</td>
                <td className="border border-gray-300 px-4 py-2">{car.ModelYear}</td>
                <td className="border border-gray-300 px-4 py-2">{car.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
