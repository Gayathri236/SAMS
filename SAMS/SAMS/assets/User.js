$(document).ready(function() {
    fetchUsers();

    // Handle form submission for adding/editing users
    $("#userForm").on("submit", function(event) {
        event.preventDefault();
        let userId = $("#userId").val();
        let name = $("#name").val();
        let telephone = $("#telephone").val();
        let username = $("#username").val();
        let password = $("#password").val();
        let role = $("#role").val();
        let editMode = $("#editMode").val();
        
        let data = { userId: userId, name: name, telephone: telephone, username: username, password: password, role: role };
        
        if (editMode) {
            data.editMode = true;
        }
        
        $.ajax({
            url: 'User.php',
            type: 'POST',
            data: data,
            success: function(response) {
                alert(response);
                fetchUsers();
                $("#userForm")[0].reset();
                $("#editMode").val("");
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });

    // Fetch and display users in the table
    function fetchUsers() {
        $.ajax({
            url: 'User.php',
            type: 'GET',
            success: function(response) {
                let users = JSON.parse(response);
                renderUserTable(users);
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }

    // Render users in the table
    function renderUserTable(users) {
        let tableContent = '';
        if (users.length > 0) {
            users.forEach(function(user) {
                tableContent += `<tr>
                                    <td>${user.UserID}</td>
                                    <td>${user.Name}</td>
                                    <td>${user.Telephone}</td>
                                    <td>${user.Username}</td>
                                    <td>****</td>
                                    <td>${user.Role}</td>
                                    <td>
                                        <button class='btn btn-primary edit-btn' data-id='${user.UserID}' data-name='${user.Name}' data-telephone='${user.Telephone}' data-username='${user.Username}' data-role='${user.Role}' data-password='${user.Password}'><i class='fas fa-edit'></i></button>
                                        <button class='btn btn-danger delete-btn' data-id='${user.UserID}'><i class='fas fa-trash-alt'></i></button>
                                    </td>
                                 </tr>`;
            });
        } else {
            tableContent = '<tr><td colspan="6">No users found</td></tr>';
        }
        $("#userTable").html(tableContent);
        attachDeleteEvent();
        attachEditEvent();
    }

    // Filter user details based on search input
    $("#searchInput").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $("#userTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    function attachDeleteEvent() {
        $(".delete-btn").on("click", function() {
            let userId = $(this).data("id");
            $.ajax({
                url: 'User.php',
                type: 'DELETE',
                data: { userId: userId },
                success: function(response) {
                    alert(response);
                    fetchUsers();
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        });
    }

    function attachEditEvent() {
        $(".edit-btn").on("click", function() {
            let userId = $(this).data("id");
            let name = $(this).data("name");
            let telephone = $(this).data("telephone");
            let username = $(this).data("username");
            let role = $(this).data("role");
            let password = $(this).data("password");

            $("#userId").val(userId);
            $("#name").val(name);
            $("#telephone").val(telephone);
            $("#username").val(username);
            $("#role").val(role);
            $("#password").val(password);
            $("#editMode").val(true);
        });
    }
});
