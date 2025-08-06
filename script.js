// Optimized smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Use native smooth scrolling which is more performant
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optimized parallax effect with throttling and RAF
let ticking = false;
let scrollY = 0;

function updateParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1); // Reduced intensity for smoother scrolling
        const yPos = -(scrollY * speed);
        orb.style.transform = `translate3d(0, ${yPos}px, 0)`; // Use translate3d for hardware acceleration
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
    requestTick();
}, { passive: true }); // Passive listener for better performance

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

// Optimized mouse movement effect with throttling
let mouseX = 0;
let mouseY = 0;
let mouseMoveTicking = false;

function updateMouseOrbs() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const intensity = (index + 1) * 0.01; // Reduced intensity
        const xOffset = (mouseX - 0.5) * intensity * 50;
        const yOffset = (mouseY - 0.5) * intensity * 50;
        
        // Combine with existing scroll transform
        const currentScrollY = window.pageYOffset;
        const scrollSpeed = 0.3 + (index * 0.1);
        const scrollYPos = -(currentScrollY * scrollSpeed);
        
        orb.style.transform = `translate3d(${xOffset}px, ${scrollYPos + yOffset}px, 0)`;
    });
    
    mouseMoveTicking = false;
}

// Throttled mouse move handler
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    if (!mouseMoveTicking) {
        requestAnimationFrame(updateMouseOrbs);
        mouseMoveTicking = true;
    }
}, { passive: true });

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

// Optimized navigation bar background on scroll
let navTicking = false;
let lastScrollY = 0;

function updateNavigation() {
    const nav = document.querySelector('.nav');
    const currentScrollY = window.pageYOffset;
    
    // Only update if scroll position changed significantly
    if (Math.abs(currentScrollY - lastScrollY) > 5) {
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.backdropFilter = 'blur(25px)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
            nav.style.backdropFilter = 'blur(20px)';
        }
        lastScrollY = currentScrollY;
    }
    
    navTicking = false;
}

window.addEventListener('scroll', () => {
    if (!navTicking) {
        requestAnimationFrame(updateNavigation);
        navTicking = true;
    }
}, { passive: true });

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

// Combine scroll indicator with other scroll effects for better performance
let indicatorTicking = false;

function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const currentScrollY = window.pageYOffset;
    
    if (currentScrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
    }
    
    indicatorTicking = false;
}

// This is combined with the main scroll handler now

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

// Master scroll handler combining all scroll effects for optimal performance
let masterScrollTicking = false;
let lastMasterScrollY = 0;

function masterScrollHandler() {
    const currentScrollY = window.pageYOffset;
    const scrollDelta = Math.abs(currentScrollY - lastMasterScrollY);
    
    // Only process if scroll changed significantly (reduces unnecessary calculations)
    if (scrollDelta > 1) {
        // Update navigation
        const nav = document.querySelector('.nav');
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.backdropFilter = 'blur(25px)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
            nav.style.backdropFilter = 'blur(20px)';
        }
        
        // Update scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (currentScrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
        
        // Update parallax orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(currentScrollY * speed);
            const mouseXOffset = (mouseX - 0.5) * (index + 1) * 0.01 * 50;
            const mouseYOffset = (mouseY - 0.5) * (index + 1) * 0.01 * 50;
            orb.style.transform = `translate3d(${mouseXOffset}px, ${yPos + mouseYOffset}px, 0)`;
        });
        
        lastMasterScrollY = currentScrollY;
    }
    
    masterScrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!masterScrollTicking) {
        requestAnimationFrame(masterScrollHandler);
        masterScrollTicking = true;
    }
}, { passive: true });

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
