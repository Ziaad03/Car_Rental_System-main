<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database connection
include 'db.php';

$country = isset($_GET['country']) ? $_GET['country'] : '';

// SQL query
if ($country) {
    $sql = $conn->prepare("SELECT * FROM Offices WHERE Country = ?");
    $sql->bind_param("s", $country);
} else {
    $sql = $conn->prepare("SELECT * FROM Offices");
}

// Execute and fetch results
$sql->execute();
$result = $sql->get_result();

$offices = [];
while ($row = $result->fetch_assoc()) {
    $offices[] = $row;
}

// Return data as JSON
echo json_encode($offices);
?>
