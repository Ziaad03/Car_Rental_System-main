export default function AdminHeader({ activeSection, setActiveSection }) {
  const sections = ["CarManagement", "ReservationManagement", "Reporting"];

  return (
    <div className="flex space-x-4">
      {sections.map((section) => (
        <button
          key={section}
          className={`px-4 py-2 ${
            activeSection === section
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          } rounded`}
          onClick={() => setActiveSection(section)}
        >
          {section.replace(/([A-Z])/g, " $1").trim()}
        </button>
      ))}
    </div>
  );
}
