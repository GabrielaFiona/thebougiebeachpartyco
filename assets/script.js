document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Universal Active Link Highlight ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Match exact path
        if(linkPath === currentPath) {
            link.classList.add('active');
            
            // If it's a dropdown item, also highlight the parent "Explore"
            const parentDropdown = link.closest('.dropdown');
            if(parentDropdown) {
                parentDropdown.querySelector('.dropdown-toggle').classList.add('active');
            }
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

    // --- 3. Mobile Dropdown Toggle ---
    // This allows the "Explore" text to open the menu on mobile instead of jumping to page immediately
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(dt => {
        dt.addEventListener('click', (e) => {
            // Only trigger this logic on mobile (when nav is absolute/fixed)
            if (window.getComputedStyle(toggle).display !== 'none') {
                e.preventDefault(); // Stop link from going to page
                const parent = dt.parentElement;
                parent.classList.toggle('open');
            }
        });
    });

    // --- 4. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it's purely an anchor on the CURRENT page
            const href = this.getAttribute('href');
            if(href.length > 1 && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if(target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // --- 5. Auto-Update Copyright Year ---
    const yearSpan = document.querySelector('.bbp-bottom');
    if(yearSpan) {
        const currentYear = new Date().getFullYear();
        if(!yearSpan.innerHTML.includes(currentYear)) {
             yearSpan.innerHTML = yearSpan.innerHTML.replace(/\d{4}/, currentYear);
        }
    }

    // --- 6. RENTAL INQUIRY TOGGLE (NEW) ---
    const inquiryBtns = document.querySelectorAll('.inquiry-toggle');
    
    inquiryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Find the form container relative to the button clicked
            // It is located in the parent container's next sibling or finding closest wrapper
            // Based on HTML structure: Button is in .rental-actions, Form is in .inquiry-form-wrap (sibling)
            const parent = this.closest('.zigzag-content');
            const form = parent.querySelector('.inquiry-form-wrap');
            
            if(form) {
                if(form.style.display === 'block') {
                    form.style.display = 'none';
                    this.textContent = 'Check Availability ▾';
                } else {
                    form.style.display = 'block';
                    this.textContent = 'Close Form ▴';
                }
            }
        });
    });
});
