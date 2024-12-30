import React, { useState } from "react";
import Report1 from "./ReportsComponents/Report1";
import Report2 from "./ReportsComponents/Report2";
import Report3 from "./ReportsComponents/Report3";
import Report4 from "./ReportsComponents/Report4";
import Report5 from "./ReportsComponents/Report5";

export default function Reporting() {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    { id: 1, title: "All Reservations within a Period", component: <Report1 /> },
    { id: 2, title: "Reservations of a Car within a Period", component: <Report2 /> },
    { id: 3, title: "Car Status on a Specific Day", component: <Report3 /> },
    { id: 4, title: "Reservations of a Specific Customer", component: <Report4 /> },
    { id: 5, title: "Daily Payments within a Period", component: <Report5 /> },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reporting</h2>
      
      {/* Report Buttons */}
      <div className="flex gap-4 mb-8">
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`px-4 py-2 border rounded text-sm ${
              selectedReport === report.id ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-200"
            }`}
          >
            {report.title}
          </button>
        ))}
      </div>

      {/* Display Selected Report */}
      <div className="p-4 border rounded bg-gray-50">
        {selectedReport &&
          reports.find((report) => report.id === selectedReport)?.component}
      </div>
    </div>
  );
}
