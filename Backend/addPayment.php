<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reservationId = $_POST['reservationId'];
    $amount = $_POST['amount'];
    $paymentDate = $_POST['paymentDate'];

    if ($reservationId && $amount && $paymentDate) {
        $query = $conn->prepare("
            INSERT INTO Payments (ReservationID, PaymentDate, Amount)
            VALUES (?, ?, ?)
        ");
        $query->bind_param("isd", $reservationId, $paymentDate, $amount);

        if ($query->execute()) {
            echo json_encode(['success' => true, 'message' => 'Payment recorded successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to record payment']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
