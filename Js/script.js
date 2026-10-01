document.addEventListener("DOMContentLoaded", function () {
    const languageButton = document.getElementById("languageButton");
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mainNavigation = document.getElementById("mainNavigation");

    const translations = {
        en: {
            brandName: "Anand Nagar",
            brandTagline: "Discover · Connect · Belong",
            navHome: "Home",
            navAbout: "About",
            navExplore: "Explore",
            navEvents: "Events",
            navDirectory: "Directory",
            navContact: "Contact"
        },
        hi: {
            brandName: "आनंद नगर",
            brandTagline: "जानें · जुड़ें · अपनापन महसूस करें",
            navHome: "होम",
            navAbout: "परिचय",
            navExplore: "घूमें",
            navEvents: "कार्यक्रम",
            navDirectory: "स्थानीय निर्देशिका",
            navContact: "संपर्क"
        }
    };

    function applyLanguage(language) {
        const selectedLanguage = language === "hi" ? "hi" : "en";

        // Update document language and Hindi font class
        document.documentElement.lang = selectedLanguage;
        document.body.classList.toggle("hindi", selectedLanguage === "hi");

        // Translate elements using data-en and data-hi
        document.querySelectorAll("[data-en][data-hi]").forEach(function (element) {
            element.textContent = element.getAttribute("data-" + selectedLanguage);
        });

        // Translate elements using data-i18n
        document.querySelectorAll("[data-i18n]").forEach(function (element) {
            const key = element.getAttribute("data-i18n");
            const translatedText = translations[selectedLanguage][key];

            if (translatedText) {
                element.textContent = translatedText;
            }
        });

        // Update language button
        if (languageButton) {
            languageButton.textContent =
                selectedLanguage === "en" ? "हिन्दी" : "English";

            languageButton.setAttribute(
                "aria-label",
                selectedLanguage === "en"
                    ? "Switch to Hindi"
                    : "Switch to English"
            );
        }

        // Remember selected language
        localStorage.setItem("pharenda-language", selectedLanguage);
    }

    // Load saved language or default to English
    const savedLanguage = localStorage.getItem("pharenda-language") || "en";
    applyLanguage(savedLanguage);

    // Switch language when button is clicked
    if (languageButton) {
        languageButton.addEventListener("click", function () {
            const currentLanguage = document.documentElement.lang || "en";
            const nextLanguage = currentLanguage === "en" ? "hi" : "en";

            applyLanguage(nextLanguage);
        });
    } else {
        console.error("Language button not found. Check id='languageButton'.");
    }

    // Mobile navigation
    if (mobileMenuButton && mainNavigation) {
        mobileMenuButton.addEventListener("click", function () {
            const isOpen = mainNavigation.classList.toggle("open");

            mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
        });

        mainNavigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mainNavigation.classList.remove("open");
                mobileMenuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Footer year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});

