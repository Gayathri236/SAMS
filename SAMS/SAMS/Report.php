<?php
include 'connection.php';

header('Content-Type: application/json'); // Set content type to JSON

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Fetch class data
    $sqlClasses = "SELECT Name FROM class";
    $resultClasses = mysqli_query($conn, $sqlClasses);
    $classes = [];

    if ($resultClasses && mysqli_num_rows($resultClasses) > 0) {
        while($row = mysqli_fetch_assoc($resultClasses)) {
            $classes[] = $row;
        }
    }

    // Return class data in JSON format
    echo json_encode(["classes" => $classes]);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Fetch data based on selected class and month
    $selectedClass = $_POST['class'];
    $selectedMonth = $_POST['month'];

    $sqlPayments = "SELECT StudentID, Student_name, Class, Month, Amount 
                    FROM Payment 
                    WHERE Class = ? AND Month = ?";
    
    $stmt = $conn->prepare($sqlPayments);
    $stmt->bind_param("ss", $selectedClass, $selectedMonth);
    $stmt->execute();
    $resultPayments = $stmt->get_result();
    $payments = [];

    if ($resultPayments && $resultPayments->num_rows > 0) {
        while ($row = $resultPayments->fetch_assoc()) {
            $payments[] = $row;
        }
    }

    // Return payment data in JSON format
    echo json_encode(["payments" => $payments]);
    mysqli_close($conn);
}
?>
