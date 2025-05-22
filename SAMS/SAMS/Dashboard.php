<?php
session_start();
include 'connection.php'; // Include your database connection file

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Fetch the username from the session
$username = isset($_SESSION['username']) ? $_SESSION['username'] : 'Guest';

// Initialize counts
$student_count = 0;
$class_count = 0;
$total_income = 0.00; // Initialize total income

// Query to count all students
$student_query = "SELECT COUNT(*) as total FROM student";
$student_result = $conn->query($student_query);

if ($student_result) {
    $row = $student_result->fetch_assoc();
    $student_count = $row['total'];
}

// Query to count all classes
$class_query = "SELECT COUNT(*) as total FROM class";
$class_result = $conn->query($class_query);

if ($class_result) {
    $row = $class_result->fetch_assoc();
    $class_count = $row['total'];
}

// Query to calculate total income for the current month
$current_month = date('F'); // Get current month name 
$income_query = "SELECT SUM(Amount) as total FROM Payment WHERE Month = ?";
$income_stmt = $conn->prepare($income_query);
$income_stmt->bind_param("s", $current_month);
$income_stmt->execute();
$income_result = $income_stmt->get_result();

if ($income_result) {
    $row = $income_result->fetch_assoc();
    $total_income = $row['total'] ? (float)$row['total'] : 0.00; // Ensure it's a float
}

// Prepare the response as JSON
$response = [
    'studentCount' => $student_count,
    'classCount' => $class_count,
    'totalIncome' => number_format($total_income, 2), // Format total income
    'date' => date('d.m.Y'), // Current date
    'username' => $username // Add username to response
];

// Set the content type to application/json
header('Content-Type: application/json');

// Output the JSON-encoded response
echo json_encode($response);

// Close the database connection
$conn->close();
?>
