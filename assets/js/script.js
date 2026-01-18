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

// --- 7. HOMEPAGE CARD SLIDESHOW (Hover & Scroll) ---
    const sliders = document.querySelectorAll('.hover-slider');

    sliders.forEach(card => {
        const imgElement = card.querySelector('.slide-img');
        if (!imgElement) return;

        // Get original and slide images
        const originalSrc = imgElement.src;
        const slides = JSON.parse(imgElement.getAttribute('data-slides') || '[]');
        
        // Combine all images into one array for cycling
        const allImages = [originalSrc, ...slides];
        
        let currentIndex = 0;
        let interval;

        // Function to cycle images
        const cycleImages = () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % allImages.length;
                imgElement.style.opacity = '0.8'; // Slight fade effect
                setTimeout(() => {
                    imgElement.src = allImages[currentIndex];
                    imgElement.style.opacity = '1';
                }, 150);
            }, 1500); // Change image every 1.5 seconds
        };

        const stopCycling = () => {
            clearInterval(interval);
            imgElement.src = originalSrc; // Reset to cover image
            currentIndex = 0;
        };

        // DESKTOP: Hover Logic
        card.addEventListener('mouseenter', cycleImages);
        card.addEventListener('mouseleave', stopCycling);

        // MOBILE: Intersection Observer (Auto-play when viewing)
        // Checks if device is touch-enabled or small screen
        if (window.matchMedia("(max-width: 900px)").matches || 'ontouchstart' in window) {
            
            // Remove hover listeners to avoid conflicts
            card.removeEventListener('mouseenter', cycleImages);
            card.removeEventListener('mouseleave', stopCycling);

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        cycleImages();
                    } else {
                        stopCycling();
                    }
                });
            }, { threshold: 0.6 }); // Trigger when 60% visible

            observer.observe(card);
        }
    });
