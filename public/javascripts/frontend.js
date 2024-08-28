// Dropdown Menu Toggle
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');

dropdownButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});

dropdownMenu.querySelectorAll('a').forEach(item => {
    item.addEventListener('click', () => {
        dropdownMenu.classList.add('hidden');
    });
});

// Light/Dark Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const toggleDot = document.getElementById('toggleDot');

    // Function to apply dark mode
    function applyDarkMode() {
        body.classList.add('dark');
        header.classList.add('dark');
        footer.classList.add('dark');
        toggleDot.style.transform = 'translateX(1.5rem)';
    }

    // Function to remove dark mode
    function removeDarkMode() {
        body.classList.remove('dark');
        header.classList.remove('dark');
        footer.classList.remove('dark');
        toggleDot.style.transform = 'translateX(0)';
    }

    // Load and apply the dark mode preference from localStorage
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        themeToggle.checked = true;
        applyDarkMode();
    } else {
        themeToggle.checked = false;
        removeDarkMode();
    }

    // Toggle dark mode and store preference
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            localStorage.setItem('darkMode', 'enabled');
            applyDarkMode();
        } else {
            localStorage.setItem('darkMode', 'disabled');
            removeDarkMode();
        }
    });

    // Highlight Footer Section Based on Route
    const footerSections = document.querySelectorAll('.footer-section');
    const footerHighlight = document.getElementById('footerHighlight');
    const currentPath = window.location.pathname;

    let lastIndex = -1;

    footerSections.forEach((section, index) => {
        section.classList.remove('selected');

        if (section.getAttribute('href') === currentPath) {
            section.classList.add('selected');
            footerHighlight.style.transform = `translateX(${index * 100}%)`;
            lastIndex = index;
        }

        section.addEventListener('click', function () {
            if (index !== lastIndex) {
                footerSections.forEach(sec => sec.classList.remove('selected'));
                this.classList.add('selected');
                footerHighlight.style.transform = `translateX(${index * 100}%)`;
                lastIndex = index;
            }
        });
    });
});
