<?php
include 'connection.php';

// Insert Student Data
if ($_SERVER["REQUEST_METHOD"] == "POST" && !isset($_POST['editMode'])) {
    $Id = $_POST['idnumber'];
    $StudentName = $_POST['name'];
    $PhoneNumber = $_POST['phonenumber'];
    $Address = $_POST['address'];
    $School = $_POST['school'];
    $DOB = $_POST['birthday'];
    $Gender = $_POST['gender'];
    $GuardianName = $_POST['guardianName'];
    $Email = $_POST['email'];
    $Class = $_POST['classType'];
    $PaymentType = $_POST['paymentType'];
    $sql = "INSERT INTO student (ID_Number, Student_name, Phone_number, Address, School, DOB, Gender, Guardian_name, Email, Class, Payment_type) 
            VALUES ('$Id', '$StudentName', '$PhoneNumber', '$Address', '$School', '$DOB', '$Gender', '$GuardianName', '$Email', '$Class', '$PaymentType')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}

// Update Student Data
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['editMode']) && $_POST['editMode'] == "true") {
    $Id = $_POST['idnumber'];
    $StudentName = $_POST['name'];
    $PhoneNumber = $_POST['phonenumber'];
    $Address = $_POST['address'];
    $School = $_POST['school'];
    $DOB = $_POST['birthday'];
    $Gender = $_POST['gender'];
    $GuardianName = $_POST['guardianName'];
    $Email = $_POST['email'];
    $Class = $_POST['classType'];
    $PaymentType = $_POST['paymentType'];
    
    $sql = "UPDATE student SET 
            Student_name='$StudentName', 
            Phone_number='$PhoneNumber', 
            Address='$Address', 
            School='$School', 
            DOB='$DOB', 
            Gender='$Gender', 
            Guardian_name='$GuardianName', 
            Email='$Email', 
            Class='$Class', 
            Payment_type='$PaymentType' 
            WHERE ID_Number='$Id'";

    if (mysqli_query($conn, $sql)) {
        echo "Record updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}

// Load Student Data
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT * FROM student";
    $result = mysqli_query($conn, $sql);
    if ($result && mysqli_num_rows($result) > 0) {
        $students = [];
        while($row = mysqli_fetch_assoc($result)) {
            $students[] = $row;
        }
        echo json_encode($students);
    } else {
        echo json_encode([]);
    }
    mysqli_close($conn);
}

// Delete Student Data
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    parse_str(file_get_contents("php://input"), $delete_vars);
    $id = $delete_vars['idnumber'];
    $sql = "DELETE FROM student WHERE ID_Number = '$id'";
    if (mysqli_query($conn, $sql)) {
        echo "Record deleted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}
?>
