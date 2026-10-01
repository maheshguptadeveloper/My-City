document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("updatesSearch");
    const filterButtons = document.querySelectorAll(".filter-button");
    const updateCards = document.querySelectorAll(".update-card");
    const updatesCount = document.getElementById("updatesCount");
    const emptyState = document.getElementById("updatesEmpty");
    const currentYear = document.getElementById("currentYear");

    let selectedCategory = "all";

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    function applyFilters() {
        const searchTerm = (searchInput?.value || "").trim().toLowerCase();
        let visibleCount = 0;

        updateCards.forEach(function (card) {
            const category = card.dataset.category || "";
            const searchText = (
                card.dataset.search + " " + card.textContent
            ).toLowerCase();

            const matchesCategory =
                selectedCategory === "all" || category === selectedCategory;

            const matchesSearch =
                searchTerm === "" || searchText.includes(searchTerm);

            const isVisible = matchesCategory && matchesSearch;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        if (updatesCount) {
            updatesCount.textContent =
                visibleCount + (visibleCount === 1 ? " update" : " updates");
        }

        if (emptyState) {
            emptyState.hidden = visibleCount !== 0;
        }
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedCategory = button.dataset.filter || "all";

            filterButtons.forEach(function (filterButton) {
                const isActive = filterButton === button;
                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            applyFilters();
        });

        button.setAttribute(
            "aria-pressed",
            String(button.classList.contains("active"))
        );
    });

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    // Keep language-toggle placeholders in sync if the shared script switches language.
    document.addEventListener("click", function (event) {
        if (event.target.closest("#languageButton")) {
            window.setTimeout(function () {
                const languageButton = document.getElementById("languageButton");
                const isHindi = languageButton &&
                    languageButton.textContent.trim().toLowerCase().includes("english");

                if (searchInput) {
                    searchInput.placeholder = isHindi
                        ? searchInput.dataset.placeholderHi
                        : searchInput.dataset.placeholderEn;
                }
            }, 0);
        }
    });

    applyFilters();
});