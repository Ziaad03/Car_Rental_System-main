import React, { useEffect, useState } from "react";

const Reservation = ({ email }) => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const handlePayNow = async (reservationId, amount) => {
    const paymentDate = formatDate(new Date());

    try {
      const response = await fetch(
        "http://localhost/Car_Rental_System-main/Backend/addPayment.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            reservationId,
            amount,
            paymentDate,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Payment successful!");
        // Update reservation status to 'Paid'
        setReservations((prevReservations) =>
          prevReservations.map((r) =>
            r.ReservationID === reservationId
              ? { ...r, PaymentStatus: "Paid" }
              : r
          )
        );
      } else {
        alert(result.message || "Payment failed.");
      }
    } catch (error) {
      alert("An error occurred during payment.");
      console.error(error);
    }
  };

  const paidOrNotPaid = (status, reservationId, amount) => {
    if (status === "Paid") {
      return "Paid";
    } else {
      return (
        <button
          onClick={() => handlePayNow(reservationId, amount)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Pay Now
        </button>
      );
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "http://localhost/Car_Rental_System-main/Backend/getReservations.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ email }),
          }
        );

        const result = await response.json();

        if (result.success) {
          setReservations(result.reservations);
        } else {
          setError(result.message || "Failed to fetch reservations");
        }
      } catch (error) {
        setError("An error occurred while fetching reservations");
        console.error(error);
      }
    };

    fetchReservations();
  }, [email]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reservations</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-gray-800 text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2">Reservation ID</th>
              <th className="px-4 py-2">Plate ID</th>
              <th className="px-4 py-2">Reservation Date</th>
              <th className="px-4 py-2">Pickup Date</th>
              <th className="px-4 py-2">Return Date</th>
              <th className="px-4 py-2">Amount to be Paid</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <tr
                  key={reservation.ReservationID}
                  className="border-b border-gray-700"
                >
                  <td className="px-4 py-2 text-center">
                    {reservation.ReservationID}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {reservation.PlateID}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {reservation.ReservationDate}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {reservation.PickupDate}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {reservation.ReturnDate}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {reservation.AmountToBePaid}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {paidOrNotPaid(
                      reservation.PaymentStatus,
                      reservation.ReservationID,
                      reservation.AmountToBePaid
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center">
                  No reservations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservation;
