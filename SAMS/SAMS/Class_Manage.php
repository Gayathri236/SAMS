<?php
include 'connection.php';

// Handle form submission for saving class data
if ($_SERVER["REQUEST_METHOD"] == "POST" && !isset($_POST['editMode'])) {
    $classId = $_POST['classId'];
    $className = $_POST['className'];
    $sql = "INSERT INTO class (ClassID, Name) VALUES ('$classId', '$className')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}

// Handle form submission for updating class data
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['editMode'])) {
    $classId = $_POST['classId'];
    $className = $_POST['className'];
    $sql = "UPDATE class SET Name='$className' WHERE ClassID='$classId'";
    if (mysqli_query($conn, $sql)) {
        echo "Record updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}

// Handle delete request
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    parse_str(file_get_contents("php://input"), $delete_vars);
    $classId = $delete_vars['classId'];
    $sql = "DELETE FROM class WHERE ClassID = '$classId'";
    if (mysqli_query($conn, $sql)) {
        echo "Record deleted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}

// Fetch all class data
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT * FROM class";
    $result = mysqli_query($conn, $sql);
    if ($result && mysqli_num_rows($result) > 0) {
        $classes = [];
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
