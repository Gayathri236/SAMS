<?php
session_start();
include 'connection.php'; // Include your database connection file

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if the user exists in the database
    $sql = "SELECT * FROM User WHERE Username = ? AND Password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User found
        $user = $result->fetch_assoc(); // Fetch user data
        $_SESSION['username'] = $username; // Save username to session

        // Return a JSON response with the URL for redirection
        if ($user['Role'] == 'Admin') {
            echo json_encode(['url' => 'dashboard.html', 'username' => $username]);
        } elseif ($user['Role'] == 'Checker') {
            echo json_encode(['url' => 'Checker.html']);
        } else {
            echo json_encode(['error' => 'Unauthorized role.']);
        }
    } else {
        // User not found
        echo json_encode(['error' => 'Invalid username or password.']);
    }
    exit(); // Ensure we exit after outputting JSON
}
?>
