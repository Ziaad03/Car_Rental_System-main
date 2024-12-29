<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from your frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and preflight (OPTIONS) requests
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
header("Access-Control-Allow-Credentials: true"); // If using credentials (e.g., sessions)
include 'db.php'; // Database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read and decode the JSON input
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Validate the input
    if (!isset($data['role'], $data['email'], $data['password'])) {
        echo json_encode(["success" => false, "message" => "Invalid input."]);
        exit;
    }

    $role = $data['role']; // 'admin' or 'customer'
    $email = $data['email'];
    $password = $data['password'];

    // Prepare SQL based on role
    if ($role === 'admin') {
        $sql = "SELECT * FROM Admins WHERE Email = ?";
    } else {
        $sql = "SELECT * FROM Customers WHERE Email = ?";
    }

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        // Check password
        if ($password == $user['UserPassword']) {
            echo json_encode([
                "success" => true,
                "message" => "Login successful!"

            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid password."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "No user found with this email."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

$conn->close();
?>
