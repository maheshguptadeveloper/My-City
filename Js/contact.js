const CONTACT_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyAhr992rkDLrFygMAqHbldIgExjqfeQtrT_7CaIGcU6HB7ue0uFGikn7fvk7zyevHR/exec";

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("businessContactForm");
    const submitBtn = form?.querySelector(".form-submit");
    const formStatus = document.getElementById("formStatus");

    const overlay = document.getElementById("contactSubmitOverlay");
    const loader = document.getElementById("contactSubmitLoader");
    const success = document.getElementById("contactSubmitSuccess");
    const title = document.getElementById("contactSubmitTitle");
    const message = document.getElementById("contactSubmitMessage");

    if (!form) {
        console.error("Contact form not found.");
        return;
    }

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

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

        /* -----------------------------
           SHOW LOADER POPUP
           ----------------------------- */

        if (overlay) {
            overlay.classList.remove("success");
            overlay.classList.add("show");
            overlay.setAttribute("aria-hidden", "false");
        }

        if (title) {
            title.textContent = "Submitting Your Enquiry";
        }

        if (message) {
            message.textContent =
                "Please wait while we submit your project details.";
        }

        if (formStatus) {
            formStatus.textContent = "";
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";
        }

        try {

            await fetch(CONTACT_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: body
            });

            /* -----------------------------
               SHOW SUCCESS MESSAGE
               ----------------------------- */

            if (overlay) {
                overlay.classList.add("success");
            }

            if (title) {
                title.textContent = "Enquiry Submitted!";
            }

            if (message) {
                message.textContent =
                    "Thank you for contacting Anand Nagar. Your project details have been received.";
            }

            if (formStatus) {
                formStatus.textContent =
                    "Your enquiry has been submitted successfully.";
            }

            form.reset();

            /* -----------------------------
               AUTO CLOSE POPUP
               ----------------------------- */

            setTimeout(function () {

                if (overlay) {
                    overlay.classList.remove("show");
                    overlay.classList.remove("success");
                    overlay.setAttribute("aria-hidden", "true");
                }

            }, 2500);

        } catch (error) {

            console.error(
                "Contact form submission error:",
                error
            );

            if (title) {
                title.textContent = "Submission Failed";
            }

            if (message) {
                message.textContent =
                    "We couldn't submit your enquiry. Please try again.";
            }

            if (formStatus) {
                formStatus.textContent =
                    "Unable to submit your enquiry. Please try again.";
            }

            if (overlay) {
                overlay.classList.add("success");
            }

            setTimeout(function () {

                if (overlay) {
                    overlay.classList.remove("show");
                    overlay.classList.remove("success");
                    overlay.setAttribute("aria-hidden", "true");
                }

            }, 2500);

        } finally {

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Project Enquiry";
            }
        }
    });
});