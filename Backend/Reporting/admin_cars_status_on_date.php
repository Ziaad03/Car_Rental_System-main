<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
include '../db.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['date'])) {
    $date = $_GET['date'];

    // Query for cars that are "Rented" on the given date
    $rentedQuery = "SELECT Cars.CarID, Cars.PlateID, Cars.ModelName, Cars.ModelYear, 'Rented' AS Status
                    FROM Cars
                    JOIN Reservations ON Cars.PlateID = Reservations.PlateID
                    WHERE '$date' BETWEEN Reservations.PickupDate AND Reservations.ReturnDate";

    // Query for cars that are "Active" on the given date
    $activeQuery = "SELECT CarID, PlateID, ModelName, ModelYear, 'Active' AS Status
                    FROM Cars
                    WHERE CarStatus = 'Active' 
                      AND CarID NOT IN (
                          SELECT Cars.CarID
                          FROM Cars
                          JOIN Reservations ON Cars.PlateID = Reservations.PlateID
                          WHERE '$date' BETWEEN Reservations.PickupDate AND Reservations.ReturnDate
                      )";

    // Combine results
    $finalQuery = "$rentedQuery UNION ALL $activeQuery";

    $result = $conn->query($finalQuery);

    if ($result->num_rows > 0) {
        $cars = [];
        while ($row = $result->fetch_assoc()) {
            $cars[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode(['date' => $date, 'cars' => $cars]);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'No cars found.']);
    }
}
?>
