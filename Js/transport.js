document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".transport-filter");
    const transportCards = document.querySelectorAll(".transport-card");
    const currentYearElement = document.getElementById("currentYear");

    // Set current year in footer
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Filter transport cards
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory = button.dataset.filter;

            // Update active filter button
            filterButtons.forEach(function (filterButton) {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            // Show or hide cards
            transportCards.forEach(function (card) {
                const cardCategory = card.dataset.category;
                const shouldShow =
                    selectedCategory === "all" ||
                    cardCategory === selectedCategory;

                card.hidden = !shouldShow;
            });
        });
    });
});