<?php
include 'connection.php';

// Handle form submission for saving user data
if ($_SERVER["REQUEST_METHOD"] == "POST" && !isset($_POST['editMode'])) {
    $userId = $_POST['userId'];
    $name = $_POST['name'];
    $telephone = $_POST['telephone'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    // Only hash the password if it's not empty
    if (!empty($password)) {
        // Commenting this out as per your requirement
        // $password = password_hash($password, PASSWORD_BCRYPT);
    } else {
        // Fetch existing password if empty to avoid changing it
        $sql = "SELECT Password FROM User WHERE UserID='$userId'";
        $result = mysqli_query($conn, $sql);
        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $password = $row['Password'];
        }
    }

    $sql = "INSERT INTO User (UserID, Name, Telephone, Username, Password, Role) VALUES ('$userId', '$name', '$telephone', '$username', '$password', '$role')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}

// Handle form submission for updating user data
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['editMode'])) {
    $userId = $_POST['userId'];
    $name = $_POST['name'];
    $telephone = $_POST['telephone'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    // Only hash the password if it's not empty
    if (!empty($password)) {
        // Commenting this out as per your requirement
        // $password = password_hash($password, PASSWORD_BCRYPT);
        $sql = "UPDATE User SET Name='$name', Telephone='$telephone', Username='$username', Password='$password', Role='$role' WHERE UserID='$userId'";
    } else {
        $sql = "UPDATE User SET Name='$name', Telephone='$telephone', Username='$username', Role='$role' WHERE UserID='$userId'";
    }

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
    $userId = $delete_vars['userId'];
    $sql = "DELETE FROM User WHERE UserID = '$userId'";
    if (mysqli_query($conn, $sql)) {
        echo "Record deleted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}

// Fetch all user data
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT * FROM User";
    $result = mysqli_query($conn, $sql);
    if ($result && mysqli_num_rows($result) > 0) {
        $users = [];
        while($row = mysqli_fetch_assoc($result)) {
            $users[] = $row;
        }
        echo json_encode($users);
    } else {
        echo json_encode([]);
    }
    mysqli_close($conn);
}
?>
