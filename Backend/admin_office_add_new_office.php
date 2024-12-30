<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from your frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and preflight (OPTIONS) requests
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
header("Access-Control-Allow-Credentials: true"); // If using credentials (e.g., sessions)
include 'db.php'; // Include the database connection

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phoneNumber = $_POST['office_phone'];
    $country = $_POST['office_country'];
    $city = $_POST['office_city'];
    $name = $_POST['office_name'];

    // SQL to insert a new office into the database
    $sql = "INSERT INTO Offices (OfficeName, PhoneNumber, Country, City) 
            VALUES ('$name','$phoneNumber', '$country', '$city')";

    if ($conn->query($sql) === TRUE) {
        echo "New office added successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
