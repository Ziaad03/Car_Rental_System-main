<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
include '../db.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['plate_id'], $_GET['start_date'], $_GET['end_date'])) {
    $plateID = $_GET['plate_id'];
    $startDate = $_GET['start_date'];
    $endDate = $_GET['end_date'];

    $sql = "SELECT Reservations.ReservationID, Reservations.ReservationDate, 
                   Cars.ModelName, Cars.PlateID, Reservations.PickupDate, Reservations.ReturnDate
            FROM Reservations
            JOIN Cars ON Reservations.PlateID = Cars.PlateID
            WHERE Reservations.PlateID = '$plateID' 
            AND ReservationDate BETWEEN '$startDate' AND '$endDate'";

    $result = $conn->query($sql);

    $data = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No reservations found for the specified car and period.']);
    }
}
?>
