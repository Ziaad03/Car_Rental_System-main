<?php
include 'db.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $carID = $_POST['car_id'];

    // SQL to delete the car
    $sql = "DELETE FROM Cars WHERE CarID = '$carID'";

    if ($conn->query($sql) === TRUE) {
        echo "Car deleted successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Delete Car</title>
</head>
<body>
    <h2>Admin - Delete Car</h2>
    <form method="POST">
        <label>Car ID:</label>
        <input type="number" name="car_id" required><br><br>

        <button type="submit">Delete Car</button>
    </form>
</body>
</html>
