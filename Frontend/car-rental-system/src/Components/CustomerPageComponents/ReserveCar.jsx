import { useState } from "react";
import "../../styles/reservecar.css"

const ReserveCar = ({email}) => {
  const [searchParams, setSearchParams] = useState({
    country: "",
    city: "",
    model_name: "",
    min_model_year: "",
    pickup_date: "",
    return_date: "",
    brand_name: "",
  });

  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`http://localhost/Car_Rental_System-main/Backend/customerSearch.php?${queryString}`);
      const data = await response.json();
  
      if (data.success) {
        setCars(data.data); // Set the cars array
      } else {
        setCars([]); // Clear the list if no cars are found
        setError(data.message || "No cars found.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while searching for cars.");
    }
  };

  const handleReserve = async (plateID) => {
    if (!searchParams.pickup_date || !searchParams.return_date) {
      setError("Please enter both pickup and return dates.");
      return;
    }
  
    setError("");
    setSuccess("");
  
    try {
      const pickupDate = new Date(searchParams.pickup_date).toISOString().split("T")[0];
      const returnDate = new Date(searchParams.return_date).toISOString().split("T")[0];
      const reservationDate = new Date().toISOString().split("T")[0];
      
  
      const payload = {
        plate_id: plateID,
        pickup_date: pickupDate,
        return_date: returnDate,
        reservation_date: reservationDate,
        email: email, // Include email in the payload
      };
  
      const response = await fetch("http://localhost/Car_Rental_System-main/Backend/reserveCar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setSuccess(`Car with ID ${plateID} reserved successfully!`);
      } else {
        setError(data.message || "Failed to reserve the car.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while reserving the car.");
    }
  };
  


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Reserve a Car</h1>
      <form className="space-y-4" onSubmit={handleSearch}>
        <div className=" search-options grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block font-medium">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={searchParams.country}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="Enter country"
            />
          </div>
          <div>
            <label htmlFor="city" className="block font-medium">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={searchParams.city}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="Enter city"
            />
          </div>
          <div>
            <label htmlFor="model_name" className="block font-medium">
              Model Name:
            </label>
            <input
              type="text"
              id="model_name"
              name="model_name"
              value={searchParams.model_name}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="Enter model name"
            />
          </div>
          <div>
            <label htmlFor="model_name" className="block font-medium">
              Brand Name:
            </label>
            <input
              type="text"
              id="brand_name"
              name="brand_name"
              value={searchParams.brand_name}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="Enter brand name"
            />
          </div>
          <div>
            <label htmlFor="min_model_year" className="block font-medium">
              Minimum Model Year:
            </label>
            <input
              type="number"
              id="min_model_year"
              name="min_model_year"
              value={searchParams.min_model_year}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="Enter minimum model year"
            />
          </div>
          <div>
            <label htmlFor="pickup_date" className="block font-medium">
              Pickup Date:
            </label>
            <input
              type="date"
              id="pickup_date"
              name="pickup_date"
              value={searchParams.pickup_date}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="return_date" className="block font-medium">
              Return Date:
            </label>
            <input
              type="date"
              id="return_date"
              name="return_date"
              value={searchParams.return_date}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
      {cars.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-700 text-white">
                
                <th className="border border-gray-300 px-4 py-2">Model Name</th>
                <th className="border border-gray-300 px-4 py-2">Brand Name</th>
                <th className="border border-gray-300 px-4 py-2">Model Year</th>
                <th className="border border-gray-300 px-4 py-2">Rent Per Day</th>
                <th className="border border-gray-300 px-4 py-2">Plate ID</th>
                <th className="border border-gray-300 px-4 py-2">Car Status</th>
                <th className="border border-gray-300 px-4 py-2">Office Name</th>
                <th className="border border-gray-300 px-4 py-2">Country</th>
                <th className="border border-gray-300 px-4 py-2">City</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.CarID}>
                  
                  <td className="border border-gray-300 px-4 py-2">{car.ModelName}</td>
                  <td className="border border-gray-300 px-4 py-2">{car.BrandName}</td>
                  <td className="border border-gray-300 px-4 py-2">{car.ModelYear}</td>
                  <td className="border border-gray-300 px-4 py-2">{car.RentValue}</td>
                  <td className="border border-gray-300 px-4 py-2">{car.PlateID}</td>
                  <td className="border border-gray-300 px-4 py-2">{car.CarStatus}</td>
                  <td className="border border-gray-300 px-4 py-2">{car.OfficeName}</td>
                  <td className="border border-gray-300 px-4 py-2">{car.Country}</td>
                  <td className="border border-gray-300 px-4 py-2">{car.City}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleReserve(car.PlateID)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Reserve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReserveCar;
