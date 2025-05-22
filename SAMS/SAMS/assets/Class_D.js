$(document).ready(function() {
    fetchClasses();

    $("#classForm").on("submit", function(event) {
        event.preventDefault();
        let classId = $("#classId").val();
        let className = $("#className").val();
        let editMode = $("#editMode").val();
        let data = { classId: classId, className: className };
        if (editMode) {
            data.editMode = true;
        }
        $.ajax({
            url: 'Class_Manage.php', // Update with your PHP script path
            type: 'POST',
            data: data,
            success: function(response) {
                alert(response);
                fetchClasses();
                $("#classForm")[0].reset();
                $("#editMode").val("");
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });

    function fetchClasses() {
        $.ajax({
            url: 'Class_Manage.php', // Update with your PHP script path for fetching data
            type: 'GET',
            success: function(response) {
                let classes = JSON.parse(response);
                let tableContent = '';
                if (classes.length > 0) {
                    classes.forEach(function(cls) {
                        tableContent += `<tr>
                                            <td>${cls.ClassID}</td>
                                            <td>${cls.Name}</td>
                                            <td>
                                                <button class='btn btn-primary edit-btn' data-id='${cls.ClassID}' data-name='${cls.Name}'><i class='fas fa-edit'></i></button>
                                                <button class='btn btn-danger delete-btn' data-id='${cls.ClassID}'><i class='fas fa-trash-alt'></i></button>
                                            </td>
                                         </tr>`;
                    });
                } else {
                    tableContent = '<tr><td colspan="3">No classes found</td></tr>';
                }
                $("#classTable").html(tableContent);
                attachDeleteEvent();
                attachEditEvent();
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }

    function attachDeleteEvent() {
        $(".delete-btn").on("click", function() {
            let classId = $(this).data("id");
            $.ajax({
                url: 'Class_Manage.php', // Update with your PHP script path
                type: 'DELETE',
                data: { classId: classId },
                success: function(response) {
                    alert(response);
                    fetchClasses();
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        });
    }

    function attachEditEvent() {
        $(".edit-btn").on("click", function() {
            let classId = $(this).data("id");
            let className = $(this).data("name");
            $("#classId").val(classId);
            $("#className").val(className);
            $("#editMode").val(true);
        });
    }
});
