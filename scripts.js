// Load navigation component
function loadNavigation() {
    fetch('navigation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navigation-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading navigation:', error));
}

// Main page functionality
function initializeMainPage() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('.section');

    // Update active nav link based on scroll position
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Fade in sections on scroll
    function fadeInSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Event listeners
    window.addEventListener('scroll', () => {
        updateActiveLink();
        fadeInSections();
    });

    // Initial setup
    fadeInSections();
    updateActiveLink();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load navigation first
    loadNavigation();
    
    // Wait a bit for navigation to load, then initialize page-specific functionality
    setTimeout(() => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (currentPage === 'index.html' || currentPage === '') {
            initializeMainPage();
        }
    }, 100);
});