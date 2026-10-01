document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".event-filter");
    const eventCards = document.querySelectorAll(".event-card");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            eventCards.forEach(function (card) {
                const category = card.dataset.category;
                const shouldShow =
                    selectedFilter === "all" || category === selectedFilter;

                card.hidden = !shouldShow;
            });
        });
    });
});