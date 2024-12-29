<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from your frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and preflight (OPTIONS) requests
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
header("Access-Control-Allow-Credentials: true"); // If using credentials (e.g., sessions)
include 'db.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $carID = $_POST['car_id'];
    $plateID = $_POST['plate_id'] ?? null;
    $officeID = $_POST['office_id'] ?? null;
    $modelName = $_POST['model_name'] ?? null;
    $modelYear = $_POST['model_year'] ?? null;
    $rentValue = $_POST['rent_value'] ?? null;
    $carStatus = $_POST['car_status'] ?? null;

    // Fetch existing car data
    $sql = "SELECT * FROM Cars WHERE CarID = '$carID'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();

        // Retain old values if the input field is empty
        $plateID = $plateID ?: $row['PlateID'];
        $officeID = $officeID ?: $row['OfficeID'];
        $modelName = $modelName ?: $row['ModelName'];
        $modelYear = $modelYear ?: $row['ModelYear'];
        $rentValue = $rentValue ?: $row['RentValue'];
        $carStatus = $carStatus ?: $row['CarStatus'];

        // Update query with all fields
        $updateSql = "UPDATE Cars 
                      SET PlateID = '$plateID', 
                          OfficeID = '$officeID', 
                          ModelName = '$modelName', 
                          ModelYear = '$modelYear', 
                          RentValue = '$rentValue', 
                          CarStatus = '$carStatus' 
                      WHERE CarID = '$carID'";

        if ($conn->query($updateSql) === TRUE) {
            echo "Car updated successfully!";
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo "Car not found.";
    }
}
?>
