<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from your frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and preflight (OPTIONS) requests
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
header("Access-Control-Allow-Credentials: true"); // If using credentials (e.g., sessions)
include 'db.php'; // Database connection

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit;
}

// Get the search parameters from the frontend (via POST)
$searchCategory = $_POST['searchCategory'] ?? '';  // Assuming you pass the category as POST
$query = $_POST['query'] ?? '';  // Assuming you pass the query as POST

// Check if both parameters are provided
if (empty($searchCategory) || empty($query)) {
    echo json_encode(["error" => "Missing search category or query."]);
    exit;
}

// Initialize variables for dynamic SQL query
$column = '';
$additionalJoins = ''; // Dynamic joins added here if needed

// Prepare the SQL query based on the selected search category
switch ($searchCategory) {
    case "Car ID":
        $column = "Cars.CarID";
        break;
    case "Plate ID":
        $column = "Cars.PlateID";
        break;
    case "Model Name":
        $column = "Cars.ModelName";
        break;
    case "Model Year":
        $column = "Cars.ModelYear";
        break;
    case "Rent Value":
        $column = "Cars.RentValue";
        break;
    case "Customer ID":
        $column = "Customers.CustomerID";
        $additionalJoins = "JOIN Customers ON Reservations.CustomerID = Customers.CustomerID";
        break;
    case "Email":
        $column = "Customers.Email";
        $additionalJoins = "JOIN Customers ON Reservations.CustomerID = Customers.CustomerID";
        break;
    case "Phone Number":
        $column = "Customers.PhoneNumber";
        $additionalJoins = "JOIN Customers ON Reservations.CustomerID = Customers.CustomerID";
        break;
    case "Reservation ID":
        $column = "Reservations.ReservationID";
        $additionalJoins = "JOIN Customers ON Reservations.CustomerID = Customers.CustomerID";
        break;
    case "Plate ID":
        $column = "Reservations.PlateID";
        $additionalJoins = "JOIN Customers ON Reservations.CustomerID = Customers.CustomerID";
        
        break;
    case "Reservation Date":
        $column = "Reservations.ReservationDate";
        $additionalJoins = "JOIN Customers ON Reservations.CustomerID = Customers.CustomerID";
        break;
    case "Pickup Date":
        $column = "Reservations.PickupDate";
        $additionalJoins = "JOIN Customers ON Reservations.CustomerID = Customers.CustomerID";
        break;
    case "Return Date":
        $column = "Reservations.ReturnDate";
        $additionalJoins = "JOIN Customers ON Reservations.CustomerID = Customers.CustomerID";
        break;
    default:
        echo json_encode(["error" => "Invalid search category."]);
        exit;
}

// Sanitize the query parameter to prevent SQL injection
$query = $conn->real_escape_string($query);

// SQL query with dynamic WHERE clause based on the category
$sql = "
SELECT 
    Cars.CarID,
    Cars.PlateID,
    Cars.BrandName,
    Cars.ModelName,
    Cars.ModelYear,
    Cars.RentValue,
    Cars.CarStatus,
    Offices.OfficeName AS Office,
    Offices.City AS OfficeCity,
    Offices.Country AS OfficeCountry,
    Reservations.ReservationDate,
    Reservations.PickupDate,
    Reservations.ReturnDate,
    Payments.PaymentDate,
    Payments.Amount";

// // Add Customer-specific columns only if relevant
if ($searchCategory == 'Email' || $searchCategory == 'Customer ID' || $searchCategory == 'Phone Number' || $searchCategory == 'Reservation ID') {
    $sql .= ", Customers.Email AS CustomerEmail";
}

$sql .= "
FROM 
    Cars
LEFT JOIN 
    Offices ON Cars.OfficeID = Offices.OfficeID
LEFT JOIN 
    Reservations ON Cars.PlateID = Reservations.PlateID
LEFT JOIN 
    Payments ON Reservations.ReservationID = Payments.ReservationID
$additionalJoins
WHERE 
    $column = ?;
";

// Prepare the statement
if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("s", $query);  // Bind the parameter dynamically
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();
    
    // Fetch all results
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Return the results as JSON
    if (empty($data)) {
        echo json_encode(["message" => "No results found."]);
    } else {
        echo json_encode($data);
    }
} else {
    echo json_encode(["error" => "Failed to prepare SQL statement: " . $conn->error]);
}


// Close the connection
$conn->close();
?>
