// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for gradient orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        orb.style.transform = `translateY(${yPos}px)`;
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .section-header, .split-content, .floating-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mouse movement effect for hero gradient orbs
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    isMouseMoving = true;
    
    clearTimeout(isMouseMoving);
    isMouseMoving = setTimeout(() => {
        isMouseMoving = false;
    }, 150);
});

// Subtle mouse tracking for orbs
function updateOrbPositions() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        if (isMouseMoving) {
            const intensity = (index + 1) * 0.02;
            const xOffset = (mouseX - 0.5) * intensity * 100;
            const yOffset = (mouseY - 0.5) * intensity * 100;
            
            orb.style.transform += ` translate(${xOffset}px, ${yOffset}px)`;
        }
    });
    
    requestAnimationFrame(updateOrbPositions);
}

updateOrbPositions();

// Button interaction effects
document.querySelectorAll('.cta-button, .contact-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(0) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
});

// Navigation bar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
        nav.style.backdropFilter = 'blur(25px)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
        nav.style.backdropFilter = 'blur(20px)';
    }
});

// Floating card interactive tilt effect
document.querySelector('.floating-card')?.addEventListener('mousemove', function(e) {
    const card = this;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    
    const rotateX = deltaY * -5;
    const rotateY = deltaX * 5;
    
    card.style.transform = `rotate(5deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
});

document.querySelector('.floating-card')?.addEventListener('mouseleave', function() {
    this.style.transform = 'rotate(5deg) rotateX(0deg) rotateY(0deg) translateZ(0px)';
});

// Enhanced scroll indicator
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
    }
});

// Add subtle animations to feature icons
document.querySelectorAll('.feature-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Logo hover effect
document.querySelector('.logo').addEventListener('mouseenter', function() {
    this.querySelector('.logo-text').style.transform = 'scale(1.05)';
});

document.querySelector('.logo').addEventListener('mouseleave', function() {
    this.querySelector('.logo-text').style.transform = 'scale(1)';
});

// Improved mobile experience
if (window.innerWidth <= 768) {
    // Disable heavy animations on mobile for better performance
    document.querySelectorAll('.gradient-orb').forEach(orb => {
        orb.style.animation = 'none';
    });
    
    // Simplified scroll effects for mobile
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelector('.hero-background').style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}

// Preload critical animations
document.addEventListener('DOMContentLoaded', () => {
    // Force a reflow to ensure CSS animations are ready
    document.body.offsetHeight;
    
    // Add loaded class to body for any CSS transitions that should wait
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Custom cursor effect (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Add performance monitoring
let lastScrollTime = 0;
window.addEventListener('scroll', () => {
    const now = performance.now();
    if (now - lastScrollTime > 16) { // Limit to ~60fps
        lastScrollTime = now;
        // Scroll-based animations here
    }
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Neon website initialized');
    
    // Add any initialization code here
    const heroTitle = safeQuerySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }
});
