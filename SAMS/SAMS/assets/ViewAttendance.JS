$(document).ready(function() {
    $('#searchButton').click(function() {
        var studentID = $('#student').val();

        $.ajax({
            url: 'ViewAttendance.php',
            type: 'POST',
            data: { student_id: studentID },
            success: function(data) {
                // Parse the JSON response
                var attendanceData = JSON.parse(data);
                var tbody = $('#studentTableBody');
                tbody.empty(); // Clear previous data

                // Check if any attendance records were returned
                if (attendanceData.length > 0) {
                    // Iterate through the records and append to the table
                    attendanceData.forEach(function(record) {
                        var row = `<tr>
                            <td>${record.StudentID}</td>
                            <td>${record.StudentName}</td>
                            <td>${record.AttendanceDate}</td>
                            <td>${record.AttendanceTime}</td>
                            <td>${record.ClassType}</td>
                        </tr>`;
                        tbody.append(row);
                    });
                } else {
                    // Display a message if no records found
                    tbody.append('<tr><td colspan="5" class="text-center">No records found</td></tr>');
                }
            },
            error: function() {
                alert('Error retrieving data.');
            }
        });
    });
});
