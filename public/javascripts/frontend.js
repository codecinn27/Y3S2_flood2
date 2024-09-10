// Dropdown Menu Toggle
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');
const footerSections = document.querySelectorAll('.footer-section');
const footerHighlight = document.getElementById('footerHighlight');

dropdownButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});

dropdownMenu.querySelectorAll('a').forEach(item => {
    item.addEventListener('click', () => {
        dropdownMenu.classList.add('hidden');
    });
});

// Light/Dark Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const toggleDot = document.getElementById('toggleDot');

// Function to apply the theme based on the stored value
function applyTheme(isDark) {
    if (isDark) {
        body.classList.add('dark');
        header.classList.add('dark');
        footer.classList.add('dark');
        toggleDot.style.transform = 'translateX(1.5rem)';
        localStorage.setItem('theme', 'dark'); // Save the theme preference
    } else {
        body.classList.remove('dark');
        header.classList.remove('dark');
        footer.classList.remove('dark');
        toggleDot.style.transform = 'translateX(0)';
        localStorage.setItem('theme', 'light'); // Save the theme preference
    }
}

// Check the stored theme preference on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    themeToggle.checked = true;
    applyTheme(true);
} else {
    themeToggle.checked = false;
    applyTheme(false);
}

// Event listener for theme switch
themeToggle.addEventListener('change', () => {
    const isDark = themeToggle.checked;
    applyTheme(isDark);
});

// Footer Section Highlight with delayed update after fade-in
footerSections.forEach((section, index) => {
    section.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add fade-out effect before navigating
        body.classList.remove('fade-in');
        body.classList.add('fade-out');
        footer.classList.add('fade-out');

        // Wait for fade-out to complete, then change the page and highlight
        const sectionId = section.dataset.section;
        
        setTimeout(() => {
            window.location.href = `${sectionId}`;
        }, 200); // Duration should match the CSS transition duration
    });
});

// Function to update footer highlight instantly after page load
function updateFooterHighlight(sectionId) {
    // Temporarily disable transition to prevent sliding effect
    footerHighlight.style.transition = 'none';
    
    footerSections.forEach((section, index) => {
        if (section.dataset.section === sectionId) {
            footerHighlight.style.transform = `translateX(${index * 100}%)`;
            section.classList.add('selected');
            section.classList.add('disabled');
        } else {
            section.classList.remove('selected');
            section.classList.remove('disabled');
        }
    });

    // Re-enable transition after a brief delay to allow instant update
    setTimeout(() => {
        footerHighlight.style.transition = ''; // Reset to default CSS transition (if any)
    }, 50); // Short delay to ensure the highlight moves instantly
}

// Handle fade-in effect on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Remove fade-out and apply fade-in when the page loads
        body.classList.remove('fade-out');
        body.classList.add('fade-in');

        // Update footer highlight AFTER fading in
        const currentSection = window.location.pathname.split('/').pop().replace('.html', '');
        updateFooterHighlight(currentSection);
    }, 100); // Delay to apply fade-in after page load
});

const backToTopButton = document.getElementById('backToTop');

// Function to toggle the visibility of the back-to-top button based on scroll position
function handleScroll() {
    // Set the threshold for when the button should appear (can be adjusted as needed)
    const scrollThreshold = 200; // Threshold is set to 300px

    if (window.scrollY > scrollThreshold) {
        backToTopButton.classList.remove('hidden'); // Show button
    } else {
        backToTopButton.classList.add('hidden'); // Hide button
    }
}

// Event listener for scrolling to check when to show/hide the back-to-top button
window.addEventListener('scroll', handleScroll);

// Run scroll check on page load to hide the button if the page is already at the top
document.addEventListener('DOMContentLoaded', () => {
    handleScroll(); // Check the scroll position on load to hide/show button appropriately
});

// Scroll to the top when the back-to-top button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});