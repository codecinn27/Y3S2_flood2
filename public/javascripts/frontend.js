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
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const header = document.querySelector('header'); // Ensure header is included
const footer = document.querySelector('footer');  // Select the footer element
const toggleDot = document.getElementById('toggleDot'); // Add this line

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('dark');
        header.classList.add('dark'); // Add this line to change header color
        footer.classList.add('dark');
        toggleDot.style.transform = 'translateX(1.5rem)'; // Ensure this value aligns with your CSS
    } else {
        body.classList.remove('dark');
        header.classList.remove('dark'); // Add this line to revert header color
        footer.classList.remove('dark');
        toggleDot.style.transform = 'translateX(0)';
    }
});

document.querySelectorAll('.footer-section').forEach((section, index) => {
    section.addEventListener('click', function() {
        document.querySelectorAll('.footer-section').forEach(sec => sec.classList.remove('selected'));
        this.classList.add('selected');
        
        const footerHighlight = document.getElementById('footerHighlight');
        footerHighlight.style.transform = `translateX(${index * 100}%)`;
    });
});
