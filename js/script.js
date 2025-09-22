// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for CTA button
function scrollToProducts() {
    document.getElementById('productsGrid').scrollIntoView({
        behavior: 'smooth'
    });
}

// Image Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');

function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentSlide) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

// Auto-slide functionality
let autoSlideInterval;
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Pause auto-slide on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', stopAutoSlide);
sliderContainer.addEventListener('mouseleave', startAutoSlide);

// Initialize slider
if (slides.length > 0) {
    createDots();
    updateSlider();
    startAutoSlide();
}

// Timeline Animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Form Validation
function validateForm() {
    let isValid = true;
    const form = document.getElementById('contactForm');
    const errors = form.querySelectorAll('.error-message');
    
    // Clear previous errors
    errors.forEach(error => error.style.display = 'none');
    
    // Name validation
    const name = document.getElementById('name');
    if (name.value.trim().length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Phone validation (optional but if provided, should be valid)
    const phone = document.getElementById('phone');
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (phone.value && !phoneRegex.test(phone.value.replace(/\D/g, ''))) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }
    
    // Service validation
    const service = document.getElementById('service');
    if (!service.value) {
        document.getElementById('serviceError').textContent = 'Please select a service';
        document.getElementById('serviceError').style.display = 'block';
        isValid = false;
    }
    
    // Message validation
    const message = document.getElementById('message');
    if (message.value.trim().length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}

// Form submission handler
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '';
        submitBtn.appendChild(document.createTextNode('Sending...'));
        submitBtn.disabled = true;
        submitBtn.innerHTML += '<span class="loading"></span>';
        
        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you within 24 hours.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 2000);
    }
});

// Intersection Observer for animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .mv-card, .stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize timeline if present
    if (document.querySelector('.timeline')) {
        animateTimeline();
    }
    
    // Add active class to current page navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});

// Performance optimization: Preload critical resources
if ('link' in document.head) {
    const preloadLinks = [
        { href: 'images/hero.jpg', as: 'image', type: 'image/jpeg' },
        { href: 'images/team.jpg', as: 'image', type: 'image/jpeg' },
        { href: 'images/product1.jpg', as: 'image', type: 'image/jpeg' },
        { href: 'css/styles.css', as: 'style' },
        { href: 'js/script.js', as: 'script' }
    ];
    
    preloadLinks.forEach(link => {
        const preload = document.createElement('link');
        Object.keys(link).forEach(key => {
            if (key !== 'href') {
                preload.setAttribute(key, link[key]);
            }
        });
        preload.href = link.href;
        document.head.appendChild(preload);
    });
}