document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("directorySearch");
    const clearSearchButton = document.getElementById("clearDirectorySearch");
    const filterButtons = document.querySelectorAll(".directory-filter");
    const categoryCards = document.querySelectorAll(".directory-card");
    const resultCount = document.getElementById("directoryResultCount");
    const emptyState = document.getElementById("directoryEmptyState");
    const categorySelectButtons = document.querySelectorAll("[data-category-select]");

    if (!searchInput || !categoryCards.length) {
        return;
    }

    let activeCategory = "all";

    function getCurrentLanguage() {
        return document.documentElement.lang === "hi" ? "hi" : "en";
    }

    function updateResultCount(count) {
        const language = getCurrentLanguage();

        if (language === "hi") {
            resultCount.textContent = `${count} श्रेणियाँ`;
        } else {
            resultCount.textContent =
                `${count} ${count === 1 ? "category" : "categories"}`;
        }
    }

    function filterDirectory() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        categoryCards.forEach(function (card) {
            const category = card.dataset.category || "";
            const searchableText = (
                card.dataset.search + " " + card.textContent
            ).toLowerCase();

            const matchesCategory =
                activeCategory === "all" || category === activeCategory;

            const matchesSearch =
                searchTerm === "" || searchableText.includes(searchTerm);

            const isVisible = matchesCategory && matchesSearch;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        updateResultCount(visibleCount);
        emptyState.hidden = visibleCount !== 0;
        clearSearchButton.hidden = searchInput.value.length === 0;
    }

    function selectCategory(category) {
        activeCategory = category;

        filterButtons.forEach(function (button) {
            const isActive = button.dataset.filter === category;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        filterDirectory();
    }

    // Filter when a category button is selected
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectCategory(button.dataset.filter);
        });
    });

    // Search categories as the user types
    searchInput.addEventListener("input", filterDirectory);

    // Clear the search field
    clearSearchButton.addEventListener("click", function () {
        searchInput.value = "";
        searchInput.focus();
        filterDirectory();
    });

    // Category card buttons select the matching filter
    categorySelectButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectCategory(button.dataset.categorySelect);

            document.querySelector(".directory-results-heading")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // Initial directory display
    filterDirectory();
});