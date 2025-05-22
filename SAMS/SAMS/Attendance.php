<?php
include 'connection.php';

// Fetch all class data and current day's attendance data
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

    // Fetch current day's attendance data
    $sqlAttendance = "SELECT StudentID, StudentName, AttendanceDate, AttendanceTime, ClassType 
                      FROM attendance 
                      WHERE AttendanceDate = CURDATE()"; // Filter by today's date
    $resultAttendance = mysqli_query($conn, $sqlAttendance);
    $attendanceRecords = [];
    if ($resultAttendance && mysqli_num_rows($resultAttendance) > 0) {
        while($row = mysqli_fetch_assoc($resultAttendance)) {
            $attendanceRecords[] = $row;
        }
    }

    // Return both class data and attendance records as a single JSON response
    echo json_encode([
        'classes' => $classes,
        'attendance' => $attendanceRecords
    ]);

    mysqli_close($conn);
}

// Insert attendance data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve data from the request
    $studentID = $_POST['StudentID'];
    $studentName = $_POST['StudentName'];
    $attendanceDate = $_POST['AttendanceDate'];
    $attendanceTime = $_POST['AttendanceTime'];
    $classType = $_POST['ClassType'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO attendance (StudentID, StudentName, AttendanceDate, AttendanceTime, ClassType) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $studentID, $studentName, $attendanceDate, $attendanceTime, $classType);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(["message" => "Attendance record inserted successfully."]);
    } else {
        echo json_encode(["error" => "Error inserting record: " . $stmt->error]);
    }

    // Close the statement and connection
    $stmt->close();
    mysqli_close($conn);
}
?>
