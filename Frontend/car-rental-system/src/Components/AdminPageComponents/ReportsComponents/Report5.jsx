import React, { useState } from "react";

export default function Report5() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [payments, setPayments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerate = async () => {
    if (!startDate || !endDate) {
      setErrorMessage("Please enter both start and end dates.");
      return;
    }

    setErrorMessage("");
    try {
      const response = await fetch(
        `http://localhost/Car_Rental_System-main/Backend/Reporting/admin_daily_payments.php?start_date=${encodeURIComponent(
          startDate
        )}&end_date=${encodeURIComponent(endDate)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch payments.");
      }
      const data = await response.json();
      setPayments(data.payments);
    } catch (error) {
      setErrorMessage(error.message);
      setPayments([]);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Daily Payments within a Period</h3>
      <p>Daily payments within a specific period.</p>
      <div className="mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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
      {payments.length > 0 && (
        <table className="border-collapse border border-gray-300 w-full mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Payment ID</th>
              <th className="border border-gray-300 px-4 py-2">Payment Date</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.PaymentID}>
                <td className="border border-gray-300 px-4 py-2">{payment.PaymentID}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.PaymentDate}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.Amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
