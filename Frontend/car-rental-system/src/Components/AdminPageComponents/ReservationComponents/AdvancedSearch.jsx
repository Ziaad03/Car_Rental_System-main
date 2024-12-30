import { useState } from "react";
import { FaCar, FaUser, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

export default function AdvancedSearch() {
  const [searchType, setSearchType] = useState("car");
  const [searchCategory, setSearchCategory] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const categories = {
    car: ["Car ID", "Plate ID", "Model Name", "Model Year", "Rent Value"],
    customer: ["Customer ID", "Email", "Phone Number"],
    reservation: [
      "Reservation ID",
      "Plate ID",
      "Customer ID",
      "Reservation Date",
      "Pickup Date",
      "Return Date",
    ],
  };

  const handleSearch = async () => {
    if (!searchCategory || !query) {
      alert("Please select a category and enter a query.");
      return;
    }

    const data = {
      searchCategory,
      query,
    };

    try {
      const response = await fetch(
        "http://localhost/Car_Rental_System-main/Backend/search.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(data),
        }
      );

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        setResults([]);
      } else {
        setError("");
        setResults(result);
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
      setResults([]);
    }
  };

  const getPlaceholder = () => {
    if (searchCategory?.toLowerCase().includes("date")) {
      return "Enter date in yyyy-mm-dd...";
    }
    return `Enter ${searchCategory || "query"}...`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-xl shadow-xl">
        {/* Title */}
        <h3 className="text-3xl font-bold text-center text-white mb-6">Advanced Search</h3>

        {/* Form */}
        <div className="space-y-8">
          {/* Search Type */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <label className="block text-sm font-medium text-gray-300 mb-2">Search By</label>
            <select
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value);
                setSearchCategory(""); // Reset category when searchType changes
              }}
              className="w-full p-3 bg-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="car">Car Details</option>
              <option value="customer">Customer Details</option>
              <option value="reservation">Reservation Details</option>
            </select>
          </div>

          {/* Search Category */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <label className="block text-sm font-medium text-gray-300 mb-2">Search Category</label>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full p-3 bg-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories[searchType]?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Search Query */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <label className="block text-sm font-medium text-gray-300 mb-2">Search Query</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 bg-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder={getPlaceholder()}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 ease-in-out disabled:bg-gray-500"
            disabled={!searchCategory || !query}
          >
            Search
          </button>
        </div>

        {/* Search Results */}
        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4 text-white">Search Results</h4>
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md mb-4">
              <p>{error}</p>
            </div>
          )}

          {/* Grid Layout for Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className="p-6 bg-gray-700 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                {/* Add icons to card */}
                <div className="flex items-center space-x-4 mb-4">
                  {searchType === "car" && <FaCar className="text-blue-500 text-3xl" />}
                  {searchType === "customer" && <FaUser className="text-green-500 text-3xl" />}
                  {searchType === "reservation" && <FaCalendarAlt className="text-yellow-500 text-3xl" />}
                </div>
                
                {/* Card Content */}
                {Object.entries(result).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <p className="font-medium text-sm text-gray-400">{key}:</p>
                    <p className="text-lg">{value}</p>
                  </div>
                ))}

                <div className="mt-4">
                  <FaInfoCircle className="text-gray-400 text-xl" />
                  <span className="ml-2 text-sm text-gray-400">Click for more info</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}