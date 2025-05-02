function initMobileNav() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                     menuButton.setAttribute('aria-expanded', 'false');
                     mobileMenu.classList.add('hidden');
                }
            });
        });
    } else {
         console.warn("Mobile menu button or container not found.");
    }
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const headerOffset = 70; // Adjust for fixed header height

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                 const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
             }
        });
    });
}

function initAOS() {
    // Check if AOS is loaded before trying to initialize
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    } else {
        console.warn("AOS library not found.");
    }
}

// Run initialization functions when the page content is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initSmoothScroll();
    initAOS();
});