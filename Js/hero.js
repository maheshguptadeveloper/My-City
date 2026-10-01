document.addEventListener("DOMContentLoaded", function () {
    const heroBackground = document.getElementById("heroBackground");

    if (!heroBackground) {
        console.error("Hero element #heroBackground was not found.");
        return;
    }

    const slides = heroBackground.querySelectorAll(".hero-slide");

    if (slides.length === 0) {
        console.error("No .hero-slide elements found.");
        return;
    }

    const heroImages = [
         "../Images/Golden River Valley Sunset.png",
        "../Images/Anand Nagar Junction Station Entrance.png",
        "../Images/Ornate Hindu Goddess Shrine with Garlands.png"
    ];

    let currentIndex = 0;
    let activeSlideIndex = 0;

    function showImage(index) {
        const imagePath = heroImages[index];
        const image = new Image();

        image.onload = function () {
            const nextSlideIndex = activeSlideIndex === 0 ? 1 : 0;
            const nextSlide = slides[nextSlideIndex];

            nextSlide.style.backgroundImage = `url("${imagePath}")`;
            nextSlide.classList.add("hero-slide-active");

            slides[activeSlideIndex].classList.remove("hero-slide-active");

            activeSlideIndex = nextSlideIndex;

            console.log("Hero image loaded:", imagePath);
        };

        image.onerror = function () {
            console.error("Could not load hero image:", imagePath);
        };

        image.src = imagePath;
    }

    showImage(currentIndex);

    setInterval(function () {
        currentIndex = (currentIndex + 1) % heroImages.length;
        showImage(currentIndex);
    }, 5000);
});