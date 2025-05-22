$(document).ready(function() {
    loadClasses();
    

    $("#studentForm").on("submit", function(event) {
        event.preventDefault();
        let ct = document.getElementById('class_type');
        let selectedClasses = Array.from(ct.selectedOptions).map(option => option.value);
        
        let data = {
            idnumber: $("#idnumber").val(),
            name: $("#name").val(),
            phonenumber: $("#phone").val(),
            address: $("#address").val(),
            school: $("#school").val(),
            birthday: $("#birthday").val(),
            gender: $("#gender").val(),
            guardianName: $("#guardianName").val(),
            email: $("#email").val(),
            classType: selectedClasses.join(", "),
            paymentType: $("#paymentType").val()
        };
        let editMode = $("#editMode").val();
        if (editMode) {
            data.editMode = true;
        }
        $.ajax({
            url: 'Student_Manage.php', // Update with your PHP script path
            type: 'POST',
            data: data,
            success: function(response) {
                saveStudent();
                alert(response);
                $("#studentForm")[0].reset();
                $("#editMode").val("");
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });

    function loadClasses() {
        $.ajax({
            url: 'Register.php', // Ensure this path is correct
            type: 'GET',
            success: function(response) {
                console.log("Response: ", response); // Debugging line
                let classes = JSON.parse(response);
                let classSelect = $("#class_type");
                classSelect.empty(); // Clear existing options
                classes.forEach(function(cls) {
                    console.log("Class Name: ", cls.Name); // Debugging line
                    classSelect.append(`<option value="${cls.Name}">${cls.Name}</option>`);
                });
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }
    
});

function saveStudent() {
    const indexNumber = document.getElementById('idnumber').value;
    const name = document.getElementById('name').value;
    const classSelect = document.getElementById('class_type');
    const paymentType = document.getElementById('paymentType').value;

    if (!indexNumber || !name || classSelect.selectedOptions.length === 0) {
        alert("Please fill out all required fields.");
        return;
    }

    // Collect selected classes
    const selectedClasses = Array.from(classSelect.selectedOptions).map(option => option.value);

    // Update student info below the QR code
    document.getElementById('studentIndex').innerText = indexNumber;
    document.getElementById('studentName').innerText = name;
    document.getElementById('studentClass').innerText = selectedClasses.join(", "); // Display all selected classes

    // Generate QR code content
    const qrCodeContent = `ID Number: ${indexNumber}\nName: ${name}\nClasses: ${selectedClasses.join(", ")}\nPayment Type: ${paymentType}`;

    // Generate QR code using a library (e.g., QRCode.js)
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.innerHTML = ""; // Clear previous QR code
    new QRCode(qrCodeContainer, {
        text: qrCodeContent,
        width: 150,
        height: 150
    });

    // alert("Student details saved successfully!");
}

function downloadQRCode() {
    const idCardSection = document.querySelector('.id-card');
    // Use html2canvas to take a screenshot of the id-card section
    html2canvas(idCardSection).then(canvas => {
        // Convert the canvas to an image
        const idCardImage = canvas.toDataURL('image/png');
        // Create a download link
        const link = document.createElement('a');
        link.href = idCardImage;
        link.download = 'ID_Card.png';
        // Trigger the download
        link.click();
    }).catch(error => {
        console.error("Error downloading the ID card section:", error);
        alert("Failed to download the ID card.");
    });
}

function shareQRCode() {
    const idCardSection = document.querySelector('.id-card');
    // Use html2canvas to take a screenshot of the id-card section
    html2canvas(idCardSection).then(canvas => {
        // Convert the canvas to an image
        const idCardImage = canvas.toDataURL('image/png');
        // Create a file from the image data
        const blob = dataURLtoBlob(idCardImage);
        const file = new File([blob], 'ID_Card.png', { type: 'image/png' });
        // Use the Web Share API to share the file
        if (navigator.share) {
            navigator.share({
                title: 'ID Card',
                text: 'Check out my ID card!',
                files: [file]
            }).catch(error => console.log('Sharing failed', error));
        } else {
            alert("Sharing is not supported on this browser.");
        }
    }).catch(error => {
        console.error("Error sharing the ID card section:", error);
        alert("Failed to share the ID card.");
    });
}

// Utility function to convert data URL to Blob
function dataURLtoBlob(dataURL) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}
