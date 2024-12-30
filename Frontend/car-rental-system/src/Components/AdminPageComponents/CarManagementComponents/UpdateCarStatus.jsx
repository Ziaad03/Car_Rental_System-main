import { useState } from "react";
import "../../../styles/carform.css";

export default function UpdateCarStatus() {
  const [carID, setCarID] = useState("");
  const [modelName, setModelName] = useState("");
  const [officeID, setOfficeID] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [plateID, setPlateID] = useState("");
  const [rentValue, setRentValue] = useState("");
  const [carStatus, setCarStatus] = useState("active");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdateStatus = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!carID) {
      setErrorMessage("Car ID is required.");
      return;
    }

    // Prepare the data to send to the PHP backend
    const formData = new URLSearchParams();
    formData.append("car_id", carID);
    formData.append("model_name", modelName);
    formData.append("office_id", officeID);
    formData.append("model_year", modelYear);
    formData.append("plate_id", plateID);
    formData.append("rent_value", rentValue);
    formData.append("car_status", carStatus);

    try {
      // Send the data to the PHP backend using fetch
      const response = await fetch("http://localhost/Car_Rental_System-main/Backend/admin_car_edit_car.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Use form encoding
        },
        body: formData.toString(),
      });

      const data = await response.text(); // Read the response

      if (data.includes("Car updated successfully!")) {
        setSuccessMessage("Car updated successfully!");
        setErrorMessage("")
        // Clear the form after successful submission
        setCarID("");
        setModelName("");
        setOfficeID("");
        setModelYear("");
        setPlateID("");
        setRentValue("");
        setCarStatus("active");
      } else {
        setErrorMessage("Failed to update car. Please try again.");
        setSuccessMessage("")
      }
    } catch (error) {
      setSuccessMessage("")
      setErrorMessage("Error connecting to the server.");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Update Car Status</h3>
      {errorMessage && <p className="text-sm text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-sm text-green-500 mb-4">{successMessage}</p>}
      <form className="car-form space-y-4" onSubmit={handleUpdateStatus}>
        <input
          type="number"
          placeholder="Car ID"
          className=" carid-btns w-full p-2 border rounded"
          value={carID}
          onChange={(e) => setCarID(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Model"
          className="w-full p-2 border rounded"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Office Id"
          className="w-full p-2 border rounded"
          value={officeID}
          onChange={(e) => setOfficeID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          className="w-full p-2 border rounded"
          value={modelYear}
          onChange={(e) => setModelYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Plate ID"
          className="w-full p-2 border rounded"
          value={plateID}
          onChange={(e) => setPlateID(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rent Value"
          className="w-full p-2 border rounded"
          value={rentValue}
          onChange={(e) => setRentValue(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded"
          value={carStatus}
          onChange={(e) => setCarStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="Out Of Service">Out of Service</option>
          <option value="rented">Rented</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Update Car Status
        </button>
      </form>
    </div>
  );
}
