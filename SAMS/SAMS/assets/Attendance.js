$(document).ready(function () {
    loadData();
    initializeScanner(); // Initialize the scanner when the document is ready

    function loadData() {
        $.ajax({
            url: "Attendance.php", // Ensure this path is correct
            type: "GET",
            success: function (response) {
                console.log("Response: ", response); // Debugging line
                let data = JSON.parse(response);
                
                // Load classes
                let classes = data.classes;
                let classSelect = $("#class_type");
                classSelect.empty(); // Clear existing options
                classes.forEach(function (cls) {
                    console.log("Class Name: ", cls.Name); // Debugging line
                    classSelect.append(
                        `<option value="${cls.Name}">${cls.Name}</option>`
                    );
                });

                // Load attendance records
                let attendanceRecords = data.attendance;
                let attendanceBody = $("#attendance-body"); // ID of the element to display records
                attendanceBody.empty(); // Clear existing records
                attendanceRecords.forEach(function (record) {
                    attendanceBody.append(
                        `<tr>
                            <td>${record.StudentID}</td>
                            <td>${record.StudentName}</td>
                            <td>${record.AttendanceDate}</td>
                            <td>${record.AttendanceTime}</td>
                            <td>${record.ClassType}</td>
                        </tr>`
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            },
        });
    }

    // Initialize scanner function
    function initializeScanner() {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: { width: 250, height: 250 },
            fps: 20,
        });

        function success(result) {
            // Split result by lines
            const lines = result.split('\n');

            // Initialize variables to hold the values
            let idNumber = '';
            let name = '';
            let classes = '';
            let paymentType = '';

            // Iterate through each line and extract relevant information
            lines.forEach(line => {
                if (line.startsWith('ID Number:')) {
                    idNumber = line.replace('ID Number:', '').trim();
                } else if (line.startsWith('Name:')) {
                    name = line.replace('Name:', '').trim();
                } else if (line.startsWith('Classes:')) {
                    classes = line.replace('Classes:', '').trim();
                } else if (line.startsWith('Payment Type:')) {
                    paymentType = line.replace('Payment Type:', '').trim();
                }
            });

            // Populate input fields
            document.getElementById("student-id").value = idNumber;
            document.getElementById("student-name").value = name;
            document.getElementById("student-class").value = classes;
            document.getElementById("payment-type").value = paymentType;

                        // Clear the scanner for the next scan
            scanner.clear();
        }

        function error(err) {
            console.error("Error scanning QR code: ", err);
        }

        // Render scanner
        scanner.render(success, error);
    }

    // Handle attendance marking
    $("#mark-attendance").click(function () {
        const studentID = $("#student-id").val();
        const studentName = $("#student-name").val();
        const attendanceDate = formatDate($("#current-date").val());
        const attendanceTime = formatTime($("#current-time").val());
        const classType = $("#class_type").val();

        // Check if all required fields are filled
        if (!studentID || !studentName || !attendanceDate || !attendanceTime || !classType) {
            alert("Please fill in all the details before marking attendance.");
            return;
        }

        $.ajax({
            url: "Attendance.php",
            type: "POST",
            data: {
                StudentID: studentID,
                StudentName: studentName,
                AttendanceDate: attendanceDate,
                AttendanceTime: attendanceTime,
                ClassType: classType,
            },
            success: function (response) {
                const result = JSON.parse(response);
                
                // Show success message after marking attendance
                alert(result.message || result.error); // Notify user of success or error

                // Refresh the attendance table
                loadData();

                // Clear the input fields
                $("#student-id").val('');
                $("#student-name").val('');
                $("#student-class").val('');
                $("#payment-type").val('');
                $("#class_type").val('');

                // Reset the scanner to allow for new scans
                initializeScanner();
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            },
        });
    });

    // Function to format date to YYYY-MM-DD
    function formatDate(dateString) {
        const dateParts = dateString.split('/');
        return `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`; // Adjusting date format
    }

    // Function to format time to HH:MM:SS
    function formatTime(timeString) {
        const timeParts = timeString.split(':');
        return `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}:${'00'}`; // Set seconds to 00
    }

    // Update date and time fields every second
    function updateDateTime() {
        const now = new Date();
        document.getElementById('current-date').value = now.toLocaleDateString('en-GB'); // Adjusted to 'en-GB' for DD/MM/YYYY
        document.getElementById('current-time').value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }); // Now includes seconds
    }

    setInterval(updateDateTime, 1000);
});
