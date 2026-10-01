document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("businessContactForm");
    const status = document.getElementById("formStatus");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);

        const name = formData.get("customerName") || "";
        const business = formData.get("businessName") || "";
        const email = formData.get("customerEmail") || "";
        const phone = formData.get("customerPhone") || "";
        const projectType = formData.get("projectType") || "";
        const details = formData.get("projectDetails") || "";

        const subject = encodeURIComponent(
            `Website Project Enquiry - ${name}`
        );

        const body = encodeURIComponent(
`Hello Mahesh,

I would like to discuss a website project.

Name: ${name}
Business Name: ${business}
Email: ${email}
Phone: ${phone}
Project Type: ${projectType}

Project Requirements:
${details}

Thank you.`
        );

        // Replace with your actual email address.
        const recipientEmail = "your-email@example.com";

        if (status) {
            status.textContent =
                "Your email application should open with the enquiry details.";
        }

        window.location.href =
            `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    });
});