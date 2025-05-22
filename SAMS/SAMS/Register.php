<?php
include 'connection.php';

// Fetch all class data
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT Name FROM class";
    $result = mysqli_query($conn, $sql);
    $classes = [];
    if ($result && mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $classes[] = $row;
        }
        echo json_encode($classes);
    } else {
        echo json_encode([]);
    }
    mysqli_close($conn);
}
?>