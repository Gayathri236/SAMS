$(document).ready(function() {
    fetchStudents();

    $("#searchBar").on("keyup", function() {
        searchStudents();
    });
});

function fetchStudents() {
    $.ajax({
        url: 'Student_Manage.php', // Update with your PHP script path for fetching data
        type: 'GET',
        success: function(response) {
            let students = JSON.parse(response);
            let tableContent = '';
            if (students.length > 0) {
                students.forEach(function(student) {
                    tableContent += `<tr>
                                        <td>${student.ID_Number}</td>
                                        <td>${student.Student_name}</td>
                                        <td>${student.Phone_number}</td>
                                        <td>${student.Address}</td>
                                        <td>${student.School}</td>
                                        <td>${student.DOB}</td>
                                        <td>${student.Gender}</td>
                                        <td>${student.Guardian_name}</td>
                                        <td>${student.Email}</td>
                                        <td>${student.Class}</td>
                                        <td>${student.Payment_type}</td>
                                        <td>
                                            <button class='btn btn-primary edit-btn' data-student='${JSON.stringify(student)}'><i class='fas fa-edit'></i></button>
                                            <button class='btn btn-danger delete-btn' data-id='${student.ID_Number}'><i class='fas fa-trash-alt'></i></button>
                                        </td>
                                     </tr>`;
                });
            } else {
                tableContent = '<tr><td colspan="12">No students found</td></tr>';
            }
            $("#studentTableBody").html(tableContent);
            attachDeleteEvent();
            attachEditEvent();
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

function searchStudents() {
    let filter = $("#searchBar").val().toLowerCase();
    $("#studentTableBody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(filter) > -1);
    });
}

function attachDeleteEvent() {
    // Add event listeners for delete buttons
    $(".delete-btn").on("click", function() {
        let id = $(this).data("id");
        if (confirm("Are you sure you want to delete this student?")) {
            $.ajax({
                url: 'Student_Manage.php', // Update with your PHP script path for handling deletion
                type: 'DELETE',
                data: { idnumber: id },
                success: function(response) {
                    alert(response);
                    fetchStudents();
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        }
    });
}

function attachEditEvent() {
    $(".edit-btn").on("click", function() {
        let student = $(this).data("student");
        // Encode the student data as URL parameters, excluding class_type
        let queryString = `idnumber=${student.ID_Number}&name=${encodeURIComponent(student.Student_name)}&phone=${student.Phone_number}&address=${encodeURIComponent(student.Address)}&school=${encodeURIComponent(student.School)}&birthday=${student.DOB}&gender=${student.Gender}&guardianName=${encodeURIComponent(student.Guardian_name)}&email=${encodeURIComponent(student.Email)}&paymentType=${student.Payment_type}`;
        window.location.href = 'Registration.html?' + queryString;
    });
}

