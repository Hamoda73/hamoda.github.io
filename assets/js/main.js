// Main JavaScript for Mohamed Khelifi's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header-content').appendChild(mobileMenuToggle);
    
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}` || 
                item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);
    highlightNavItem(); // Run once on load
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-card, .timeline-content, .project-card, .education-item, .certification-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.skill-card, .timeline-content, .project-card, .education-item, .certification-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Dark mode toggle (optional)
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.querySelector('.header-content').appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('light-mode') ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', document.body.classList.contains('light-mode') ? 'off' : 'on');
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'off') {
        document.body.classList.add('light-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Form validation for contact form (if added later)
function validateForm() {
    const name = document.forms["contactForm"]["name"].value;
    const email = document.forms["contactForm"]["email"].value;
    const message = document.forms["contactForm"]["message"].value;
    
    if (name === "" || email === "" || message === "") {
        alert("Please fill all required fields");
        return false;
    }
    
    return true;
}