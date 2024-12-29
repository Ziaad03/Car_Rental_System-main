<?php
include 'db.php'; // Include the database connection

// SQL query to fetch all offices grouped by country
$sql = "SELECT Country, GROUP_CONCAT(City SEPARATOR ', ') AS Cities 
        FROM Offices 
        GROUP BY Country";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h2>Offices Grouped by Country</h2>";
    while ($row = $result->fetch_assoc()) {
        echo "<strong>" . $row['Country'] . ":</strong> " . $row['Cities'] . "<br>";
    }
} else {
    echo "No offices found.";
}
?>
