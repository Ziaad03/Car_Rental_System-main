import { useState } from "react";

export default function AdvancedSearch() {
  const [searchType, setSearchType] = useState("car");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Logic to perform the search
    // Dummy data for now
    const dummyResults = [
      {
        id: 1,
        car: "Toyota Corolla",
        customer: "John Doe",
        date: "2024-12-30",
      },
    ];
    setResults(dummyResults);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Advanced Search</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Search By</label>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
        >
          <option value="car">Car Details</option>
          <option value="customer">Customer Details</option>
          <option value="date">Reservation Date</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Search Query</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
          placeholder={`Enter ${searchType}...`}
        />
      </div>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Search
      </button>
      <div className="mt-4">
        <h4 className="text-md font-semibold mb-2">Search Results</h4>
        <ul className="space-y-4">
          {results.map((result) => (
            <li
              key={result.id}
              className="p-4 border border-gray-700 rounded bg-gray-800 text-white"
            >
              <p>
                <strong>Car:</strong> {result.car}
              </p>
              <p>
                <strong>Customer:</strong> {result.customer}
              </p>
              <p>
                <strong>Date:</strong> {result.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
