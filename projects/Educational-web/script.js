document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const desktopServicesButton = document.getElementById('desktop-services-button');
    const desktopServicesDropdown = document.getElementById('desktop-services-dropdown');
    const mobileServicesButton = document.getElementById('mobile-services-button');
    const mobileServicesDropdown = document.getElementById('mobile-services-dropdown');

    // Mobile Menu Toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                requestAnimationFrame(() => {
                    mobileMenu.classList.remove('-translate-y-full');
                });
            } else {
                mobileMenu.classList.add('-translate-y-full');
                mobileMenu.addEventListener('transitionend', () => {
                    mobileMenu.classList.add('hidden');
                }, { once: true });
            }
        });
    }

    // Desktop Services Dropdown Toggle
    if (desktopServicesButton && desktopServicesDropdown) {
        desktopServicesButton.addEventListener('click', (event) => {
            event.stopPropagation();
            desktopServicesDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (event) => {
            if (!desktopServicesButton.contains(event.target) && !desktopServicesDropdown.contains(event.target)) {
                desktopServicesDropdown.classList.add('hidden');
            }
        });
    }

    // Mobile Services Dropdown Toggle
    if (mobileServicesButton && mobileServicesDropdown) {
        mobileServicesButton.addEventListener('click', () => {
            mobileServicesDropdown.classList.toggle('hidden');
        });
    }

    // Testimonial Slider Functionality (if applicable on the page)
    const testimonialContainer = document.getElementById('testimonial-container');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    if (testimonialContainer && testimonialDots.length > 0 && testimonialCards.length > 0) {
        const updateDots = () => {
            const scrollLeft = testimonialContainer.scrollLeft;
            const cardWidth = testimonialCards[0].offsetWidth + parseFloat(getComputedStyle(testimonialCards[0]).marginRight); // Card width + margin
            
            let activeIndex = Math.round(scrollLeft / cardWidth);
            
            testimonialDots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.remove('bg-brand-gray/30');
                    dot.classList.add('bg-brand-orange');
                } else {
                    dot.classList.remove('bg-brand-orange');
                    dot.classList.add('bg-brand-gray/30');
                }
            });
        };

        testimonialContainer.addEventListener('scroll', updateDots);
        
        // Initialize dots
        if(testimonialDots.length > 0) {
            testimonialDots[0].classList.remove('bg-brand-gray/30');
            testimonialDots[0].classList.add('bg-brand-orange');
        }

        // Optional: Add click functionality to dots if needed
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const cardWidth = testimonialCards[0].offsetWidth + parseFloat(getComputedStyle(testimonialCards[0]).marginRight);
                testimonialContainer.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            });
        });
    }
});