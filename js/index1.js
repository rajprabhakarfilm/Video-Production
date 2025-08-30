// Generate image paths for each folder
function generateFolderImages(folderName, start, end) {
    const paths = [];
    for (let i = start; i <= end; i++) {
        paths.push(`photos/${folderName}/${i}.jpg`);
    }
    return paths;
}

// Create image collections for each section
const imageCollections = {
    aboutImages: generateFolderImages('about-me', 1, 12),
    workImages: generateFolderImages('work-experience', 13, 25),
    creativeImages: generateFolderImages('creative-vision', 26, 35)
};

// Slideshow configuration
const slideshowConfig = {
    aboutSlideshow: {
        images: imageCollections.aboutImages,
        interval: 4000,
        fallbackIcon: '📷'
    },
    workSlideshow: {
        images: imageCollections.workImages,
        interval: 5000,
        fallbackIcon: '🎬'
    },
    creativeSlideshow: {
        images: imageCollections.creativeImages,
        interval: 3500,
        fallbackIcon: '✨'
    }
};

class Slideshow {
    constructor(containerId, config) {
        this.container = document.getElementById(containerId);
        this.images = config.images;
        this.interval = config.interval;
        this.fallbackIcon = config.fallbackIcon;
        this.currentSlide = 0;
        this.slides = [];
        this.autoplayTimer = null;

        this.init();
    }

    init() {
        this.createSlides();
        this.createControls();
        this.startAutoplay();
        this.addEventListeners();
    }

    createSlides() {
        this.images.forEach((imageSrc, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;

            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `Slide ${index + 1}`;

            const fallback = document.createElement('div');
            fallback.className = 'slide-fallback';
            fallback.textContent = this.fallbackIcon;
            fallback.style.display = 'none';

            img.onerror = () => {
                img.style.display = 'none';
                fallback.style.display = 'flex';
            };

            slide.appendChild(img);
            slide.appendChild(fallback);
            this.container.appendChild(slide);
            this.slides.push(slide);
        });
    }

    createControls() {
        const controls = document.createElement('div');
        controls.className = 'slideshow-controls';

        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `control-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            controls.appendChild(dot);
        });

        this.container.appendChild(controls);
        this.controlDots = controls.querySelectorAll('.control-dot');
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.controlDots[this.currentSlide].classList.remove('active');

        this.currentSlide = index;

        this.slides[this.currentSlide].classList.add('active');
        this.controlDots[this.currentSlide].classList.add('active');

        this.resetAutoplay();
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    startAutoplay() {
        this.autoplayTimer = setInterval(() => {
            this.nextSlide();
        }, this.interval);
    }

    resetAutoplay() {
        clearInterval(this.autoplayTimer);
        this.startAutoplay();
    }

    addEventListeners() {
        this.container.addEventListener('mouseenter', () => {
            clearInterval(this.autoplayTimer);
        });

        this.container.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });
    }
}

// Initialize slideshows when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    Object.keys(slideshowConfig).forEach(containerId => {
        new Slideshow(containerId, slideshowConfig[containerId]);
    });

    // Scroll animations
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

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add staggered animation delay
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.2}s`;
    });
});

// Smooth scrolling for navigation links
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
