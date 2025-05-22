document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send the login data to login.php
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'username': username,
            'password': password
        })
    })
    .then(response => {
        // Check if the response is ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        if (data.error) {
            // If there's an error, show an alert
            alert(data.error);
        } else {
            // Redirect to the new page if login is successful
            window.location.href = data.url; // Use the URL from the JSON response
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    });
});
