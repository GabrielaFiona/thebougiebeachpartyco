document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('nav-menu');

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Change icon from hamburger to X
        if(nav.classList.contains('active')) {
            toggle.textContent = '✕';
        } else {
            toggle.textContent = '☰';
        }
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
