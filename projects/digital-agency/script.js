document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileServicesButton = document.getElementById('mobile-services-button');
    const mobileServicesDropdown = document.getElementById('mobile-services-dropdown');
    const desktopServicesButton = document.getElementById('desktop-services-button');
    const desktopServicesDropdown = document.getElementById('desktop-services-dropdown');
    const testimonialContainer = document.getElementById('testimonial-container');
    const testimonialCards = testimonialContainer?.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const contactForm = document.getElementById('contact-form');
    const contactSuccessMessage = document.getElementById('success-message'); // Renamed ID for clarity
    const hireUsForm = document.getElementById('hire-us-form'); // New form ID
    const hireUsSuccessMessage = document.getElementById('hire-us-success-message'); // New success message ID

    let testimonialInterval = null;
    let currentTestimonialIndex = 0;
    const autoScrollDelay = 5000;
    const redirectDelay = 3500; // Adjusted redirect delay slightly

    const closeMobileMenu = () => {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.add('-translate-y-full');
        }
        if (mobileServicesDropdown) {
            mobileServicesDropdown.classList.add('hidden');
        }
    };

    const closeDesktopDropdown = () => {
        if (desktopServicesDropdown) {
            desktopServicesDropdown.classList.add('hidden');
        }
    };

    const updateTestimonialDots = (index) => {
        if (!testimonialDots || testimonialDots.length === 0) return;
        const activeDotClass = testimonialContainer?.closest('section')?.classList.contains('bg-white') ? 'bg-brand-dark/75' : 'bg-white/75';
        const inactiveDotClass = testimonialContainer?.closest('section')?.classList.contains('bg-white') ? 'bg-brand-gray/30' : 'bg-white/30';

        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle(activeDotClass, i === index);
            dot.classList.toggle(inactiveDotClass, i !== index);
        });
    };


    const scrollToTestimonial = (index) => {
        if (!testimonialContainer || !testimonialCards || testimonialCards.length === 0 || index < 0 || index >= testimonialCards.length) return;
        const targetCard = testimonialCards[index];
        if (!targetCard) return;

        const scrollLeft = targetCard.offsetLeft - testimonialContainer.offsetLeft;
        testimonialContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        currentTestimonialIndex = index;
        updateTestimonialDots(currentTestimonialIndex);
    };

    const startTestimonialScroll = () => {
        if (!testimonialContainer || !testimonialCards || testimonialCards.length <= 1) return;
        stopTestimonialScroll();
        testimonialInterval = setInterval(() => {
            let nextIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
            scrollToTestimonial(nextIndex);
        }, autoScrollDelay);
    };

    const stopTestimonialScroll = () => {
        clearInterval(testimonialInterval);
        testimonialInterval = null;
    };


    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const isHidden = mobileMenu.classList.toggle('hidden');
            if (!isHidden) {
                 setTimeout(() => { mobileMenu.classList.remove('-translate-y-full'); }, 10);
            } else {
                mobileMenu.classList.add('-translate-y-full');
                if (mobileServicesDropdown) mobileServicesDropdown.classList.add('hidden');
            }
            closeDesktopDropdown();
        });
    }

    if (mobileServicesButton && mobileServicesDropdown) {
        mobileServicesButton.addEventListener('click', (event) => {
            event.stopPropagation();
            mobileServicesDropdown.classList.toggle('hidden');
        });
    }

    if (desktopServicesButton && desktopServicesDropdown) {
        desktopServicesButton.addEventListener('click', (event) => {
            event.stopPropagation();
            desktopServicesDropdown.classList.toggle('hidden');
        });
    }

    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', stopTestimonialScroll);
        testimonialContainer.addEventListener('mouseleave', startTestimonialScroll);
        testimonialContainer.addEventListener('touchstart', stopTestimonialScroll, { passive: true });
        testimonialContainer.addEventListener('touchend', startTestimonialScroll, { passive: true });

        testimonialContainer.addEventListener('scroll', () => {
           if (testimonialInterval) return;
           const scrollLeft = testimonialContainer.scrollLeft;
           const containerWidth = testimonialContainer.clientWidth;
           let closestIndex = 0;
           let minDistance = Infinity;

           testimonialCards.forEach((card, index) => {
               const cardCenter = card.offsetLeft + card.offsetWidth / 2;
               const containerCenter = scrollLeft + containerWidth / 2;
               const distance = Math.abs(cardCenter - containerCenter);
               if (distance < minDistance) {
                   minDistance = distance;
                   closestIndex = index;
               }
           });
           if(currentTestimonialIndex !== closestIndex){
               currentTestimonialIndex = closestIndex;
               updateTestimonialDots(currentTestimonialIndex);
           }
        }, { passive: true });

        startTestimonialScroll();
        updateTestimonialDots(0);
    }

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopTestimonialScroll();
            scrollToTestimonial(index);
            // setTimeout(startTestimonialScroll, autoScrollDelay * 1.5);
        });
    });

    // Handler for Contact Us Form
    if (contactForm && contactSuccessMessage) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            contactSuccessMessage.classList.remove('hidden');
            contactForm.reset();
            setTimeout(() => { window.location.href = 'index.html'; }, redirectDelay);
        });
    }

    // Handler for Hire Us Form
    if (hireUsForm && hireUsSuccessMessage) {
        hireUsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            hireUsSuccessMessage.classList.remove('hidden');
            hireUsForm.reset();
            setTimeout(() => { window.location.href = 'index.html'; }, redirectDelay);
        });
    }


    document.addEventListener('click', (event) => {
        if (desktopServicesDropdown && !desktopServicesDropdown.classList.contains('hidden')) {
            if (!desktopServicesButton.contains(event.target) && !desktopServicesDropdown.contains(event.target)) {
                closeDesktopDropdown();
            }
        }
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
             if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                 closeMobileMenu();
             }
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeDesktopDropdown();
            closeMobileMenu();
        }
    });
});