document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Universal Active Link Highlight ---
    // This finds the current file name (e.g., 'packages.html') 
    // and adds the 'active' class to the matching menu item automatically.
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Get the href attribute of the link
        const linkPath = link.getAttribute('href');
        
        // Check if the link matches the current path OR if we are on home
        if(linkPath === currentPath || (currentPath === '' && linkPath === 'home.html')) {
            link.classList.add('active');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('nav-menu');

    if(toggle) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Change icon from hamburger to X
            if(nav.classList.contains('active')) {
                toggle.textContent = '✕';
            } else {
                toggle.textContent = '☰';
            }
        });
    }

    // --- 3. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. Auto-Update Copyright Year ---
    const yearSpan = document.querySelector('.bbp-bottom');
    if(yearSpan) {
        const currentYear = new Date().getFullYear();
        if(!yearSpan.innerHTML.includes(currentYear)) {
             yearSpan.innerHTML = yearSpan.innerHTML.replace(/\d{4}/, currentYear);
        }
    }
});
