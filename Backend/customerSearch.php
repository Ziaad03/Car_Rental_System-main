<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'db.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $country = $_GET['country'] ?? '';
    $city = $_GET['city'] ?? '';
    $modelName = $_GET['model_name'] ?? '';
    $minModelYear = $_GET['min_model_year'] ?? 0;
    $pickupDate = $_GET['pickup_date'] ?? '';
    $returnDate = $_GET['return_date'] ?? '';
    $brandName = $_GET['brand_name'] ?? '';

    // SQL query to search for cars based on the provided criteria
    $sql = "SELECT Cars.BrandName,Cars.PlateID ,Cars.CarID, Cars.ModelName, Cars.ModelYear, Cars.RentValue, Cars.CarStatus, Offices.Country, Offices.City,offices.OfficeName 
            FROM Cars 
            JOIN Offices ON Cars.OfficeID = Offices.OfficeID
            WHERE Cars.CarStatus = 'Active'";

    // Add filters only if values are provided
    if (!empty($country)) {
        $sql .= " AND Offices.Country LIKE '%$country%'";
    }
    if (!empty($brandName)) {
        $sql .= " AND Cars.BrandName LIKE '%$brandName%'";
    }
    if (!empty($city)) {
        $sql .= " AND Offices.City LIKE '%$city%'";
    }
    if (!empty($modelName)) {
        $sql .= " AND Cars.ModelName LIKE '%$modelName%'";
    }
    if (!empty($minModelYear)) {
        $sql .= " AND Cars.ModelYear >= '$minModelYear'";
    }
    if (!empty($pickupDate) && !empty($returnDate)) {
        $sql .= " AND Cars.CarID NOT IN (
                    SELECT PlateID FROM Reservations 
                    WHERE ('$pickupDate' BETWEEN PickupDate AND ReturnDate)
                    OR ('$returnDate' BETWEEN PickupDate AND ReturnDate)
                )";
    }

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $cars = [];
        while ($row = $result->fetch_assoc()) {
            $cars[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $cars]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No cars available matching the criteria.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
