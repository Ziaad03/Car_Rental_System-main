<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
include '../db.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['customer_id'])) {
    $customerID = $_GET['customer_id'];

    $sql = "SELECT Reservations.ReservationID, Reservations.ReservationDate, 
                   Cars.ModelName, Cars.PlateID, Customers.FirstName, Customers.LastName
            FROM Reservations
            JOIN Cars ON Reservations.PlateID = Cars.PlateID
            JOIN Customers ON Reservations.CustomerID = Customers.CustomerID
            WHERE Reservations.CustomerID = '$customerID'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $reservations = [];
        while ($row = $result->fetch_assoc()) {
            $reservations[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode(['customer_id' => $customerID, 'reservations' => $reservations]);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'No reservations found for the specified customer.']);
    }
}
?>
