// Projects page JavaScript for animations, modal functionality, and interactions

// Project data - you can replace this with actual project data
const projectData = {
    photography: [
        {
            title: "Corporate Portrait Session",
            description: "Professional headshots and corporate portraits for tech startup executive team with modern lighting techniques.",
            client: "TechStart Inc.",
            date: "March 2024",
            icon: "👨‍💼"
        },
        {
            title: "Product Photography",
            description: "High-end product photography for luxury watch collection with studio lighting and creative compositions.",
            client: "Luxury Timepieces",
            date: "February 2024",
            icon: "⌚"
        },
        {
            title: "Fashion Editorial",
            description: "Creative fashion photography for spring collection featuring outdoor locations and studio portrait sessions.",
            client: "Elite Fashion",
            date: "January 2024",
            icon: "👗"
        },
        {
            title: "Event Photography",
            description: "Complete coverage of annual charity gala with candid moments, formal portraits, and documentary-style shots.",
            client: "Hope Foundation",
            date: "December 2023",
            icon: "🎉"
        },
        {
            title: "Wedding Photography",
            description: "Romantic wedding photography capturing intimate moments and celebration highlights in natural light.",
            client: "Sarah & Michael",
            date: "November 2023",
            icon: "💒"
        }
    ],
    videography: [
        {
            title: "Corporate Training Series",
            description: "Multi-part training video series for employee onboarding and development programs with professional production.",
            client: "Global Corp",
            date: "March 2024",
            icon: "🏢"
        },
        {
            title: "Wedding Ceremony Film",
            description: "Cinematic wedding videography capturing the beautiful outdoor ceremony and reception with drone footage.",
            client: "Emma & James",
            date: "February 2024",
            icon: "💒"
        },
        {
            title: "Product Launch Video",
            description: "Dynamic promotional video showcasing new smartphone features with lifestyle integration and motion graphics.",
            client: "TechGadgets Co.",
            date: "January 2024",
            icon: "📱"
        },
        {
            title: "Restaurant Promotional",
            description: "Appetizing food videography and restaurant ambiance showcase for comprehensive marketing campaign.",
            client: "Gourmet Bistro",
            date: "December 2023",
            icon: "🍽️"
        },
        {
            title: "Music Video Production",
            description: "Creative music video with artistic direction, multiple location shoots, and post-production effects.",
            client: "Rising Star Music",
            date: "November 2023",
            icon: "🎵"
        }
    ],
    films: [
        {
            title: "The Journey Home",
            description: "Feature-length documentary exploring immigration stories and the universal search for belonging and identity.",
            client: "Independent Production",
            date: "January 2024",
            icon: "🌍"
        },
        {
            title: "Local Heroes",
            description: "Documentary film highlighting community leaders and their transformative impact on local neighborhoods.",
            client: "Community Arts Center",
            date: "October 2023",
            icon: "🏘️"
        },
        {
            title: "Breaking Boundaries",
            description: "Inspirational documentary about athletes overcoming physical challenges to achieve sporting excellence.",
            client: "Sports Foundation",
            date: "August 2023",
            icon: "🏃‍♂️"
        },
        {
            title: "Voices of Change",
            description: "Social impact documentary featuring environmental activists and their fight for sustainable futures.",
            client: "Green Earth Initiative",
            date: "June 2023",
            icon: "🌱"
        }
    ],
    "short-films": [
        {
            title: "Morning Coffee",
            description: "A heartwarming 8-minute narrative about unexpected connections formed in a neighborhood café setting.",
            client: "Film Festival Entry",
            date: "March 2024",
            icon: "☕"
        },
        {
            title: "The Last Letter",
            description: "Emotional 12-minute drama exploring themes of loss, memory, and healing through powerful storytelling.",
            client: "Independent Project",
            date: "February 2024",
            icon: "✉️"
        },
        {
            title: "Urban Dreams",
            description: "Experimental 6-minute piece capturing the rhythm and energy of city life through visual poetry and music.",
            client: "Art Gallery Commission",
            date: "January 2024",
            icon: "🏙️"
        },
        {
            title: "Silent Voices",
            description: "Powerful 15-minute narrative addressing social issues through compelling character development and cinematography.",
            client: "Social Impact Film",
            date: "November 2023",
            icon: "🎭"
        },
        {
            title: "Midnight Stories",
            description: "Anthology of three interconnected 5-minute vignettes exploring themes of solitude and human connection.",
            client: "Creative Collective",
            date: "September 2023",
            icon: "🌙"
        }
    ],
    "other-works": [
        {
            title: "Animated Logo Design",
            description: "Creative motion graphics and animated logo sequences for tech startup branding campaign with modern aesthetics.",
            client: "StartupTech",
            date: "March 2024",
            icon: "🎨"
        },
        {
            title: "Social Media Campaign",
            description: "Multi-platform social media content creation including Instagram Reels, TikTok videos, and promotional content.",
            client: "Fashion Brand",
            date: "February 2024",
            icon: "📲"
        },
        {
            title: "Virtual Event Production",
            description: "Complete virtual event setup with live streaming, interactive graphics, and audience engagement features.",
            client: "Conference Organizers",
            date: "January 2024",
            icon: "💻"
        },
        {
            title: "Commercial Advertisement",
            description: "30-second television commercial with professional actors, multiple locations, and post-production effects.",
            client: "Local Business",
            date: "December 2023",
            icon: "📺"
        },
        {
            title: "Time-lapse Photography",
            description: "Creative time-lapse sequences for construction project documentation and artistic architectural showcases.",
            client: "Architecture Firm",
            date: "November 2023",
            icon: "⏰"
        }
    ]
};

// DOM elements
let modal, modalTitle, modalIcon, projectGallery, closeBtn;

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    modal = document.getElementById('projectModal');
    modalTitle = document.getElementById('modalTitleText');
    modalIcon = document.getElementById('modalIcon');
    projectGallery = document.getElementById('projectGallery');
    closeBtn = document.querySelector('.close');

    // Initialize fade-in animations
    initializeFadeInAnimations();

    // Initialize project tiles
    initializeProjectTiles();

    // Initialize modal functionality
    initializeModal();

    // Initialize staggered tile animations
    initializeTileAnimations();
});

// Fade-in animation functionality
function initializeFadeInAnimations() {
    // Add js-enabled class to body for progressive enhancement
    document.body.classList.add('js-enabled');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function isElementPartiallyInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    function handleFadeIn() {
        const fadeElements = document.querySelectorAll('.fade-in');

        fadeElements.forEach(element => {
            if (isElementPartiallyInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }

    // Initial check for elements already in view
    setTimeout(handleFadeIn, 100);

    // Handle scroll events
    window.addEventListener('scroll', handleFadeIn);
    window.addEventListener('resize', handleFadeIn);
}

// Initialize project tile interactions
function initializeProjectTiles() {
    const projectTiles = document.querySelectorAll('.project-tile');

    projectTiles.forEach(tile => {
        // Click event for opening modal
        tile.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            openProjectModal(category);
        });

        // Enhanced hover effects
        tile.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });

        tile.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add keyboard accessibility
        tile.setAttribute('tabindex', '0');
        tile.setAttribute('role', 'button');
        tile.setAttribute('aria-label', `View ${tile.querySelector('h3').textContent} projects`);

        tile.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                openProjectModal(category);
            }
        });
    });
}

// Initialize modal functionality
function initializeModal() {
    // Close modal functionality
    closeBtn.addEventListener('click', closeModal);

    // Click outside to close
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Initialize staggered tile animations on page load
function initializeTileAnimations() {
    const tiles = document.querySelectorAll('.project-tile');

    tiles.forEach((tile, index) => {
        // Set initial state
        tile.style.opacity = '0';
        tile.style.transform = 'translateY(30px)';

        // Animate with staggered timing
        setTimeout(() => {
            tile.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            tile.style.opacity = '1';
            tile.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Open project modal with category data
function openProjectModal(category) {
    const categoryData = projectData[category];
    const categoryInfo = getCategoryInfo(category);

    if (!categoryData) {
        console.error('Category data not found:', category);
        return;
    }

    // Set modal title and icon
    modalIcon.textContent = categoryInfo.icon;
    modalTitle.textContent = categoryInfo.title;

    // Clear previous content
    projectGallery.innerHTML = '';

    // Populate with project items
    categoryData.forEach((project, index) => {
        const projectItem = createProjectItem(project, index);
        projectGallery.appendChild(projectItem);
    });

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Focus management for accessibility
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
}

// Close project modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modal.setAttribute('aria-hidden', 'true');

    // Return focus to the clicked tile
    const activeTile = document.querySelector('.project-tile:focus');
    if (activeTile) {
        activeTile.focus();
    }
}

// Get category information for modal header
function getCategoryInfo(category) {
    const categoryMap = {
        'photography': { title: 'Photography Projects', icon: '📸' },
        'videography': { title: 'Videography Projects', icon: '🎥' },
        'films': { title: 'Film Projects', icon: '🎞️' },
        'short-films': { title: 'Short Film Projects', icon: '🎪' },
        'other-works': { title: 'Other Creative Works', icon: '✨' }
    };
    return categoryMap[category] || { title: 'Projects', icon: '🎬' };
}

// Create project item element
function createProjectItem(project, index) {
    const item = document.createElement('div');
    item.className = 'project-item';

    // Add animation delay for staggered loading
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';

    item.innerHTML = `
        <div class="project-image">
            ${project.icon}
        </div>
        <div class="project-details">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <div class="project-meta">
                <span class="project-date">${project.date}</span>
                <span class="project-client">${project.client}</span>
            </div>
        </div>
    `;

    // Animate item appearance
    setTimeout(() => {
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, index * 100);

    // Add hover effects
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    return item;
}

// Add parallax effect to project tiles on scroll
function addParallaxEffect() {
    const tiles = document.querySelectorAll('.project-tile');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        tiles.forEach((tile, index) => {
            const speed = (index % 2 === 0) ? 0.5 : -0.5;
            tile.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Add intersection observer for better performance
function initializeIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add special effects for project tiles
                if (entry.target.classList.contains('project-tile')) {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Add ripple effect to clickable elements
function addRippleEffect() {
    const clickableElements = document.querySelectorAll('.project-tile');

    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add smooth scroll behavior for better UX
function initializeSmoothScroll() {
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
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize intersection observer for better performance
    if ('IntersectionObserver' in window) {
        initializeIntersectionObserver();
    }

    // Add ripple effects
    addRippleEffect();

    // Initialize smooth scrolling
    initializeSmoothScroll();

    // Add keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'block') {
            // Navigate modal content with arrow keys
            const modalItems = modal.querySelectorAll('.project-item');
            const focusedItem = document.activeElement;
            const currentIndex = Array.from(modalItems).indexOf(focusedItem);

            switch(e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentIndex < modalItems.length - 1) {
                        modalItems[currentIndex + 1].focus();
                    }
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        modalItems[currentIndex - 1].focus();
                    }
                    break;
            }
        }
    });
});

// Add dynamic styles for animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: rippleAnimation 0.6s linear;
        pointer-events: none;
        z-index: 1;
    }

    @keyframes rippleAnimation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }

    @keyframes slideInUp {
        0% {
            opacity: 0;
            transform: translateY(50px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .project-tile {
        position: relative;
        overflow: hidden;
    }

    .project-item {
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .project-item:focus {
        outline: 2px solid #ff6b6b;
        outline-offset: 2px;
    }

    .modal {
        backdrop-filter: blur(8px);
    }

    .modal[aria-hidden="true"] {
        display: none !important;
    }

    .modal[aria-hidden="false"] {
        display: block !important;
    }
`;

document.head.appendChild(dynamicStyles);