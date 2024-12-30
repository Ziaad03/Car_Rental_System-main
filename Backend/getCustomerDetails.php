<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from your frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and preflight (OPTIONS) requests
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
header("Access-Control-Allow-Credentials: true"); // If using credentials (e.g., sessions)
// Database connection
include 'db.php'; // Include the database connection

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed."]));
}

// Get the email from the request
$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? null;

if (!$email) {
    echo json_encode(["success" => false, "message" => "Email is required."]);
    exit;
}

// Query to fetch first name and last name
$sql = "SELECT FirstName, LastName FROM customers WHERE Email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(["success" => true, "data" => $row]);
} else {
    echo json_encode(["success" => false, "message" => "Customer not found."]);
}

$stmt->close();
$conn->close();
?>
