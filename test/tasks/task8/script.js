$(document).ready(function () {
    const openFormButton = $("#openFormButton");
    const closeFormButton = $("#closeFormButton");
    const overlay = $("#overlay");
    const feedbackForm = $("#feedbackForm");
    const messageContainer = $("#messageContainer");

    // Check if the form data is stored in localStorage
    const savedFormData = localStorage.getItem("feedbackFormData");
    if (savedFormData) {
        const formData = JSON.parse(savedFormData);
        $("#name").val(formData.name);
        $("#email").val(formData.email);
        $("#phone").val(formData.phone);
        $("#organization").val(formData.organization);
        $("#message").val(formData.message);
        $("#consent").prop("checked", formData.consent);
    }

    openFormButton.click(function () {
        overlay.css("display", "block");
        // Update URL using History API
        history.pushState(null, "", "/feedback-form");
    });

    closeFormButton.click(function () {
        overlay.css("display", "none");
        // Update URL using History API
        history.back();
    });

    feedbackForm.submit(function (event) {
        event.preventDefault();

        // Collect form data
        const formData = {
            name: $("#name").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            organization: $("#organization").val(),
            message: $("#message").val(),
            consent: $("#consent").prop("checked"),
        };

        // Save form data to localStorage
        localStorage.setItem("feedbackFormData", JSON.stringify(formData));

        // Send form data to the server using AJAX
        $.ajax({
            type: "POST",
            url: "https://api.slapform.com/YR9Jf3BYG", // Замените на ваш реальный URL
            data: formData,
            success: function (response) {
                // Display a success message
                messageContainer.text("Данные успешно отправлены!");
                messageContainer.css("color", "green");
                messageContainer.css("display", "block");

                // Clear form data
                feedbackForm[0].reset();

                // Remove form data from localStorage
                localStorage.removeItem("feedbackFormData");
            },
            error: function (error) {
                // Display an error message
                messageContainer.text("Произошла ошибка при отправке данных.");
                messageContainer.css("color", "red");
                messageContainer.css("display", "block");
            },
        });
    });
});
