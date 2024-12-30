import { useState } from "react";
import "../../../styles/carform.css";

export default function AddCarForm() {
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [officeID, setOfficeID] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [plateID, setPlateID] = useState("");
  const [rentValue, setRentValue] = useState("");
  const [carStatus, setCarStatus] = useState("active");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!modelName || !officeID || !modelYear || !plateID || !rentValue || !brandName) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    // Send form data to the PHP backend
    try {
      const response = await fetch("http://localhost/Car_Rental_System-main/Backend/admin_car_add_new_car.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Use form encoding
        },
        body: new URLSearchParams({
          brand_name: brandName,
          model_name: modelName,
          office_id: officeID,
          model_year: modelYear,
          plate_id: plateID,
          rent_value: rentValue,
          car_status: carStatus,
        }),
      });


      const data = await response.text(); // Read the response

      if (data.includes("New car added successfully!")) {
        setSuccessMessage("Car added successfully!");
        setErrorMessage("")
        // Clear the form after successful submission
        setBrandName("");
        setModelName("");
        setOfficeID("");
        setModelYear("");
        setPlateID("");
        setRentValue("");
        setCarStatus("active");
      } else {
        setSuccessMessage("")
        setErrorMessage("Failed to add car. Please try again.");
      }
    } catch (error) {
      setSuccessMessage("")
      setErrorMessage("Error connecting to the server.");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Add New Car</h3>
      {errorMessage && <p className="text-sm text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-sm text-green-500 mb-4">{successMessage}</p>}
      <form className="car-form space-y-4" onSubmit={handleSubmit}>
      <input
          type="text"
          placeholder="Office Id"
          className=" office-btn w-full p-2 border rounded"
          value={officeID}
          onChange={(e) => setOfficeID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Brand"
          className="w-full p-2 border rounded"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
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
          <option value="out-of-service">Out of Service</option>
          <option value="rented">Rented</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Add Car
        </button>
      </form>
    </div>
  );
}
