// Event listener for the Search button
document.getElementById("search-button").addEventListener("click", function () {
    const studentId = document.getElementById("search-student-id").value;

    if (!studentId) {
        alert("Please enter a Student ID.");
        return;
    }

    fetch(`Payment.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `student_id=${studentId}`
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // Populate the text fields
            document.getElementById("student-id").value = data.student.ID_Number;
            document.getElementById("student-name").value = data.student.Student_name;

            // Clear previous options and add each class as a separate option
            const paymentClassDropdown = document.getElementById("payment-class");
            paymentClassDropdown.innerHTML = '';
            data.student.Classes.forEach(className => {
                const option = document.createElement("option");
                option.value = className;
                option.textContent = className;
                paymentClassDropdown.appendChild(option);
            });
        } else {
            alert(data.message);
        }
    })
    .catch((error) => {
        console.error("Error fetching student details:", error);
        alert("There was an error fetching the student details. Please try again.");
    });
});

// Event listener for the Save Payment button
document.getElementById("save-payment-button").addEventListener("click", function () {
    const studentId = document.getElementById("student-id").value;
    const studentName = document.getElementById("student-name").value;
    const selectedClass = document.getElementById("payment-class").value;
    const month = document.getElementById("payment-month").value;
    const amount = document.getElementById("payment-amount").value;

    // Validate inputs
    if (!studentId || !studentName || !selectedClass || !month || !amount) {
        alert("Please fill in all payment details.");
        return;
    }

    // Send data to the server to save the payment record
    fetch(`Payment.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `student_id=${studentId}&student_name=${encodeURIComponent(studentName)}&class=${encodeURIComponent(selectedClass)}&month=${encodeURIComponent(month)}&amount=${encodeURIComponent(amount)}`
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            alert(data.message);
            
            // Display receipt after successful payment save
            displayReceipt(studentId, studentName, month, selectedClass,amount);

            // Clear all fields after successful save
            document.getElementById("student-id").value = '';
            document.getElementById("student-name").value = '';
            document.getElementById("payment-class").innerHTML = ''; // Clear dropdown options
            document.getElementById("payment-month").value = '';
            document.getElementById("payment-amount").value = '';
            document.getElementById("search-student-id").value = '';
        } else {
            alert(data.message);
        }
    })
    .catch((error) => {
        console.error("Error saving payment details:", error);
        alert("There was an error saving the payment details. Please try again.");
    });
});

// Function to display the receipt after a successful payment save
function displayReceipt(studentId, studentName, month, selectedClass,amount) {
    document.getElementById("receipt-student-id").textContent = studentId;
    document.getElementById("receipt-student-name").textContent = studentName;
    document.getElementById("receipt-month").textContent = month;
    document.getElementById("receipt-class").textContent = selectedClass;
    document.getElementById("receipt-payment-amount").textContent = amount;
    document.getElementById("receipt").style.display = 'block'; // Show receipt
}


// Function to print the receipt
function printReceipt() {
    const receiptContent = document.getElementById("receipt").innerHTML; // Get receipt content
    const printWindow = window.open('', '', 'height=600,width=800'); // Open a new window

    printWindow.document.write('<html><head><title>NEXT LEVEL MATHS</title>');
    printWindow.document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">'); // Include font-awesome styles if needed
    printWindow.document.write(`
        <style>
            body {
                width: 2.7in; 
                    margin: 0; 
                    padding: 0;
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    color: #333;
                    background: #fff; 
                
            }
            .receipt {
                font-family: Arial, sans-serif;
                max-width: 3inch ;
                margin: auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .receipt h3 {
                margin-top: 0;
            }
            .receipt .info {
                text-align: left;
                margin-top: 10px;
                margin-bottom: 20px;
            }
            .receipt .info p {
                margin: 5px 0;
            }
            .receipt .line {
                border-top: 1px dashed #000;
                margin: 10px 0;
            }
            .receipt .items {
                text-align: left;
            }
            
        
            .receipt .total {
                font-size: 1.2em;
                font-weight: bold;
                margin-top: 20px;
            }
            .footer {
                text-align: center;
                font-size: 0.8em;
                margin-top: 20px;
                color: #666;
            }
        </style>
    `); // Add any additional inline styles for modern design
    printWindow.document.write('</head><body>');
    
    printWindow.document.write('<div class="receipt">'); // Added a wrapper for the receipt
    printWindow.document.write(receiptContent); // Write the receipt content to the new window
    printWindow.document.write('</div>'); // Close the wrapper
    printWindow.document.write('<div class="footer">Thank you for your purchase!</div>'); // Add a footer
    printWindow.document.write('</body></html>');
    
    printWindow.document.close(); // Close the document to apply the styles
    printWindow.print(); // Trigger the print dialog
}



// Event listener for the Print Receipt button
document.getElementById("print-receipt-button").addEventListener("click", printReceipt);
