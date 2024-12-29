<?php
include 'db.php'; // Include the database connection

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phoneNumber = $_POST['phone_number'];
    $country = $_POST['country'];
    $city = $_POST['city'];

    // SQL to insert a new office into the database
    $sql = "INSERT INTO Offices (PhoneNumber, Country, City) 
            VALUES ('$phoneNumber', '$country', '$city')";

    if ($conn->query($sql) === TRUE) {
        echo "New office added successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Add New Office</title>
</head>
<body>
    <h2>Admin - Add New Office</h2>
    <form method="POST">
        <label>Phone Number:</label>
        <input type="text" name="phone_number" required><br><br>

        <label>Country:</label>
        <input type="text" name="country" required><br><br>

        <label>City:</label>
        <input type="text" name="city" required><br><br>

        <button type="submit">Add Office</button>
    </form>
</body>
</html>
