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
    let scrollInterval;
    let scrollAmount = 0;
    const scrollSpeed = 1; // Pixels per tick
    const scrollDelay = 20; // Milliseconds (Smoother)

    function startScroll() {
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

    function stopScroll() {
        clearInterval(scrollInterval);
    }

    if (achievementsGrid) {
        // Clone for infinite scroll (double the content)
        achievementsGrid.innerHTML += achievementsGrid.innerHTML;

        startScroll();

        // Pause on hover
        achievementsGrid.addEventListener('mouseenter', stopScroll);
        achievementsGrid.addEventListener('mouseleave', startScroll);

        // Pause on touch (mobile)
        achievementsGrid.addEventListener('touchstart', stopScroll);
        achievementsGrid.addEventListener('touchend', () => {
            setTimeout(startScroll, 2000); // Resume after 2s
        });
    }
});
