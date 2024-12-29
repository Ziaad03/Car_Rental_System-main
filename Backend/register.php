<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from your frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and preflight (OPTIONS) requests
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
header("Access-Control-Allow-Credentials: true"); // If using credentials (e.g., sessions)
include 'db.php'; // Database connection

// Set response header for JSON
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the input data from the frontend (expecting JSON format)
    $inputData = json_decode(file_get_contents('php://input'), true);

    // Validate input
    if (!isset($inputData['firstName'], $inputData['lastName'], $inputData['email'], $inputData['password'], $inputData['phoneNumber'])) {
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit;
    }

    $role = 'customer'; // Set role here (or you could pass it from frontend)
    $firstName = $inputData['firstName'];
    $lastName = $inputData['lastName'];
    $phoneNumber = $inputData['phoneNumber'];
    $email = $inputData['email'];
    $password = $inputData['password'];

    // Prepare SQL query based on role
    if ($role === 'admin') {


        $sql = "INSERT INTO Admins (FirstName, LastName, PhoneNumber, Email, UserPassword, Sex)
                VALUES ('$firstName', '$lastName', '$phoneNumber', '$email', '$password', '$sex')";
    } else {
        $sql = "INSERT INTO Customers (FirstName, LastName, PhoneNumber, Email, UserPassword)
                VALUES ('$firstName', '$lastName', '$phoneNumber', '$email', '$password')";
    }

    // Execute the query and check for errors
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Registration successful!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }
}
?>
