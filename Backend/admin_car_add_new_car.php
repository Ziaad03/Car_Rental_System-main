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
    $plateID = $_POST['plate_id'];
    $officeID = $_POST['office_id'];
    $modelName = $_POST['model_name'];
    $modelYear = $_POST['model_year'];
    $rentValue = $_POST['rent_value'];
    $carStatus = $_POST['car_status'];

    // SQL to insert a new car into the database
    $sql = "INSERT INTO Cars (PlateID, OfficeID, ModelName, ModelYear, RentValue, CarStatus) 
            VALUES ('$plateID', '$officeID', '$modelName', '$modelYear', '$rentValue', '$carStatus')";

    if ($conn->query($sql) === TRUE) {
        echo "New car added successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

