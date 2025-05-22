<?php

// Include the database connection
include 'connection.php';

// Check if the Student ID is set
if (isset($_POST['student_id'])) {
    $student_id = $_POST['student_id'];

    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT StudentID, StudentName, AttendanceDate, AttendanceTime, ClassType FROM Attendance WHERE StudentID = ?");
    $stmt->bind_param("i", $student_id);

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Check if any rows returned
    if ($result->num_rows > 0) {
        // Fetch all results
        $attendance_records = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($attendance_records); // Return JSON response
    } else {
        echo json_encode([]); // Return an empty array if no records found
    }

    // Close the statement
    $stmt->close();
}

// Close the database connection
$conn->close();
?>