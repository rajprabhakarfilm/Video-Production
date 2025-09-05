// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Scroll animations setup
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add staggered animation delay for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add hover effects to service cards
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add dynamic background particles effect
    createBackgroundParticles();

    // Add price highlight animation
    animatePrices();
});

//// Create subtle background particles
//function createBackgroundParticles() {
//    const particleCount = 50;
//    const particles = [];
//
//    for (let i = 0; i < particleCount; i++) {
//        const particle = document.createElement('div');
//        particle.style.cssText = `
//            position: fixed;
//            width: 6px;
//            height: 6px;
//            background: rgba(251, 191, 36, 0.5);   /* 🌟 soft golden yellow */
//            border-radius: 50%;
//            pointer-events: none;
//            z-index: 1;
//            filter: blur(2px) brightness(1.1);     /* subtle glassy glow */
//            box-shadow: 0 0 10px rgba(251, 191, 36, 0.35); /* soft golden halo */
//            animation: twinkle 3s ease-in-out infinite alternate; /* ✨ shimmer */
//        `;
//
//        // Random starting position
//        particle.style.left = Math.random() * 100 + '%';
//        particle.style.top = Math.random() * 100 + '%';
//
//        document.body.appendChild(particle);
//        particles.push({
//            element: particle,
//            x: Math.random() * window.innerWidth,
//            y: Math.random() * window.innerHeight,
//            vx: (Math.random() - 0.5) * 0.5,
//            vy: (Math.random() - 0.5) * 0.5
//        });
//    }
//
//    // Animate particles
//    function animateParticles() {
//        particles.forEach(particle => {
//            particle.x += particle.vx;
//            particle.y += particle.vy;
//
//            // Wrap around screen edges
//            if (particle.x < 0) particle.x = window.innerWidth;
//            if (particle.x > window.innerWidth) particle.x = 0;
//            if (particle.y < 0) particle.y = window.innerHeight;
//            if (particle.y > window.innerHeight) particle.y = 0;
//
//            particle.element.style.left = particle.x + 'px';
//            particle.element.style.top = particle.y + 'px';
//        });
//
//        requestAnimationFrame(animateParticles);
//    }
//
//    animateParticles();
//}

// Animate price numbers with counting effect
function animatePrices() {
    const priceElements = document.querySelectorAll('.service-price strong');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceElement = entry.target;
                const priceText = priceElement.textContent;
                const priceMatch = priceText.match(/\$(\d+(?:,\d+)?)/);

                if (priceMatch) {
                    const targetPrice = parseInt(priceMatch[1].replace(',', ''));
                    animateCounter(priceElement, 0, targetPrice, priceText);
                }
            }
        });
    }, { threshold: 0.5 });

    priceElements.forEach(el => observer.observe(el));
}

// Counter animation function
function animateCounter(element, start, end, originalText) {
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + (end - start) * easeOutQuart);

        // Format the number with commas if needed
        const formattedValue = currentValue.toLocaleString();

        if (originalText.includes('/hour')) {
            element.textContent = `$${formattedValue}/hour`;
        } else {
            element.textContent = `$${formattedValue}`;
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = originalText; // Ensure final value is exact
        }
    }

    requestAnimationFrame(updateCounter);
}

// Add service card interaction effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 107, 107, 0.2);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle window resize for particle system
window.addEventListener('resize', function() {
    // Update particle bounds on window resize
    const particles = document.querySelectorAll('body > div[style*="position: fixed"]');
    particles.forEach(particle => {
        const x = parseFloat(particle.style.left);
        const y = parseFloat(particle.style.top);

        if (x > window.innerWidth) particle.style.left = '0px';
        if (y > window.innerHeight) particle.style.top = '0px';
    });
});

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Fade in page content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add navigation active state management
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentPage) ||
            (currentPage === '' && link.getAttribute('href').includes('index'))) {
            link.classList.add('active');
        }
    });
});