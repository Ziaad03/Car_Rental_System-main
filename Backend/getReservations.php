<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from your frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and preflight (OPTIONS) requests
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
header("Access-Control-Allow-Credentials: true"); // If using credentials (e.g., sessions)

include 'db.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];

    // Fetch Customer ID using email
    $customerQuery = $conn->prepare("SELECT CustomerID FROM customers WHERE Email = ?");
    $customerQuery->bind_param("s", $email);
    $customerQuery->execute();
    $customerResult = $customerQuery->get_result();
    
    if ($customerResult->num_rows > 0) {
        $customer = $customerResult->fetch_assoc();
        $customerId = $customer['CustomerID'];

        // Fetch Reservations for the Customer
        $reservationQuery = $conn->prepare("
            SELECT r.ReservationID, r.PlateID, r.ReservationDate, r.PickupDate, r.ReturnDate, 
                   IF(p.ReservationID IS NOT NULL, 'Paid', 'Not Paid') AS PaymentStatus,
                   c.RentValue
            FROM reservations r
            LEFT JOIN payments p ON r.ReservationID = p.ReservationID
            INNER JOIN cars c ON r.PlateID = c.PlateID
            WHERE r.CustomerID = ?
        ");
        $reservationQuery->bind_param("i", $customerId);
        $reservationQuery->execute();
        $reservationResult = $reservationQuery->get_result();

        $reservations = [];
        while ($row = $reservationResult->fetch_assoc()) {
            // Calculate the number of days between PickupDate and ReturnDate
            $pickupDate = new DateTime($row['PickupDate']);
            $returnDate = new DateTime($row['ReturnDate']);
            $days = $pickupDate->diff($returnDate)->days;

            // Calculate the amount to be paid
            $amountToBePaid = $days * $row['RentValue'];

            // Add the amount to the row
            $row['AmountToBePaid'] = $amountToBePaid;

            $reservations[] = $row;
        }

        echo json_encode(['success' => true, 'reservations' => $reservations]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Customer not found']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
