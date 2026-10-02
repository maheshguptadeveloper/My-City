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

const CONTACT_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyAhr992rkDLrFygMAqHbldIgExjqfeQtrT_7CaIGcU6HB7ue0uFGikn7fvk7zyevHR/exec";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("businessContactForm");
    const submitBtn = form?.querySelector(".form-submit");
    const formStatus = document.getElementById("formStatus");

    if (!form || !submitBtn || !formStatus) {
        console.error("Contact form, submit button, or status element not found.");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!form.reportValidity()) return;

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        formStatus.textContent = "";

        const body = new URLSearchParams({
            customerName: form.querySelector('[name="customerName"]')?.value.trim() || "",
            businessName: form.querySelector('[name="businessName"]')?.value.trim() || "",
            customerEmail: form.querySelector('[name="customerEmail"]')?.value.trim() || "",
            customerPhone: form.querySelector('[name="customerPhone"]')?.value.trim() || "",
            projectType: form.querySelector('[name="projectType"]')?.value || "",
            projectDetails: form.querySelector('[name="projectDetails"]')?.value.trim() || ""
        });

        try {
            await fetch(CONTACT_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: body
            });

            formStatus.textContent =
                "Your enquiry has been submitted. Thank you for contacting Anand Nagar!";

            form.reset();

        } catch (error) {
            console.error("Contact form submission error:", error);

            formStatus.textContent =
                "Unable to send your enquiry. Please try again later.";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Enquiry";
        }
    });
});