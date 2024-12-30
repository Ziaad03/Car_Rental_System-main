import { useState, useEffect } from "react";

export default function OfficeList() {
  const [offices, setOffices] = useState([]);
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOffices = async (filterCountry) => {
    setLoading(true);
    setError("");
    const url = filterCountry
      ? `http://localhost/Car_Rental_System-main/Backend/admin_office_get_office.php?country=${filterCountry}`
      : "http://localhost/Car_Rental_System-main/Backend/admin_office_get_office.php";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch offices");
      }
      const data = await response.json();
      setOffices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices(); // Fetch all offices on initial render
  }, []);

  const handleFilter = () => {
    fetchOffices(country);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-center">Offices</h3>

      {/* Country Filter */}
      <div className="flex mb-6 items-center justify-between">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country name"
          className="w-full md:w-1/3 p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFilter}
          className="ml-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Filter by Country
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-yellow-400 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Office List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offices.length > 0 ? (
          offices.map((office) => (
            <div
              key={office.OfficeID}
              className="p-4 bg-gray-700 rounded-md shadow-md hover:shadow-xl hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              <h4 className="text-xl font-bold mb-2">{office.OfficeName}</h4>
              <p className="text-sm mb-2">{office.City}, {office.Country}</p>
              <p className="text-sm">Phone: {office.PhoneNumber}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">No offices found</p>
        )}
      </div>
    </div>
  );
}