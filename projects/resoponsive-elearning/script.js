$(document).ready(function() {
  
    const menuBtn = $('#menu-btn');
    const menuClose = $('#menu-close');
    const navLinks = $('#navbar-links'); // Target the UL by its ID
  
    // Open mobile menu
    menuBtn.on('click', function() {
      navLinks.addClass('active'); // Add .active class to the UL
    });
  
    // Close mobile menu
    menuClose.on('click', function() {
      navLinks.removeClass('active'); // Remove .active class from the UL
    });
  
    // Optional: Close mobile menu when a link is clicked (good for SPAs or hash links)
    navLinks.find('a').on('click', function() {
        // Only remove if the menu is currently active (visible)
        if (navLinks.hasClass('active')) {
            navLinks.removeClass('active');
        }
    });
  
    // Optional: Add a subtle background to nav on scroll
    $(window).scroll(function() {
      if ($(window).scrollTop() > 50) { // If scrolled more than 50px
        $('nav').css('background-color', 'rgba(255, 255, 255, 0.95)');
        $('nav').css('box-shadow', '0 4px 12px rgba(0, 0, 0, 0.1)');
      } else {
        $('nav').css('background-color', 'var(--white)'); // Revert to original background
        $('nav').css('box-shadow', '0 2px 10px rgba(0, 0, 0, 0.1)'); // Revert to original shadow
      }
    });
  
  });