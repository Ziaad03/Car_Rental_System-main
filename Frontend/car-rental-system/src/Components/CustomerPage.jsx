import { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import CustomerHeader from "./CustomerPageComponents/CustomerHeader";
import Reservations from "./CustomerPageComponents/Reservations";
import ReserveCar from "./CustomerPageComponents/ReserveCar";

export default function CustomerPage() {
  const { user } = useUser(); // Access the user data from context
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("Reservations");
   const renderSection = () => {
      switch (activeSection) {
        case "Reservations":
          return <Reservations  email={user.email}/>;
        case "Reserve A Car":
          return <ReserveCar   email= {user.email} />;
        
        default:
          return <Reservations />;
      }
    };


  useEffect(() => {
    // Fetch first name and last name when the component loads
    const fetchCustomerDetails = async () => {
      if (!user || !user.email) {
        setError("No email provided.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost/Car_Rental_System-main/Backend/getCustomerDetails.php", // Update the URL if necessary
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
          }
        );

        const data = await response.json();
        if (data.success) {
          setFirstName(data.data.FirstName);
          setLastName(data.data.LastName);
        } else {
          setError(data.message || "Failed to fetch customer details.");
        }
      } catch (error) {
        setError("Unable to connect to the server.");
      }
    };

    fetchCustomerDetails();
  }, [user]);

  return (
    <div>
     <div className="p-4">
    {error && <p className="text-red-500">{error}</p>}
      {firstName && lastName && (
        <h1>
          Welcome {firstName} {lastName}
        </h1>
      )}
      <CustomerHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="mt-4">{renderSection()}</div>
      </div>


    </div>
  );
}
