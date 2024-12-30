import { useState } from "react";
import "../../../styles/carform.css";

export default function AddCarForm() {
  const [officeName, setOfficeName] = useState("");
  const [officeCountry, setOfficeCountry] = useState("");
  const [officeCity, setOfficeCity] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!officeName || !officeCountry || !officeCity || !officePhone) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost/Car_Rental_System-main/Backend/admin_office_add_new_office.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          office_name: officeName,
          office_country: officeCountry,
          office_city: officeCity,
          office_phone: officePhone,
        }),
      });

      const data = await response.text();

      if (data.includes("New office added successfully!")) {
        setSuccessMessage("Office added successfully!");
        setErrorMessage("");
        setOfficeName("");
        setOfficeCountry("");
        setOfficeCity("");
        setOfficePhone("");
      } else {
        setSuccessMessage("");
        setErrorMessage("Failed to add office. Please try again.");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Error connecting to the server.");
    }
  };

  return (
    <div className=" offic-container flex items-center justify-center  bg-gray-900 p-4">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-xl shadow-xl">
        

        {errorMessage && <p className="text-sm text-red-500 mb-2">{errorMessage}</p>}
        {successMessage && <p className="text-sm text-green-500 mb-2">{successMessage}</p>}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Office Name"
              className="w-full p-2 bg-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              value={officeName}
              onChange={(e) => setOfficeName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Office Phone Number"
              className="w-full p-2 bg-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              value={officePhone}
              onChange={(e) => setOfficePhone(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Office Country"
              className="w-full p-2 bg-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              value={officeCountry}
              onChange={(e) => setOfficeCountry(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Office City"
              className="w-full p-2 bg-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              value={officeCity}
              onChange={(e) => setOfficeCity(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Add Office
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}