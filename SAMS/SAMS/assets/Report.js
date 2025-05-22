$(document).ready(function () {
    loadData();
    

    function loadData() {
        $.ajax({
            url: "Report.php",
            type: "GET",
            dataType: "json",
            success: function (data) {
                let classes = data.classes;
                let classSelect = $("#class_type");
                classSelect.empty();
                classes.forEach(function (cls) {
                    classSelect.append(
                        `<option value="${cls.Name}">${cls.Name}</option>`
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            },
        });
    }

    // Event listener for the Search button
    $("#searchBtn").click(function () {
        const selectedClass = $("#class_type").val();
        const selectedMonth = $("#month_type").val();

        $.ajax({
            url: "Report.php",
            type: "POST",
            data: {
                class: selectedClass,
                month: selectedMonth
            },
            dataType: "json",
            success: function (data) {
                let paymentTable = $("#paymentTable tbody");
                paymentTable.empty();

                let totalAmount = 0; // Initialize total amount

                // Populate table with payment data and calculate total amount
                data.payments.forEach(function (payment) {
                    paymentTable.append(
                        `<tr>
                            <td>${payment.StudentID}</td>
                            <td>${payment.Student_name}</td>
                            <td>${payment.Class}</td>
                            <td>${payment.Month}</td>
                            <td>${payment.Amount.toFixed(2)}</td>
                        </tr>`
                    );
                    totalAmount += parseFloat(payment.Amount); // Accumulate total
                });

                // Display the total amount in the text box
                $("#totalAmountInput").val(`${totalAmount.toFixed(2)}`);
            },
            error: function (xhr, status, error) {
                console.error("Error loading payment data: ", xhr.responseText);
            },
        });
    });
});
