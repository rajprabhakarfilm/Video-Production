// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle functionality
    function createMobileMenu() {
        const nav = document.querySelector('nav');
        const navUl = document.querySelector('nav ul');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        // Insert mobile menu button
        const headerContent = document.querySelector('.header-content');
        headerContent.appendChild(mobileMenuBtn);
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                
                nav ul {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    display: none;
                }
                
                nav ul.active {
                    display: flex;
                }
                
                nav ul li {
                    margin-bottom: 0.5rem;
                }
                
                header {
                    position: relative;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Mobile menu toggle functionality
        mobileMenuBtn.addEventListener('click', function() {
            navUl.classList.toggle('active');
            mobileMenuBtn.innerHTML = navUl.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navUl.classList.remove('active');
                    mobileMenuBtn.innerHTML = '☰';
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Active navigation highlighting
    function updateActiveNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkPath = link.getAttribute('href');
            
            // Handle different page scenarios
            if (currentPath.includes('services') && linkPath.includes('services')) {
                link.classList.add('active');
            } else if (currentPath.includes('contact') && linkPath.includes('contact')) {
                link.classList.add('active');
            } else if (currentPath === '/' || currentPath.includes('index')) {
                if (linkPath === 'index.html' || linkPath === '../index.html') {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Header scroll effect
    function initHeaderScrollEffect() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                header.style.backdropFilter = 'none';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Intersection Observer for animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.service-card, .contact-info, .contact-form-container, .cta-section');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }
    
    // Initialize all navigation features
    createMobileMenu();
    initSmoothScrolling();
    updateActiveNavigation();
    initHeaderScrollEffect();
    initScrollAnimations();
    
    // Re-run active navigation update on page load
    window.addEventListener('load', updateActiveNavigation);
});