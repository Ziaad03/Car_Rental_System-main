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

    $sql = "SELECT PaymentID, PaymentDate, Amount 
            FROM Payments
            WHERE PaymentDate BETWEEN '$startDate' AND '$endDate'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $payments = [];
        while ($row = $result->fetch_assoc()) {
            $payments[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode(['start_date' => $startDate, 'end_date' => $endDate, 'payments' => $payments]);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'No payments found for the specified period.']);
    }
}
?>
