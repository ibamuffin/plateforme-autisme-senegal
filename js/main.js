// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const navbar = document.querySelector('.navbar');

// Web 3.0 Image Animations and Particle Effects
class ParticleEffect {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
    }
    
    createCanvas(parent) {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '10';
        this.canvas.style.opacity = '0.8';
        
        const rect = parent.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        parent.style.position = 'relative';
        parent.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        return this.canvas;
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 4 + 2,
            color: `hsl(${Math.random() * 40 + 210}, 80%, ${Math.random() * 30 + 50}%)`, // Tons bleus autisme
            opacity: Math.random() * 0.8 + 0.2,
            life: Math.random() * 100 + 50
        };
    }
    
    start(particleCount = 15) {
        if (!this.canvas || !this.ctx) return;
        
        this.particles = [];
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(this.createParticle());
        }
        
        this.animate();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            particle.opacity *= 0.98;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            // Remove dead particles
            if (particle.life <= 0 || particle.opacity < 0.01) {
                this.particles[index] = this.createParticle();
            }
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.canvas) {
            this.canvas.remove();
            this.canvas = null;
            this.ctx = null;
        }
    }
}

// Image interaction effects
function initWeb3ImageEffects() {
    const images = document.querySelectorAll('.hero-image, .context-image, .objectives-image, .activities-image, .results-image');
    
    images.forEach(image => {
        let particleEffect = null;
        let glitchInterval = null;
        
        // Mouse enter - Start particle effect
        image.addEventListener('mouseenter', () => {
            // Particle effect
            particleEffect = new ParticleEffect();
            particleEffect.createCanvas(image.parentElement);
            particleEffect.start(20);
            
            // Subtle glitch effect
            let glitchCount = 0;
            glitchInterval = setInterval(() => {
                if (glitchCount < 3) {
                    image.style.filter = image.style.filter + ' hue-rotate(10deg)';
                    setTimeout(() => {
                        image.style.filter = image.style.filter.replace(' hue-rotate(10deg)', '');
                    }, 50);
                    glitchCount++;
                } else {
                    clearInterval(glitchInterval);
                }
            }, 200);
            
            // Add floating elements
            createFloatingElements(image);
        });
        
        // Mouse leave - Stop effects
        image.addEventListener('mouseleave', () => {
            if (particleEffect) {
                particleEffect.stop();
                particleEffect = null;
            }
            
            if (glitchInterval) {
                clearInterval(glitchInterval);
            }
            
            // Remove floating elements
            removeFloatingElements(image);
        });
        
        // Click effect - Ripple
        image.addEventListener('click', (e) => {
            createRippleEffect(e, image);
        });
    });
}

// Create floating elements around images
function createFloatingElements(image) {
    const container = image.parentElement;
    const symbols = ['🧩', '💙', '🌟', '🤝', '📚', '🏥', '🎯'];
    
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.className = 'floating-symbol';
        element.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        element.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 10 + 15}px;
            opacity: 0.8;
            z-index: 5;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-symbol ${3 + Math.random() * 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            filter: drop-shadow(0 2px 4px rgba(30, 64, 175, 0.3));
        `;
        
        container.appendChild(element);
    }
}

// Remove floating elements
function removeFloatingElements(image) {
    const container = image.parentElement;
    const floatingElements = container.querySelectorAll('.floating-symbol');
    floatingElements.forEach(element => {
        element.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => element.remove(), 300);
    });
}

// Create ripple effect on click
function createRippleEffect(e, image) {
    const rect = image.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = 100;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, 
            rgba(30, 64, 175, 0.8), 
            rgba(37, 99, 235, 0.6), 
            rgba(59, 130, 246, 0.4), 
            transparent);
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
        pointer-events: none;
        z-index: 10;
        animation: ripple 0.6s ease-out forwards;
        box-shadow: 0 0 20px rgba(30, 64, 175, 0.5);
    `;
    
    image.parentElement.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add CSS animations dynamically
function addWeb3Animations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-symbol {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeOut {
            0% { opacity: 0.7; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.5); }
        }
        
        /* Cursor effects */
        .hero-image, .context-image, .objectives-image, .activities-image, .results-image {
            cursor: none;
        }
        
        .hero-image:hover, .context-image:hover, .objectives-image:hover, 
        .activities-image:hover, .results-image:hover {
            cursor: none;
        }
        
        /* Custom cursor with autism blue */
        body {
            cursor: url('data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="rgba(30,64,175,0.4)" stroke="rgba(30,64,175,0.9)" stroke-width="2"/></svg>') 10 10, auto;
        }
        
        .hero-image:hover, .context-image:hover, .objectives-image:hover, 
        .activities-image:hover, .results-image:hover {
            cursor: url('data:image/svg+xml;utf8,<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="12" fill="rgba(30,64,175,0.6)" stroke="rgba(30,64,175,1)" stroke-width="3"/><circle cx="15" cy="15" r="3" fill="rgba(30,64,175,1)"/></svg>') 15 15, pointer;
        }
    `;
    document.head.appendChild(style);
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile nav when clicking on a link
function closeMobileNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    closeMobileNav();
}

// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        type: formData.get('type'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Message envoyé avec succès!', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name.trim()) {
        errors.push('Le nom est requis');
    }
    
    if (!data.email.trim()) {
        errors.push('L\'email est requis');
    } else if (!isValidEmail(data.email)) {
        errors.push('L\'email n\'est pas valide');
    }
    
    if (!data.type) {
        errors.push('Veuillez sélectionner un type de contact');
    }
    
    if (!data.message.trim()) {
        errors.push('Le message est requis');
    } else if (data.message.trim().length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <div class="notification-message">${message}</div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles with autism blue theme
    const colors = {
        success: '#10b981',
        error: '#ef4444', 
        info: '#1e40af',  // Autism blue primary
        warning: '#f59e0b'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 15px 30px rgba(30, 64, 175, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate objective cards with delay
                if (entry.target.classList.contains('objective-card')) {
                    const cards = document.querySelectorAll('.objective-card');
                    cards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 0.1}s`;
                    });
                }
                
                // Animate progress bars
                if (entry.target.classList.contains('result-card')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        progressBar.style.animationDelay = '0.5s';
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.objective-card, .result-card, .timeline-item, .infographic-item');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current section's nav link
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

// Statistics counter animation
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent;
                
                // Only animate if it's a number
                if (finalValue.includes('/')) {
                    // Handle fraction like "1/160"
                    animateFraction(stat, finalValue);
                } else if (finalValue.includes('%')) {
                    // Handle percentage
                    animatePercentage(stat, finalValue);
                }
                
                observer.unobserve(stat);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateFraction(element, finalValue) {
    const parts = finalValue.split('/');
    if (parts.length === 2) {
        const numerator = parseInt(parts[0]);
        const denominator = parseInt(parts[1]);
        let currentNumerator = 0;
        let currentDenominator = denominator - 50; // Start animation from a lower value
        
        const interval = setInterval(() => {
            if (currentNumerator < numerator) currentNumerator++;
            if (currentDenominator < denominator) currentDenominator += 5;
            
            element.textContent = `${currentNumerator}/${currentDenominator}`;
            
            if (currentNumerator === numerator && currentDenominator === denominator) {
                clearInterval(interval);
            }
        }, 50);
    }
}

function animatePercentage(element, finalValue) {
    const targetValue = parseFloat(finalValue.replace('%', ''));
    let currentValue = 0;
    
    const interval = setInterval(() => {
        currentValue += 0.05;
        element.textContent = `${currentValue.toFixed(1)}%`;
        
        if (currentValue >= targetValue) {
            element.textContent = finalValue;
            clearInterval(interval);
        }
    }, 50);
}

// Add CSS for active nav link
function addActiveNavStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary-color);
        }
        .nav-link.active::after {
            width: 100%;
        }
        .animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }
    `;
    document.head.appendChild(style);
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    const puzzlePieces = document.querySelector('.puzzle-pieces');
    
    if (!hero || !puzzlePieces) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < window.innerHeight) {
            puzzlePieces.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileNav();
        }
        
        // Navigate sections with arrow keys
        if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            e.preventDefault();
            const sections = Array.from(document.querySelectorAll('section[id]'));
            const currentSection = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom > 100;
            });
            
            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                const nextIndex = e.key === 'ArrowDown' 
                    ? Math.min(currentIndex + 1, sections.length - 1)
                    : Math.max(currentIndex - 1, 0);
                
                const nextSection = sections[nextIndex];
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
}

// Add loading state to CTA buttons
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Don't prevent default if it's a navigation link
            if (button.getAttribute('href').startsWith('#')) {
                return;
            }
            
            // Add loading animation for external links
            e.preventDefault();
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                // Navigate to the link
                window.location.href = button.getAttribute('href');
            }, 1000);
        });
    });
}

// Background Animation System (Simplified for SVG)
class AnimatedBackground {
    constructor() {
        this.container = document.getElementById('animatedBg');
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.addBackgroundEffects();
        // Démarrer les particules bleu autisme
        setInterval(() => this.addAutismParticles(), 8000);
    }
    
    addBackgroundEffects() {
        // Add subtle interactive effects without DOM manipulation
        this.container.style.transition = 'all 0.3s ease';
        
        // Effet de particules bleu autisme
        this.addAutismParticles();
    }
    
    bindEvents() {
        // Increase visibility on scroll
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            this.container.style.opacity = Math.min(0.9, 0.6 + scrollPercent * 0.3);
        });
        
        // Interactive response to mouse movement
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Subtle parallax effect
            const offsetX = (mouseX - 0.5) * 10;
            const offsetY = (mouseY - 0.5) * 10;
            this.container.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    }
    
    // Effet de particules bleu autisme
    addAutismParticles() {
        if (!this.container) return;
        
        const particleCount = 8;
        const autismBlueColors = ['#1e40af', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'];
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 3 + 3}px;
                    height: ${Math.random() * 3 + 3}px;
                    background: ${autismBlueColors[Math.floor(Math.random() * autismBlueColors.length)]};
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    opacity: 0.7;
                    animation: autism-sparkle 5s ease-in-out infinite;
                    z-index: -1;
                    box-shadow: 0 0 10px ${autismBlueColors[Math.floor(Math.random() * autismBlueColors.length)]};
                `;
                
                this.container.appendChild(particle);
                
                // Supprimer la particule après l'animation
                setTimeout(() => {
                    if (particle && particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 5000);
            }, i * 600);
        }
    }
}

// Donation System with Senegalese Payment APIs
class DonationSystem {
    constructor() {
        this.selectedAmount = 0;
        this.selectedPaymentMethod = '';
        this.formData = {};
        this.init();
    }
    
    init() {
        this.bindFormEvents();
        this.initializeCounters();
        this.setupPaymentMethods();
    }
    
    bindFormEvents() {
        const form = document.getElementById('donationForm');
        const amountBtns = document.querySelectorAll('.amount-btn');
        const customAmount = document.getElementById('customAmount');
        const paymentBtns = document.querySelectorAll('.payment-btn');
        const donateBtn = document.querySelector('.donate-btn');
        
        // Amount selection
        amountBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                amountBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedAmount = parseInt(btn.dataset.amount);
                customAmount.value = '';
                this.updateDonateButton();
            });
        });
        
        // Custom amount
        customAmount.addEventListener('input', (e) => {
            const amount = parseInt(e.target.value) || 0;
            if (amount >= 1000) {
                amountBtns.forEach(b => b.classList.remove('selected'));
                this.selectedAmount = amount;
                this.updateDonateButton();
            }
        });
        
        // Payment method selection
        paymentBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                paymentBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedPaymentMethod = btn.dataset.method;
            });
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processDonation();
        });
    }
    
    updateDonateButton() {
        const amountDisplay = document.querySelector('.amount-display');
        amountDisplay.textContent = `${this.selectedAmount.toLocaleString()} FCFA`;
        
        const donateBtn = document.querySelector('.donate-btn');
        if (this.selectedAmount > 0) {
            donateBtn.style.transform = 'scale(1.02)';
            donateBtn.style.background = 'linear-gradient(135deg, #1e40af, #2563eb, #3b82f6)';
            donateBtn.style.boxShadow = '0 8px 25px rgba(30, 64, 175, 0.4)';
        }
    }
    
    initializeCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        // Check if element has data-text attribute (for text like "1/160")
        if (element.hasAttribute('data-text')) {
            const text = element.getAttribute('data-text');
            element.textContent = text;
            element.style.animation = 'fadeInUp 1s ease-out';
            return;
        }
        
        // For numeric values
        const target = parseInt(element.dataset.target);
        if (isNaN(target)) return;
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    setupPaymentMethods() {
        // Payment method configurations
        this.paymentConfigs = {
            orange: {
                name: 'Orange Money',
                apiUrl: 'https://api.orange.com/orange-money-webpay/dev/v1',
                merchantId: 'YOUR_ORANGE_MERCHANT_ID',
                secretKey: 'YOUR_ORANGE_SECRET_KEY'
            },
            wave: {
                name: 'Wave',
                apiUrl: 'https://api.wave.com/v1',
                merchantId: 'YOUR_WAVE_MERCHANT_ID',
                secretKey: 'YOUR_WAVE_SECRET_KEY'
            },
            mixyas: {
                name: 'Mixyas',
                apiUrl: 'https://api.mixyas.com/v1',
                merchantId: 'YOUR_MIXYAS_MERCHANT_ID',
                secretKey: 'YOUR_MIXYAS_SECRET_KEY'
            },
            mastercard: {
                name: 'Mastercard',
                apiUrl: 'https://api.mastercard.com/v1',
                merchantId: 'YOUR_MASTERCARD_MERCHANT_ID'
            },
            visa: {
                name: 'Visa',
                apiUrl: 'https://api.visa.com/v1',
                merchantId: 'YOUR_VISA_MERCHANT_ID'
            },
            paypal: {
                name: 'PayPal',
                apiUrl: 'https://api.paypal.com/v1',
                clientId: 'YOUR_PAYPAL_CLIENT_ID'
            }
        };
    }
    
    async processDonation() {
        const donateBtn = document.querySelector('.donate-btn');
        const originalHTML = donateBtn.innerHTML;
        
        try {
            // Show loading state
            donateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
            donateBtn.disabled = true;
            
            // Collect form data
            this.collectFormData();
            
            // Validate form
            if (!this.validateForm()) {
                throw new Error('Veuillez remplir tous les champs requis');
            }
            
            // Process payment based on selected method
            const result = await this.processPayment();
            
            if (result.success) {
                this.showSuccessMessage(result);
            } else {
                throw new Error(result.message || 'Erreur de traitement du paiement');
            }
            
        } catch (error) {
            this.showErrorMessage(error.message);
        } finally {
            donateBtn.innerHTML = originalHTML;
            donateBtn.disabled = false;
        }
    }
    
    collectFormData() {
        this.formData = {
            amount: this.selectedAmount,
            currency: 'XOF', // FCFA
            donorName: document.getElementById('donorName').value,
            donorEmail: document.getElementById('donorEmail').value,
            donorPhone: document.getElementById('donorPhone').value,
            paymentMethod: this.selectedPaymentMethod,
            isMonthly: document.getElementById('monthlyDonation').checked,
            isAnonymous: document.getElementById('anonymous').checked,
            timestamp: new Date().toISOString()
        };
    }
    
    validateForm() {
        return this.selectedAmount >= 1000 && 
               this.selectedPaymentMethod && 
               this.formData.donorName && 
               this.formData.donorEmail && 
               this.formData.donorPhone;
    }
    
    async processPayment() {
        const config = this.paymentConfigs[this.selectedPaymentMethod];
        
        switch (this.selectedPaymentMethod) {
            case 'orange':
                return await this.processOrangeMoney(config);
            case 'wave':
                return await this.processWave(config);
            case 'mixyas':
                return await this.processMixyas(config);
            case 'mastercard':
            case 'visa':
                return await this.processCreditCard(config);
            case 'paypal':
                return await this.processPayPal(config);
            default:
                throw new Error('Méthode de paiement non supportée');
        }
    }
    
    async processOrangeMoney(config) {
        // Orange Money API integration
        const payload = {
            merchant_key: config.merchantId,
            currency: this.formData.currency,
            order_id: this.generateOrderId(),
            amount: this.selectedAmount,
            return_url: window.location.origin + '/donation-success',
            cancel_url: window.location.origin + '/donation-cancel',
            notif_url: window.location.origin + '/donation-notify',
            lang: 'fr',
            customer_name: this.formData.donorName,
            customer_email: this.formData.donorEmail,
            customer_phone: this.formData.donorPhone
        };
        
        try {
            // Simulate API call (replace with actual Orange Money API)
            await this.simulatePaymentAPI('Orange Money', payload);
            return { success: true, provider: 'Orange Money', transactionId: this.generateTransactionId() };
        } catch (error) {
            return { success: false, message: 'Erreur lors du paiement Orange Money' };
        }
    }
    
    async processWave(config) {
        // Wave API integration
        const payload = {
            amount: this.selectedAmount,
            currency: this.formData.currency,
            customer: {
                name: this.formData.donorName,
                email: this.formData.donorEmail,
                phone: this.formData.donorPhone
            },
            metadata: {
                donation_type: this.formData.isMonthly ? 'monthly' : 'one_time',
                anonymous: this.formData.isAnonymous
            }
        };
        
        try {
            await this.simulatePaymentAPI('Wave', payload);
            return { success: true, provider: 'Wave', transactionId: this.generateTransactionId() };
        } catch (error) {
            return { success: false, message: 'Erreur lors du paiement Wave' };
        }
    }
    
    async processMixyas(config) {
        // Mixyas API integration
        const payload = {
            merchant_id: config.merchantId,
            amount: this.selectedAmount,
            currency: this.formData.currency,
            customer_info: {
                name: this.formData.donorName,
                email: this.formData.donorEmail,
                phone: this.formData.donorPhone
            }
        };
        
        try {
            await this.simulatePaymentAPI('Mixyas', payload);
            return { success: true, provider: 'Mixyas', transactionId: this.generateTransactionId() };
        } catch (error) {
            return { success: false, message: 'Erreur lors du paiement Mixyas' };
        }
    }
    
    async processCreditCard(config) {
        // Credit Card (Mastercard/Visa) processing
        const payload = {
            amount: this.selectedAmount,
            currency: this.formData.currency,
            card_type: this.selectedPaymentMethod,
            customer: {
                name: this.formData.donorName,
                email: this.formData.donorEmail
            }
        };
        
        try {
            await this.simulatePaymentAPI(config.name, payload);
            return { success: true, provider: config.name, transactionId: this.generateTransactionId() };
        } catch (error) {
            return { success: false, message: `Erreur lors du paiement ${config.name}` };
        }
    }
    
    async processPayPal(config) {
        // PayPal integration
        const payload = {
            intent: 'sale',
            payer: { payment_method: 'paypal' },
            transactions: [{
                amount: {
                    total: (this.selectedAmount / 655).toFixed(2), // Convert FCFA to USD approximately
                    currency: 'USD'
                },
                description: 'Don pour la Plateforme Autisme Sénégal'
            }]
        };
        
        try {
            await this.simulatePaymentAPI('PayPal', payload);
            return { success: true, provider: 'PayPal', transactionId: this.generateTransactionId() };
        } catch (error) {
            return { success: false, message: 'Erreur lors du paiement PayPal' };
        }
    }
    
    async simulatePaymentAPI(provider, payload) {
        // Simulate API call with delay
        console.log(`Processing ${provider} payment:`, payload);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 90% success rate for demo
                if (Math.random() > 0.1) {
                    resolve({ status: 'success' });
                } else {
                    reject(new Error('Payment failed'));
                }
            }, 2000);
        });
    }
    
    generateOrderId() {
        return 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    generateTransactionId() {
        return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    showSuccessMessage(result) {
        const successHTML = `
            <div class="donation-success">
                <i class="fas fa-check-circle"></i>
                <h3>Don effectué avec succès !</h3>
                <p>Merci ${this.formData.isAnonymous ? '' : this.formData.donorName} pour votre générosité.</p>
                <p><strong>Montant :</strong> ${this.selectedAmount.toLocaleString()} FCFA</p>
                <p><strong>Méthode :</strong> ${result.provider}</p>
                <p><strong>Transaction :</strong> ${result.transactionId}</p>
                <p>Un reçu vous sera envoyé par email.</p>
            </div>
        `;
        
        this.showModal(successHTML);
        this.resetForm();
        this.triggerCelebration();
    }
    
    showErrorMessage(message) {
        const errorHTML = `
            <div class="donation-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erreur de traitement</h3>
                <p>${message}</p>
                <p>Veuillez réessayer ou contacter notre support.</p>
            </div>
        `;
        
        this.showModal(errorHTML);
    }
    
    showModal(content) {
        const modal = document.createElement('div');
        modal.className = 'donation-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                ${content}
                <button class="modal-close">Fermer</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.remove();
        });
    }
    
    resetForm() {
        document.getElementById('donationForm').reset();
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        this.selectedAmount = 0;
        this.selectedPaymentMethod = '';
        this.updateDonateButton();
    }
    
    triggerCelebration() {
        // Create celebration animation
        const celebration = document.createElement('div');
        celebration.className = 'celebration-animation';
        celebration.innerHTML = '🎉'.repeat(20);
        document.body.appendChild(celebration);
        
        setTimeout(() => celebration.remove(), 3000);
    }
}

// Games System
class GamesManager {
    constructor() {
        this.currentGame = null;
        this.gameModal = document.getElementById('gameModal');
        this.gameContent = document.getElementById('gameContent');
        this.gameTitle = document.getElementById('gameTitle');
        this.soundVolume = 50;
        this.animationSpeed = 'normal';
        this.contrastMode = 'normal';
        this.focusMode = 'standard';
        
        this.initializeAccessibilityControls();
    }

    initializeAccessibilityControls() {
        // Attendre que les éléments soient disponibles
        setTimeout(() => {
            // Volume control
            const volumeSlider = document.getElementById('sound-volume');
            const volumeDisplay = document.querySelector('.volume-display');
            
            if (volumeSlider && volumeDisplay) {
                volumeSlider.addEventListener('input', (e) => {
                    this.soundVolume = parseInt(e.target.value);
                    volumeDisplay.textContent = this.soundVolume + '%';
                });
            }

            // Animation speed control
            const animationSelect = document.getElementById('animation-speed');
            if (animationSelect) {
                animationSelect.addEventListener('change', (e) => {
                    this.animationSpeed = e.target.value;
                    document.documentElement.style.setProperty('--animation-speed', 
                        e.target.value === 'slow' ? '2s' : 
                        e.target.value === 'fast' ? '0.5s' : '1s'
                    );
                });
            }

            // Contrast mode
            const contrastBtn = document.getElementById('contrast-mode');
            if (contrastBtn) {
                contrastBtn.addEventListener('click', () => {
                    this.contrastMode = this.contrastMode === 'normal' ? 'high' : 'normal';
                    document.body.classList.toggle('high-contrast');
                    contrastBtn.innerHTML = this.contrastMode === 'high' ? 
                        '<i class="fas fa-adjust"></i> Fort contraste' : 
                        '<i class="fas fa-adjust"></i> Normal';
                    contrastBtn.classList.toggle('active');
                });
            }

            // Focus mode
            const focusBtn = document.getElementById('focus-mode');
            if (focusBtn) {
                focusBtn.addEventListener('click', () => {
                    this.focusMode = this.focusMode === 'standard' ? 'enhanced' : 'standard';
                    document.body.classList.toggle('enhanced-focus');
                    focusBtn.innerHTML = this.focusMode === 'enhanced' ? 
                        '<i class="fas fa-crosshairs"></i> Focus activé' : 
                        '<i class="fas fa-crosshairs"></i> Standard';
                    focusBtn.classList.toggle('active');
                });
            }
        }, 500);
    }

    playSound(type = 'success') {
        if (this.soundVolume === 0) return;
        
        // Simulation de sons avec des fréquences différentes
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            const frequencies = {
                success: 523.25, // C5
                error: 261.63,   // C4
                click: 440,      // A4
                complete: 659.25 // E5
            };
            
            oscillator.frequency.value = frequencies[type] || frequencies.click;
            oscillator.type = 'sine';
            gainNode.gain.value = this.soundVolume / 100 * 0.1;
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            console.log('Audio non disponible');
        }
    }

    openGame(gameType) {
        try {
            // Vérifier que les éléments DOM existent
            if (!this.gameModal || !this.gameContent || !this.gameTitle) {
                console.error('Éléments DOM des jeux non trouvés, tentative de récupération...');
                this.gameModal = document.getElementById('gameModal');
                this.gameContent = document.getElementById('gameContent');
                this.gameTitle = document.getElementById('gameTitle');
                
                if (!this.gameModal || !this.gameContent || !this.gameTitle) {
                    throw new Error('Impossible de trouver les éléments DOM des jeux');
                }
            }
            
            this.currentGame = gameType;
            this.gameModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const gameData = this.getGameData(gameType);
            this.gameTitle.textContent = gameData.title;
            
            this.loadGame(gameType);
            this.playSound('click');
            
            console.log(`🎮 Jeu ouvert: ${gameData.title}`);
        } catch (error) {
            console.error('Erreur lors de l\'ouverture du jeu:', error);
            alert('Erreur lors du chargement du jeu. Veuillez rafraîchir la page.');
        }
    }

    closeGame() {
        try {
            if (this.gameModal) {
                this.gameModal.classList.remove('active');
            }
            document.body.style.overflow = '';
            this.currentGame = null;
            this.playSound('click');
            
            console.log('🎮 Jeu fermé');
        } catch (error) {
            console.error('Erreur lors de la fermeture du jeu:', error);
            // Forcer la fermeture même en cas d'erreur
            document.body.style.overflow = '';
            this.currentGame = null;
        }
    }

    getGameData(gameType) {
        const games = {
            'puzzle-sensoriel': { title: 'Puzzle Sensoriel', color: '#1e40af' },
            'sequences-couleurs': { title: 'Séquences de Couleurs', color: '#2563eb' },
            'jardin-virtuel': { title: 'Jardin Virtuel', color: '#3b82f6' },
            'tri-formes': { title: 'Tri des Formes', color: '#60a5fa' },
            'piano-emotions': { title: 'Piano des Émotions', color: '#93c5fd' },
            'routine-quotidienne': { title: 'Ma Routine', color: '#1e3a8a' },
            'bulles-sensorielles': { title: 'Bulles Sensorielles', color: '#2563eb' },
            'animaux-sons': { title: 'Animaux et Sons', color: '#3b82f6' },
            'dessin-libre': { title: 'Atelier Dessin', color: '#1e40af' },
            'correspondance-visuelle': { title: 'Trouve les Paires', color: '#60a5fa' }
        };
        return games[gameType] || { title: 'Jeu', color: '#1e40af' };
    }

    loadGame(gameType) {
        if (!this.gameContent) {
            console.error('gameContent non disponible');
            return;
        }
        
        this.gameContent.innerHTML = '';
        
        switch(gameType) {
            case 'puzzle-sensoriel':
                this.loadPuzzleGame();
                break;
            case 'sequences-couleurs':
                this.loadSequenceGame();
                break;
            case 'jardin-virtuel':
                this.loadGardenGame();
                break;
            case 'tri-formes':
                this.loadSortingGame();
                break;
            case 'piano-emotions':
                this.loadPianoGame();
                break;
            case 'routine-quotidienne':
                this.loadRoutineGame();
                break;
            case 'bulles-sensorielles':
                this.loadBubblesGame();
                break;
            case 'animaux-sons':
                this.loadAnimalsGame();
                break;
            case 'dessin-libre':
                this.loadDrawingGame();
                break;
            case 'correspondance-visuelle':
                this.loadMatchingGame();
                break;
            default:
                this.gameContent.innerHTML = '<div style="text-align: center; color: #64748b; padding: 40px;"><h3>🎮 Jeu en cours de développement...</h3><p>Ce jeu sera bientôt disponible !</p></div>';
        }
        
        console.log(`🎯 Jeu chargé: ${gameType}`);
    }

    // Jeu 1: Puzzle Sensoriel
    loadPuzzleGame() {
        const gameHTML = `
            <div class="puzzle-game">
                <div class="puzzle-info" style="text-align: center; margin-bottom: 20px;">
                    <h4 style="color: #1f2937; margin-bottom: 10px;">Complétez le puzzle coloré !</h4>
                    <div class="puzzle-progress" style="color: #f59e0b; font-weight: 600;">
                        <span id="puzzle-pieces-placed">0</span> / 9 pièces
                    </div>
                </div>
                <div class="puzzle-board" id="puzzle-board" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 300px; margin: 0 auto 20px;">
                    ${Array(9).fill(0).map((_, i) => 
                        `<div class="puzzle-slot" data-position="${i}" style="width: 80px; height: 80px; border: 3px dashed #d1d5db; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease;"></div>`
                    ).join('')}
                </div>
                <div class="puzzle-pieces" id="puzzle-pieces" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                    ${Array(9).fill(0).map((_, i) => 
                        `<div class="puzzle-piece" data-piece="${i}" style="width: 70px; height: 70px; background: hsl(${i * 40}, 70%, 65%); border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; font-size: 1.5rem; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                            <i class="fas fa-puzzle-piece"></i>
                        </div>`
                    ).join('')}
                </div>
            </div>
        `;
        
        this.gameContent.innerHTML = gameHTML;
        this.initPuzzleGame();
    }

    initPuzzleGame() {
        const pieces = document.querySelectorAll('.puzzle-piece');
        const slots = document.querySelectorAll('.puzzle-slot');
        const progress = document.getElementById('puzzle-pieces-placed');
        let placedPieces = 0;

        // Mélanger les pièces
        const piecesContainer = document.getElementById('puzzle-pieces');
        const piecesArray = Array.from(pieces);
        piecesArray.sort(() => Math.random() - 0.5);
        piecesArray.forEach(piece => piecesContainer.appendChild(piece));

        pieces.forEach(piece => {
            piece.addEventListener('click', () => {
                if (piece.classList.contains('selected')) {
                    piece.classList.remove('selected');
                    piece.style.transform = 'scale(1)';
                    piece.style.boxShadow = '';
                } else {
                    pieces.forEach(p => {
                        p.classList.remove('selected');
                        p.style.transform = 'scale(1)';
                        p.style.boxShadow = '';
                    });
                    piece.classList.add('selected');
                    piece.style.transform = 'scale(1.1)';
                    piece.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.6)';
                    this.playSound('click');
                }
            });
        });

        slots.forEach(slot => {
            slot.addEventListener('click', () => {
                const selectedPiece = document.querySelector('.puzzle-piece.selected');
                if (selectedPiece && !slot.hasChildNodes()) {
                    const pieceId = selectedPiece.dataset.piece;
                    const slotId = slot.dataset.position;
                    
                    if (pieceId === slotId) {
                        slot.appendChild(selectedPiece);
                        selectedPiece.classList.remove('selected');
                        selectedPiece.style.transform = 'scale(1)';
                        selectedPiece.style.boxShadow = '';
                        slot.style.border = '3px solid #10b981';
                        placedPieces++;
                        progress.textContent = placedPieces;
                        this.playSound('success');
                        
                        if (placedPieces === 9) {
                            setTimeout(() => {
                                this.showGameSuccess('Puzzle terminé !', 'Bravo ! Vous avez assemblé toutes les pièces !');
                                this.playSound('complete');
                            }, 500);
                        }
                    } else {
                        this.playSound('error');
                        selectedPiece.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            selectedPiece.style.transform = selectedPiece.classList.contains('selected') ? 'scale(1.1)' : 'scale(1)';
                        }, 200);
                    }
                }
            });
            
            slot.addEventListener('mouseenter', () => {
                if (!slot.hasChildNodes()) {
                    slot.style.backgroundColor = '#f3f4f6';
                }
            });
            
            slot.addEventListener('mouseleave', () => {
                if (!slot.hasChildNodes()) {
                    slot.style.backgroundColor = '';
                }
            });
        });
    }

    showGameSuccess(title, message) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 10001;
            max-width: 400px;
            width: 90%;
        `;
        successDiv.innerHTML = `
            <div style="font-size: 3rem; color: #10b981; margin-bottom: 15px;">
                <i class="fas fa-trophy"></i>
            </div>
            <h3 style="color: #1f2937; margin-bottom: 10px;">${title}</h3>
            <p style="color: #6b7280; margin-bottom: 20px;">${message}</p>
            <button onclick="this.parentElement.remove()" style="background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; cursor: pointer;">
                <i class="fas fa-thumbs-up"></i> Super !
            </button>
        `;
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 5000);
    }

    // Jeu 2: Séquences de Couleurs
    loadSequenceGame() {
        const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
        const gameHTML = `
            <div class="sequence-game">
                <div class="sequence-info" style="text-align: center; margin-bottom: 20px;">
                    <h4 style="color: #1f2937; margin-bottom: 10px;">Répétez la séquence de couleurs</h4>
                    <div class="sequence-stats" style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
                        <span>Niveau: <strong id="sequence-level">1</strong></span>
                        <span>Score: <strong id="sequence-score">0</strong></span>
                    </div>
                </div>
                <div class="sequence-display" id="sequence-display" style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 15px; margin: 20px auto; max-width: 300px; text-align: center; min-height: 60px; display: flex; align-items: center; justify-content: center; color: #1f2937; font-weight: 600;">
                    Cliquez sur "Commencer" pour débuter !
                </div>
                <div class="color-buttons" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 30px auto; max-width: 300px;">
                    ${colors.map((color, i) => 
                        `<button class="color-btn" data-color="${i}" style="width: 80px; height: 80px; border: none; border-radius: 50%; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.2); background: ${color};" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></button>`
                    ).join('')}
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="start-sequence-btn" onclick="gamesManager.startSequenceDemo()" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; padding: 15px 30px; border-radius: 25px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-play"></i> Commencer
                    </button>
                </div>
            </div>
        `;
        
        this.gameContent.innerHTML = gameHTML;
        this.initSequenceGame();
    }

    initSequenceGame() {
        this.sequenceData = {
            sequence: [],
            playerSequence: [],
            level: 1,
            score: 0,
            isPlaying: false,
            isPlayerTurn: false,
            colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']
        };
        
        const colorButtons = document.querySelectorAll('.color-btn');
        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.sequenceData.isPlayerTurn) {
                    this.handleColorClick(parseInt(btn.dataset.color));
                }
            });
        });
    }

    startSequenceDemo() {
        this.sequenceData.isPlaying = true;
        this.sequenceData.playerSequence = [];
        this.sequenceData.sequence.push(Math.floor(Math.random() * 6));
        
        const display = document.getElementById('sequence-display');
        display.textContent = 'Mémorisez cette séquence...';
        
        this.playSequenceDemo();
    }

    playSequenceDemo() {
        const colorButtons = document.querySelectorAll('.color-btn');
        let index = 0;
        
        const playNext = () => {
            if (index < this.sequenceData.sequence.length) {
                const colorIndex = this.sequenceData.sequence[index];
                const button = colorButtons[colorIndex];
                
                button.style.transform = 'scale(1.3)';
                button.style.boxShadow = '0 0 30px rgba(255,255,255,0.8)';
                button.style.border = '4px solid white';
                this.playSound('click');
                
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                    button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                    button.style.border = 'none';
                    index++;
                    if (index < this.sequenceData.sequence.length) {
                        setTimeout(playNext, 600);
                    } else {
                        this.sequenceData.isPlayerTurn = true;
                        document.getElementById('sequence-display').textContent = 'À votre tour ! Cliquez sur les couleurs dans l\'ordre.';
                    }
                }, 400);
            }
        };
        
        setTimeout(playNext, 500);
    }

    handleColorClick(colorIndex) {
        const button = document.querySelector(`[data-color="${colorIndex}"]`);
        button.style.transform = 'scale(1.2)';
        setTimeout(() => button.style.transform = 'scale(1)', 200);
        
        this.sequenceData.playerSequence.push(colorIndex);
        const currentIndex = this.sequenceData.playerSequence.length - 1;
        
        if (this.sequenceData.sequence[currentIndex] === colorIndex) {
            this.playSound('success');
            
            if (this.sequenceData.playerSequence.length === this.sequenceData.sequence.length) {
                // Séquence réussie
                this.sequenceData.level++;
                this.sequenceData.score += this.sequenceData.level * 10;
                document.getElementById('sequence-level').textContent = this.sequenceData.level;
                document.getElementById('sequence-score').textContent = this.sequenceData.score;
                
                document.getElementById('sequence-display').textContent = `Excellent ! Niveau ${this.sequenceData.level}`;
                
                setTimeout(() => {
                    this.sequenceData.isPlayerTurn = false;
                    this.sequenceData.playerSequence = [];
                    this.startSequenceDemo();
                }, 1500);
            }
        } else {
            // Erreur
            this.playSound('error');
            document.getElementById('sequence-display').textContent = 'Oops ! Recommençons...';
            this.sequenceData.sequence = [];
            this.sequenceData.playerSequence = [];
            this.sequenceData.level = Math.max(1, this.sequenceData.level - 1);
            document.getElementById('sequence-level').textContent = this.sequenceData.level;
            
            setTimeout(() => {
                this.sequenceData.isPlayerTurn = false;
                this.startSequenceDemo();
            }, 2000);
        }
    }

    // Jeu 3: Jardin Virtuel
    loadGardenGame() {
        const gameHTML = `
            <div class="garden-game">
                <div class="garden-info" style="text-align: center; margin-bottom: 20px;">
                    <h4 style="color: #1f2937; margin-bottom: 15px;">Plantez et arrosez votre jardin 🌱</h4>
                    <div class="garden-tools" style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                        <button class="tool-btn active" data-tool="plant" style="background: #10b981; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            🌱 Planter
                        </button>
                        <button class="tool-btn" data-tool="water" style="background: white; color: #1f2937; border: 2px solid #e5e7eb; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            💧 Arroser
                        </button>
                        <button class="tool-btn" data-tool="sun" style="background: white; color: #1f2937; border: 2px solid #e5e7eb; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            ☀️ Soleil
                        </button>
                    </div>
                </div>
                <div class="garden-grid" id="garden-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 20px auto; max-width: 320px;">
                    ${Array(16).fill(0).map((_, i) => 
                        `<div class="garden-cell" data-cell="${i}" style="width: 70px; height: 70px; background: #8b4513; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; position: relative; box-shadow: inset 0 2px 8px rgba(0,0,0,0.2);" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        </div>`
                    ).join('')}
                </div>
                <div class="garden-stats" style="display: flex; justify-content: center; gap: 30px; margin-top: 20px; color: #1f2937; font-weight: 600;">
                    <div>🌱 <span id="plants-count">0</span> plantes</div>
                    <div>🌸 <span id="flowers-count">0</span> fleurs</div>
                </div>
            </div>
        `;
        
        this.gameContent.innerHTML = gameHTML;
        this.initGardenGame();
    }

    initGardenGame() {
        this.gardenData = {
            currentTool: 'plant',
            plants: {},
            plantsCount: 0,
            flowersCount: 0
        };
        
        const toolButtons = document.querySelectorAll('.tool-btn');
        const gardenCells = document.querySelectorAll('.garden-cell');
        
        toolButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toolButtons.forEach(b => {
                    b.classList.remove('active');
                    b.style.background = 'white';
                    b.style.color = '#1f2937';
                    b.style.border = '2px solid #e5e7eb';
                });
                btn.classList.add('active');
                btn.style.background = '#10b981';
                btn.style.color = 'white';
                btn.style.border = '2px solid #10b981';
                this.gardenData.currentTool = btn.dataset.tool;
                this.playSound('click');
            });
        });
        
        gardenCells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                this.handleGardenClick(index);
            });
        });
    }

    handleGardenClick(cellIndex) {
        const cell = document.querySelector(`[data-cell="${cellIndex}"]`);
        const tool = this.gardenData.currentTool;
        
        if (tool === 'plant' && !this.gardenData.plants[cellIndex]) {
            // Planter une graine
            const seed = document.createElement('div');
            seed.innerHTML = '🌰';
            seed.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem;';
            cell.appendChild(seed);
            
            this.gardenData.plants[cellIndex] = {
                stage: 'seed',
                water: 0,
                sun: 0,
                growth: 0,
                element: seed
            };
            
            this.gardenData.plantsCount++;
            document.getElementById('plants-count').textContent = this.gardenData.plantsCount;
            this.playSound('success');
            
        } else if ((tool === 'water' || tool === 'sun') && this.gardenData.plants[cellIndex]) {
            // Arroser ou donner du soleil
            const plant = this.gardenData.plants[cellIndex];
            
            if (tool === 'water') {
                plant.water++;
                this.createEffect(cell, '💧');
            } else {
                plant.sun++;
                this.createEffect(cell, '☀️');
            }
            
            this.checkPlantGrowth(cellIndex);
            this.playSound('click');
        }
    }

    createEffect(cell, emoji) {
        const effect = document.createElement('div');
        effect.innerHTML = emoji;
        effect.style.cssText = 'position: absolute; top: 10px; right: 10px; font-size: 1rem; animation: effectFade 1s ease forwards; pointer-events: none;';
        cell.appendChild(effect);
        
        setTimeout(() => effect.remove(), 1000);
    }

    checkPlantGrowth(cellIndex) {
        const plant = this.gardenData.plants[cellIndex];
        const cell = document.querySelector(`[data-cell="${cellIndex}"]`);
        
        plant.growth = plant.water + plant.sun;
        
        if (plant.growth >= 3 && plant.stage === 'seed') {
            // Évolution vers pousse
            plant.element.remove();
            const sprout = document.createElement('div');
            sprout.innerHTML = '🌱';
            sprout.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2rem; animation: sproutGrow 0.5s ease;';
            cell.appendChild(sprout);
            plant.stage = 'sprout';
            plant.element = sprout;
            this.playSound('success');
            
        } else if (plant.growth >= 6 && plant.stage === 'sprout') {
            // Évolution vers fleur
            plant.element.remove();
            const flower = document.createElement('div');
            const flowers = ['🌸', '🌼', '🌺', '🌻', '🌷', '🌹'];
            flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2.5rem; animation: flowerBloom 0.8s ease;';
            cell.appendChild(flower);
            plant.stage = 'flower';
            plant.element = flower;
            
            this.gardenData.flowersCount++;
            document.getElementById('flowers-count').textContent = this.gardenData.flowersCount;
            this.playSound('complete');
            
            if (this.gardenData.flowersCount === 5) {
                setTimeout(() => {
                    this.showGameSuccess('Jardin fleuri !', 'Vous avez fait pousser 5 magnifiques fleurs ! 🌸');
                }, 500);
            }
        }
    }

    restartGame() {
        if (this.currentGame) {
            this.loadGame(this.currentGame);
            this.playSound('click');
        }
    }

    pauseGame() {
        this.playSound('click');
        alert('Jeu mis en pause. Cliquez sur OK pour continuer.');
    }

    getHelp() {
        const helpTexts = {
            'puzzle-sensoriel': 'Cliquez sur une pièce pour la sélectionner, puis cliquez sur la case correspondante. Les couleurs vous aident à trouver la bonne place !',
            'sequences-couleurs': 'Regardez bien la séquence de couleurs, puis répétez-la en cliquant sur les boutons dans le bon ordre.',
            'jardin-virtuel': 'Plantez des graines, puis arrosez-les et donnez-leur du soleil pour les voir grandir en belles fleurs !',
            'tri-formes': 'Faites glisser chaque forme dans la bonne catégorie selon sa forme, couleur ou taille.',
            'piano-emotions': 'Cliquez sur les touches pour créer de la musique et explorer différentes émotions.',
            'routine-quotidienne': 'Organisez les activités dans l\'ordre logique de votre journée, du matin au soir.',
            'bulles-sensorielles': 'Cliquez sur les bulles colorées pour les faire éclater et créer de beaux effets apaisants.',
            'animaux-sons': 'Cliquez sur les animaux pour entendre leurs cris et apprendre leurs noms.',
            'dessin-libre': 'Utilisez votre doigt ou la souris pour dessiner librement avec des couleurs magiques.',
            'correspondance-visuelle': 'Trouvez les deux images identiques en cliquant dessus. Mémorisez bien leur position !'
        };
        
        const helpText = helpTexts[this.currentGame] || 'Amusez-vous bien avec ce jeu !';
        this.playSound('click');
        alert('Aide du jeu :\n\n' + helpText);
    }

    // Jeu 4: Tri des Formes (placeholder)
    loadSortingGame() {
        const shapes = ['🔴', '🟦', '🟢', '🟡', '🟣', '🟠'];
        const gameHTML = `
            <div class="sorting-game">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h4 style="color: #1f2937;">Triez les formes par couleur</h4>
                    <p style="color: #6b7280;">Glissez chaque forme dans la bonne boîte de couleur</p>
                </div>
                <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 20px 0;">
                    ${shapes.map(shape => `<div style="font-size: 3rem; cursor: grab; user-select: none;">${shape}</div>`).join('')}
                </div>
                <div style="text-align: center; color: #10b981; font-weight: 600; margin-top: 20px;">
                    Cliquez sur les formes pour les faire bouger ! ✨
                </div>
            </div>
        `;
        this.gameContent.innerHTML = gameHTML;
    }

    // Jeu 5: Piano des Émotions
    loadPianoGame() {
        const emotions = [
            {color: '#ff6b6b', emotion: 'Joie', sound: '🎵'},
            {color: '#4ecdc4', emotion: 'Calme', sound: '🎶'},
            {color: '#45b7d1', emotion: 'Sérénité', sound: '🎼'},
            {color: '#f9ca24', emotion: 'Énergie', sound: '🎹'},
            {color: '#6c5ce7', emotion: 'Mystère', sound: '🎺'},
            {color: '#fd79a8', emotion: 'Tendresse', sound: '🎻'}
        ];
        
        const gameHTML = `
            <div class="piano-game">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h4 style="color: #1f2937;">Piano des Émotions</h4>
                    <p style="color: #6b7280;">Cliquez sur les touches pour créer votre mélodie</p>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 300px; margin: 0 auto;">
                    ${emotions.map((item, i) => `
                        <button onclick="gamesManager.playPianoNote('${item.emotion}', ${i})" 
                                style="background: ${item.color}; color: white; border: none; padding: 20px; border-radius: 15px; cursor: pointer; font-weight: 600; transition: all 0.2s ease; font-size: 1rem;"
                                onmouseover="this.style.transform='scale(1.05)'"
                                onmouseout="this.style.transform='scale(1)'">
                            ${item.sound}<br>${item.emotion}
                        </button>
                    `).join('')}
                </div>
                <div id="melody-display" style="text-align: center; margin-top: 20px; font-size: 2rem; min-height: 60px; display: flex; align-items: center; justify-content: center;">
                    🎵 Créez votre mélodie ! 🎵
                </div>
            </div>
        `;
        this.gameContent.innerHTML = gameHTML;
    }

    playPianoNote(emotion, index) {
        this.playSound('click');
        const melodyDisplay = document.getElementById('melody-display');
        const notes = ['🎵', '🎶', '🎼', '🎹', '🎺', '🎻'];
        melodyDisplay.innerHTML = `${notes[index]} ${emotion} ${notes[index]}`;
        
        setTimeout(() => {
            melodyDisplay.innerHTML = '🎵 Magnifique mélodie ! 🎵';
        }, 1500);
    }

   

    // Jeu 6: Routine Quotidienne
    loadRoutineGame() {
        const activities = [
            {id: 1, name: 'Se lever', emoji: '🛏️', time: 'Matin'},
            {id: 2, name: 'Se laver', emoji: '🚿', time: 'Matin'},
            {id: 3, name: 'Petit-déjeuner', emoji: '🥐', time: 'Matin'},
            {id: 4, name: 'Aller à l\'école', emoji: '🎒', time: 'Matin'},
            {id: 5, name: 'Déjeuner', emoji: '🍽️', time: 'Midi'},
            {id: 6, name: 'Rentrer à la maison', emoji: '🏠', time: 'Soir'},
            {id: 7, name: 'Dîner', emoji: '🍲', time: 'Soir'},
            {id: 8, name: 'Se coucher', emoji: '🌙', time: 'Nuit'}
        ];
        
        const shuffled = [...activities].sort(() => Math.random() - 0.5);
        
        const gameHTML = `
            <div class="routine-game">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h4 style="color: #1f2937;">Organisez votre journée</h4>
                                       <p style="color: #6b7280;">Remettez les activités dans l'ordre chronologique</p>
                </div>
                <div id="routine-activities" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; max-width: 400px; margin: 0 auto;">
                    ${shuffled.map(activity => `
                        <div class="routine-activity" data-id="${activity.id}" onclick="gamesManager.selectRoutineActivity(${activity.id})"
                             style="background: white; border: 2px solid #e5e7eb; padding: 15px; border-radius: 10px; cursor: pointer; text-align: center; transition: all 0.3s ease;"
                             onmouseover="this.style.borderColor='#3b82f6'"
                             onmouseout="this.style.borderColor='#e5e7eb'">
                            <div style="font-size: 2rem; margin-bottom: 5px;">${activity.emoji}</div>
                            <div style="font-weight: 600; color: #1f2937;">${activity.name}</div>
                            <div style="color: #6b7280; font-size: 0.9rem;">${activity.time}</div>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 20px; color: #3b82f6; font-weight: 600;">
                    Cliquez sur les activités dans l'ordre de votre journée !
                </div>
            </div>
        `;
        this.gameContent.innerHTML = gameHTML;
        this.routineData = { selectedOrder: [], correctOrder: [1,2,3,4,5,6,7,8] };
    }

    selectRoutineActivity(activityId) {
        const activity = document.querySelector(`[data-id="${activityId}"]`);
        if (activity.style.opacity === '0.5') return; // Déjà sélectionné
        
        activity.style.opacity = '0.5';
        activity.style.background = '#dbeafe';
        activity.style.borderColor = '#3b82f6';
        
        this.routineData.selectedOrder.push(activityId);
        this.playSound('click');
        
        if (this.routineData.selectedOrder.length === 8) {
            setTimeout(() => this.checkRoutineOrder(), 500);
        }
    }

    checkRoutineOrder() {
        const isCorrect = JSON.stringify(this.routineData.selectedOrder) === JSON.stringify(this.routineData.correctOrder);
        
        if (isCorrect) {
            this.showGameSuccess('Excellente routine !', 'Vous avez organisé votre journée parfaitement ! 🌟');
            this.playSound('complete');
        } else {
            alert('Presque ! Essayez de réorganiser selon l\'heure de la journée. 🕐');
            this.restartGame();
        }
    }

    // Jeu 7: Bulles Sensorielles
    loadBubblesGame() {
        const gameHTML = `
            <div class="bubbles-game">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h4 style="color: #1f2937;">Bulles Sensorielles</h4>
                    <p style="color: #6b7280;">Cliquez sur les bulles pour les faire éclater</p>
                </div>
                <div id="bubbles-container" style="position: relative; height: 300px; background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%); border-radius: 20px; overflow: hidden; cursor: crosshair;">
                    <!-- Les bulles seront générées dynamiquement -->
                </div>
                <div style="text-align: center; margin-top: 15px;">
                    <span style="color: #3b82f6; font-weight: 600;">Bulles éclatées: <span id="bubbles-popped">0</span></span>
                </div>
            </div>
        `;
        this.gameContent.innerHTML = gameHTML;
        this.startBubblesGame();
    }

    startBubblesGame() {
        this.bubblesData = { popped: 0 };
        this.createBubbles();
        
        // Créer de nouvelles bulles toutes les 2 secondes
        this.bubblesInterval = setInterval(() => {
            this.createBubbles();
        }, 2000);
    }

    createBubbles() {
        const container = document.getElementById('bubbles-container');
        if (!container) return;
        
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'];
        
        for (let i = 0; i < 3; i++) {
            const bubble = document.createElement('div');
            const size = Math.random() * 40 + 20;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            bubble.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${Math.random() * (container.offsetWidth - size)}px;
                top: ${container.offsetHeight}px;
                cursor: pointer;
                animation: floatUp ${3 + Math.random() * 3}s linear forwards;
                opacity: 0.8;
                box-shadow: inset -5px -5px 10px rgba(0,0,0,0.1);
            `;
            
            bubble.addEventListener('click', () => this.popBubble(bubble));
            container.appendChild(bubble);
            
            // Supprimer la bulle après l'animation si elle n'a pas été cliquée
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.remove();
                }
            }, 6000);
        }
    }

    popBubble(bubble) {
        this.bubblesData.popped++;
        document.getElementById('bubbles-popped').textContent = this.bubblesData.popped;
        
        // Effet d'explosion
        bubble.style.animation = 'none';
        bubble.style.transform = 'scale(0)';
        bubble.style.transition = 'transform 0.2s ease';
        
        this.playSound('success');
        
        setTimeout(() => bubble.remove(), 200);
        
        if (this.bubblesData.popped === 20) {
            clearInterval(this.bubblesInterval);
            setTimeout(() => {
                this.showGameSuccess('Maître des bulles !', 'Vous avez éclaté 20 bulles ! 🫧');
            }, 500);
        }
    }

    // Jeux restants (placeholders)
    loadAnimalsGame() {
        const animals = [
            {name: 'Chat', emoji: '🐱', sound: 'Miaou'},
            {name: 'Chien', emoji: '🐶', sound: 'Wouaf'},
            {name: 'Vache', emoji: '🐮', sound: 'Meuh'},
            {name: 'Coq', emoji: '🐓', sound: 'Cocorico'},
            {name: 'Mouton', emoji: '🐑', sound: 'Bêê'},
            {name: 'Cochon', emoji: '🐷', sound: 'Groin'}
        ];
        
        const gameHTML = `
            <div class="animals-game">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h4 style="color: #1f2937;">Animaux et leurs Sons</h4>
                    <p style="color: #6b7280;">Cliquez sur un animal pour entendre son cri</p>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; max-width: 400px; margin: 0 auto;">
                    ${animals.map(animal => `
                        <button onclick="gamesManager.playAnimalSound('${animal.sound}')"
                                style="background: white; border: 2px solid #e5e7eb; padding: 20px; border-radius: 15px; cursor: pointer; transition: all 0.3s ease;"
                                onmouseover="this.style.borderColor='#10b981'; this.style.transform='scale(1.05)'"
                                onmouseout="this.style.borderColor='#e5e7eb'; this.style.transform='scale(1)'">
                            <div style="font-size: 3rem; margin-bottom: 10px;">${animal.emoji}</div>
                            <div style="font-weight: 600; color: #1f2937;">${animal.name}</div>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        this.gameContent.innerHTML = gameHTML;
    }

    playAnimalSound(sound) {
        alert(`${sound} ! 🔊`);
        this.playSound('click');
    }

    loadDrawingGame() {
        const gameHTML = `
            <div class="drawing-game">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h4 style="color: #1f2937;">Atelier Dessin Libre</h4>
                    <p style="color: #6b7280;">Utilisez votre imagination pour créer !</p>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 6rem; color: #3b82f6; margin: 20px 0;">🎨</div>
                    <p style="color: #6b7280; font-size: 1.1rem;">Fonctionnalité de dessin en développement...</p>
                    <p style="color: #10b981;">Bientôt disponible ! ✨</p>
                </div>
            </div>
        `;
        this.gameContent.innerHTML = gameHTML;
    }

    loadMatchingGame() {
        const pairs = ['🐶', '🐱', '🐰', '🐸', '🦋', '🐝'];
        const cards = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
        
        const gameHTML = `
            <div class="matching-game">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h4 style="color: #1f2937;">Trouve les Paires</h4>
                    <p style="color: #6b7280;">Retrouvez les paires d'animaux identiques</p>
                </div>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 320px; margin: 0 auto;">
                    ${cards.map((card, i) => `
                        <button class="memory-card" data-card="${card}" data-index="${i}" onclick="gamesManager.flipCard(${i})"
                                style="width: 70px; height: 70px; background: #3b82f6; border: none; border-radius: 10px; cursor: pointer; font-size: 2rem; color: transparent; transition: all 0.3s ease;">
                            ${card}
                        </button>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 20px; color: #10b981; font-weight: 600;">
                    Paires trouvées: <span id="pairs-found">0</span> / 6
                </div>
            </div>
        `;
        this.gameContent.innerHTML = gameHTML;
        this.matchingData = { flipped: [], matched: [], pairsFound: 0 };
    }

    flipCard(index) {
        if (this.matchingData.flipped.length >= 2) return;
        
        const card = document.querySelector(`[data-index="${index}"]`);
        if (this.matchingData.matched.includes(index) || this.matchingData.flipped.includes(index)) return;
        
        card.style.background = 'white';
        card.style.color = 'black';
        card.style.transform = 'scale(1.1)';
        this.matchingData.flipped.push(index);
        this.playSound('click');
        
        if (this.matchingData.flipped.length === 2) {
            setTimeout(() => this.checkMatch(), 1000);
        }
    }

    checkMatch() {
        const [first, second] = this.matchingData.flipped;
        const cards = document.querySelectorAll('.memory-card');
        const firstCard = cards[first];
        const secondCard = cards[second];
        
        if (firstCard.dataset.card === secondCard.dataset.card) {
            // Match trouvé
            this.matchingData.matched.push(first, second);
            this.matchingData.pairsFound++;
            document.getElementById('pairs-found').textContent = this.matchingData.pairsFound;
            firstCard.style.background = '#10b981';
            secondCard.style.background = '#10b981';
            this.playSound('success');
            
            if (this.matchingData.pairsFound === 6) {
                setTimeout(() => {
                    this.showGameSuccess('Mémoire parfaite !', 'Vous avez trouvé toutes les paires ! 🧠');
                }, 500);
            }
        } else {
            // Pas de match
            firstCard.style.background = '#3b82f6';
            secondCard.style.background = '#3b82f6';
            firstCard.style.color = 'transparent';
            secondCard.style.color = 'transparent';
            firstCard.style.transform = 'scale(1)';
            secondCard.style.transform = 'scale(1)';
            this.playSound('error');
        }
        
        this.matchingData.flipped = [];
    }

    // Initialize games manager
    let gamesManager;

    // Global functions for game controls
    function openGame(gameType) {
        if (gamesManager) {
            gamesManager.openGame(gameType);
        }
    }

    function closeGame() {
        if (gamesManager) {
            gamesManager.closeGame();
        }
    }

    function restartGame() {
        if (gamesManager) {
            gamesManager.restartGame();
        }
    }

    function pauseGame() {
        if (gamesManager) {
            gamesManager.pauseGame();
        }
    }

    function getHelp() {
        if (gamesManager) {
            gamesManager.getHelp();
        }
    }

    // Event Listeners
    document.addEventListener('DOMContentLoaded', () => {
        // Mobile navigation
        hamburger?.addEventListener('click', toggleMobileNav);
        
        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });
        
        // Form submission
        contactForm?.addEventListener('submit', handleFormSubmit);
        
        // Scroll events
        window.addEventListener('scroll', () => {
            handleNavbarScroll();
            updateActiveNavLink();
        });
        
        // Initialize features
        setupScrollAnimations();
        animateCounters();
        addActiveNavStyles();
        initParallax();
        initKeyboardNavigation();
        initCTAButtons();
        initWeb3ImageEffects();
        addWeb3Animations();
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileNav();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileNav();
            }
        });
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            // Re-animate progress bars when page becomes visible
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                bar.style.animation = 'none';
                setTimeout(() => {
                    bar.style.animation = 'fillProgress 2s ease-out forwards';
                }, 100);
            });
        }
    });

    // Utility functions
    const utils = {
        // Debounce function for scroll events
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Check if element is in viewport
        isInViewport: (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },
        
        // Smooth scroll to element
        scrollToElement: (element, offset = 70) => {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    // Export utils for potential use in other scripts
    window.AutismePlatformUtils = utils;

    // Reveal on Scroll Animation for Web 3.0 components
    function initRevealOnScroll() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        // Vérifier si l'élément est déjà visible au chargement
        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    entry.target.classList.remove('to-reveal');
                    // Ne plus observer après révélation pour optimiser
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // L'élément est visible à 10%
            rootMargin: '0px 0px -100px 0px' // Déclencher avant que l'élément soit visible
        });
        
        revealElements.forEach(element => {
            // Si l'élément n'est pas visible au chargement, ajouter la classe to-reveal
            if (!isElementInViewport(element)) {
                element.classList.add('to-reveal');
            } else {
                // Si déjà visible, marquer comme révélé immédiatement
                element.classList.add('revealed');
            }
            revealObserver.observe(element);
        });
    }

    // Initialize Web 3.0 effects
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize games system
        gamesManager = new GamesManager();
        
        // Add Web 3.0 CSS animations
        addWeb3Animations();
        
        // Initialize reveal on scroll
        initRevealOnScroll();
        
        // Initialize animated background
        const animatedBg = new AnimatedBackground();
        
        // Initialize donation system
        const donationSystem = new DonationSystem();
        
        // Initialize image effects after a short delay to ensure images are loaded
        setTimeout(() => {
            initWeb3ImageEffects();
        }, 500);
        
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target === document.getElementById('gameModal')) {
                closeGame();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && gamesManager && gamesManager.gameModal.classList.contains('active')) {
                closeGame();
            }
        });
    });

    // Add some console information for developers
    console.log('%c🧩 Plateforme Autisme Sénégal', 'color: #2563eb; font-size: 24px; font-weight: bold;');
    console.log('%cSite web développé pour améliorer la prise en charge des enfants vivant avec les TSA', 'color: #6b7280; font-size: 14px;');
    console.log('%cPour plus d\'informations: https://github.com/votre-repo', 'color: #10b981; font-size: 12px;');
    console.log('%c✨ Animations Web 3.0 activées !', 'color: #f59e0b; font-size: 16px; font-weight: bold;');
