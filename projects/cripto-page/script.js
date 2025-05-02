

// explore page
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const emailForm = document.querySelector('form'); // Might be null on pages without the form

    // Toggle mobile menu
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Optional: Change button icon (e.g., to X) when menu is open
        });
    }

    // Handle form submission (placeholder - will only work on index.html)
    if (emailForm) {
        emailForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            const emailInput = emailForm.querySelector('input[type="email"]');

            // Basic check if emailInput exists before accessing its value
            if (emailInput) {
                 const email = emailInput.value;
                 if (email && email.includes('@')) { // Simple validation
                    console.log('Email submitted:', email);
                    alert(`Thank you for signing up with ${email}! (Placeholder)`);
                    emailInput.value = ''; // Clear the input field
                 } else {
                     alert('Please enter a valid email address.');
                 }
            } else {
                // This block might execute on pages without the form, it's harmless
                console.log("Email form not found on this page.");
            }
        });
    }

    // Add any other interactive elements or animations here if needed for explore.html

});