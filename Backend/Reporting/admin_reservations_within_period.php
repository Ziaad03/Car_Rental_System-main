<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
include '../db.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['start_date'], $_GET['end_date'])) {
    $startDate = $_GET['start_date'];
    $endDate = $_GET['end_date'];

    $sql = "SELECT Reservations.ReservationID, Reservations.ReservationDate, 
                   Cars.ModelName, Cars.PlateID, Customers.FirstName, Customers.LastName, Customers.Email
            FROM Reservations
            JOIN Cars ON Reservations.PlateID = Cars.PlateID
            JOIN Customers ON Reservations.CustomerID = Customers.CustomerID
            WHERE ReservationDate BETWEEN '$startDate' AND '$endDate'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $reservations = [];
        while ($row = $result->fetch_assoc()) {
            $reservations[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $reservations]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No reservations found for the specified period.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request. Please provide start_date and end_date.']);
}
?>
