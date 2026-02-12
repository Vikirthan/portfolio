// Script.js - interactivity for the portfolio

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio Loaded Successfully');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    // Auto-Scroll for Achievements
    const achievementsGrid = document.querySelector('.achievements-grid');
    let resumeTimeout;
    let scrollInterval;
    const scrollSpeed = 1; // Pixels per interval
    const scrollDelay = 20; // Milliseconds

    function stopScroll() {
        clearInterval(scrollInterval);
        clearTimeout(resumeTimeout);
    }

    function startScroll() {
        stopScroll(); // Ensure no duplicate intervals or pending resumes
        scrollInterval = setInterval(() => {
            if (achievementsGrid) {
                achievementsGrid.scrollLeft += scrollSpeed;

                // Infinite Scroll Reset
                // When we've scrolled past the first set of cards (half total width), reset to 0
                if (achievementsGrid.scrollLeft >= achievementsGrid.scrollWidth / 2) {
                    achievementsGrid.scrollLeft = 0;
                }
            }
        }, scrollDelay);
    }

    if (achievementsGrid) {
        // Check if mobile (<= 768px)
        const isMobile = window.innerWidth <= 768;

        if (!isMobile) {
            // Desktop: Enable Infinite Scroll
            // Clone for infinite scroll (double the content)
            achievementsGrid.innerHTML += achievementsGrid.innerHTML;

            startScroll();

            // Pause on hover
            achievementsGrid.addEventListener('mouseenter', stopScroll);
            achievementsGrid.addEventListener('mouseleave', startScroll);
        }
        // Mobile: Default CSS scrolling takes over (no script needed)
    }
});
