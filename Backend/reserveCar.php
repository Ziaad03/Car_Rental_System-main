<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'db.php'; // Include the database connection

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['plate_id'], $data['pickup_date'], $data['return_date'], $data['reservation_date'], $data['email'])) {
    echo json_encode(["success" => false, "message" => "Invalid input."]);
    exit;
}

$plate_id = $data['plate_id'];
$pickup_date = $data['pickup_date'];
$return_date = $data['return_date'];
$reservation_date = $data['reservation_date'];
$email = $data['email'];

// Get CustomerID based on email
$query = "SELECT CustomerID FROM customers WHERE Email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Customer not found."]);
    exit;
}

$customer = $result->fetch_assoc();
$customer_id = $customer['CustomerID'];

// Insert reservation
$insertQuery = "INSERT INTO reservations (PlateID, CustomerID, ReservationDate, PickupDate, ReturnDate) VALUES (?, ?, ?, ?, ?)";
$insertStmt = $conn->prepare($insertQuery);
$insertStmt->bind_param("iisss", $plate_id, $customer_id, $reservation_date, $pickup_date, $return_date);

if ($insertStmt->execute()) {
    echo json_encode(["success" => true, "message" => "Reservation successful."]);
    // change car status to Rented
    $updateQuery = "UPDATE cars SET CarStatus = 'Rented' WHERE PlateID = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param("i", $plate_id);
    $updateStmt->execute();

    
} else {
    echo json_encode(["success" => false, "message" => "Failed to make a reservation."]);
}

$stmt->close();
$conn->close();
?>
