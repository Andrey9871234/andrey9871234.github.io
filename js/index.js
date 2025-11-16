/* ===================================
   index.js - Homepage Specific JavaScript
   Counter animations, newsletter form, etc.
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // === Animated Counter for Impact Numbers ===
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Trigger counters when they come into view
    const impactNumbers = document.querySelectorAll('.impact-number');
    let countersAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                impactNumbers.forEach(numberElement => {
                    const target = parseInt(numberElement.getAttribute('data-target'));
                    animateCounter(numberElement, target);
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (impactNumbers.length > 0) {
        counterObserver.observe(impactNumbers[0].parentElement.parentElement);
    }
    
    // === Newsletter Form Submission ===
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            // Validate email
            if (!window.validateEmail(email)) {
                window.showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const hideLoading = window.showLoading(submitButton);
            
            // Simulate API call (replace with actual newsletter API)
            setTimeout(() => {
                hideLoading();
                
                // Success
                window.showMessage('Thank you for subscribing!', 'success');
                emailInput.value = '';
                
                // In production, you would send this to your newsletter service:
                /*
                fetch('/api/newsletter/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email })
                })
                .then(response => response.json())
                .then(data => {
                    hideLoading();
                    if (data.success) {
                        window.showMessage('Thank you for subscribing!', 'success');
                        emailInput.value = '';
                    } else {
                        window.showMessage('Something went wrong. Please try again.', 'error');
                    }
                })
                .catch(error => {
                    hideLoading();
                    window.showMessage('Network error. Please try again later.', 'error');
                });
                */
            }, 1000);
        });
    }
    
    // === Hero Background Carousel (Optional) ===
    // Uncomment to enable background image rotation
    /*
    const heroBackground = document.querySelector('.hero-background');
    const heroImages = [
        'images/hero/hero-bg-1.jpg',
        'images/hero/hero-bg-2.jpg',
        'images/hero/hero-bg-3.jpg'
    ];
    let currentImageIndex = 0;
    
    function changeHeroBackground() {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroBackground.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
    }
    
    // Change background every 5 seconds
    if (heroBackground && heroImages.length > 1) {
        setInterval(changeHeroBackground, 5000);
    }
    */
    
    // === Gallery Item Click Handler ===
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the image source
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.gallery-overlay span')?.textContent || '';
            
            // Open lightbox or redirect to gallery page
            // For now, let's redirect to gallery page
            window.location.href = 'gallery.html';
            
            // Alternatively, you could create a lightbox here:
            // createLightbox(imgSrc, caption);
        });
    });
    
    // === Parallax Effect on Hero (Optional) ===
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            // Only apply parallax while hero is visible
            if (scrolled < heroHeight) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    // === Add scroll reveal class to sections ===
    // ✅ FIX: Don't add scroll-reveal to sections - it causes them to be invisible
    // Remove this automatic scroll-reveal assignment
    // const sections = document.querySelectorAll('section:not(.hero)');
    // sections.forEach(section => {
    //     section.classList.add('scroll-reveal');
    // });
    
    // === Intersection Observer for Project Cards ===
    const projectCard = document.querySelector('.project-content');
    
    if (projectCard) {
        // ✅ FIX: Ensure cards are visible by default, then animate
        projectCard.style.opacity = '1'; // Start visible
        projectCard.style.transform = 'translateY(0)'; // Start in position
        
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Simple fade effect without making it invisible first
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        projectObserver.observe(projectCard);
    }
    
    // === Stagger Animation for Step Cards ===
    const stepCards = document.querySelectorAll('.step-card');
    
    if (stepCards.length > 0) {
        // ✅ FIX: Ensure step cards are visible by default
        stepCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Simple fade with stagger, but don't hide first
                    entry.target.style.transition = 'all 0.6s ease';
                }
            });
        }, { threshold: 0.2 });
        
        stepCards.forEach(card => {
            stepObserver.observe(card);
        });
    }
    
    // === Console Welcome Message ===
    console.log('%c🎁 ForaChild - Homepage loaded', 'color: #FF6B6B; font-size: 16px; font-weight: bold;');
    console.log('%cThank you for visiting! Together we can make a difference.', 'color: #2C3E50; font-size: 12px;');
});