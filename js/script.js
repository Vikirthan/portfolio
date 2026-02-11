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
        // Clone for infinite scroll (double the content)
        achievementsGrid.innerHTML += achievementsGrid.innerHTML;

        startScroll();

        // Pause on hover
        achievementsGrid.addEventListener('mouseenter', stopScroll);
        achievementsGrid.addEventListener('mouseleave', startScroll);

        // Pause on touch (mobile)
        achievementsGrid.addEventListener('touchstart', stopScroll);
        achievementsGrid.addEventListener('touchmove', stopScroll); // Also stop on move
        achievementsGrid.addEventListener('touchend', () => {
            resumeTimeout = setTimeout(startScroll, 2000); // Resume after 2s
        });
    }
});
