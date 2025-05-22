<?php
include 'connection.php';

// Check if we have a student ID for retrieving student data
if (isset($_POST['student_id'])) {
    $student_id = $_POST['student_id'];

    // Check if additional fields for payment are provided
    if (isset($_POST['month']) && isset($_POST['amount']) && isset($_POST['class'])) {
        // Payment data provided - proceed with insertion
        $month = $_POST['month'];
        $amount = $_POST['amount'];
        $class = $_POST['class'];

        // Prepare and execute SQL query to insert payment details
        $stmt = $conn->prepare("INSERT INTO Payment (StudentID, Student_name, Class, Month, Amount) VALUES (?, (SELECT Student_name FROM STUDENT WHERE ID_Number = ?), ?, ?, ?)");
        $stmt->bind_param("issss", $student_id, $student_id, $class, $month, $amount);

        if ($stmt->execute()) {
            $response = [
                'success' => true,
                'message' => 'Payment saved successfully'
            ];
        } else {
            $response = [
                'success' => false,
                'message' => 'Failed to save payment'
            ];
        }
        
    } else {
        // Retrieve student data if no payment data is provided
        $stmt = $conn->prepare("SELECT ID_Number, Student_name, Class FROM STUDENT WHERE ID_Number = ?");
        $stmt->bind_param("i", $student_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $student = $result->fetch_assoc();
            
            // Separate classes by commas and split into an array
            $classes = explode(", ", $student['Class']);

            // Prepare the response data
            $response = [
                'success' => true,
                'student' => [
                    'ID_Number' => $student['ID_Number'],
                    'Student_name' => $student['Student_name'],
                    'Classes' => $classes
                ]
            ];
        } else {
            $response = [
                'success' => false,
                'message' => 'Student not found'
            ];
        }
    }
    
    // Send the JSON response
    echo json_encode($response);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request'
    ]);
}

$conn->close();
?>
