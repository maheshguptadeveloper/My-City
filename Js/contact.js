const CONTACT_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyAhr992rkDLrFygMAqHbldIgExjqfeQtrT_7CaIGcU6HB7ue0uFGikn7fvk7zyevHR/exec";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("businessContactForm");
    const submitBtn = form?.querySelector(".form-submit");
    const formStatus = document.getElementById("formStatus");

    if (!form || !submitBtn || !formStatus) {
        console.error("Contact form elements not found.");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";
        formStatus.textContent = "";

        const body = new URLSearchParams({
            customerName:
                form.querySelector('[name="customerName"]')?.value.trim() || "",

            businessName:
                form.querySelector('[name="businessName"]')?.value.trim() || "",

            customerEmail:
                form.querySelector('[name="customerEmail"]')?.value.trim() || "",

            customerPhone:
                form.querySelector('[name="customerPhone"]')?.value.trim() || "",

            projectType:
                form.querySelector('[name="projectType"]')?.value || "",

            projectDetails:
                form.querySelector('[name="projectDetails"]')?.value.trim() || ""
        });

        try {
            await fetch(CONTACT_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: body
            });

            formStatus.textContent =
                "Your enquiry has been submitted successfully. Thank you for contacting Anand Nagar!";

            form.reset();

        } catch (error) {
            console.error("Contact form submission error:", error);

            formStatus.textContent =
                "Unable to submit your enquiry. Please try again later.";
        }

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Project Enquiry";
    });
});