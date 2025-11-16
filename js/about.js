/* ===================================
   about.js - About Page JavaScript
   Timeline animations, photo interactions
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // === Timeline Scroll Animation ===
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 100);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // === Activity Cards Hover Effect ===
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.activity-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.activity-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // === Region Cards Animation ===
    const regionCards = document.querySelectorAll('.region-card');
    
    const regionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 200);
                
                regionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    regionCards.forEach(card => {
        regionObserver.observe(card);
    });
    
    // === Team Photos Lightbox (Simple) ===
    const teamPhotos = document.querySelectorAll('.team-photo');
    
    teamPhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.photo-overlay p')?.textContent || '';
            
            // Create simple modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            `;
            
            const modalCaption = document.createElement('div');
            modalCaption.textContent = caption;
            modalCaption.style.cssText = `
                position: absolute;
                bottom: 40px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 255, 255, 0.95);
                color: var(--secondary-color);
                padding: 16px 32px;
                border-radius: 8px;
                font-weight: 600;
            `;
            
            modal.appendChild(modalImg);
            modal.appendChild(modalCaption);
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Close on click
            modal.addEventListener('click', function() {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = '';
                }, 300);
            });
        });
    });
    
    // === Parallax Effect on Images ===
    const images = document.querySelectorAll('.story-image img, .why-image img');
    
    window.addEventListener('scroll', function() {
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top - window.innerHeight / 2) * 0.1;
                img.style.transform = `translateY(${offset}px)`;
            }
        });
    });
    
    // === Mission Cards Stagger Animation ===
    const missionCards = document.querySelectorAll('.mission-card');
    
    const missionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.9)';
                    entry.target.style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 50);
                }, index * 150);
                
                missionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    missionCards.forEach(card => {
        missionObserver.observe(card);
    });
    
    // === Fact Items Slide In ===
    const factItems = document.querySelectorAll('.fact-item');
    
    const factObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    entry.target.style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 150);
                
                factObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    factItems.forEach(item => {
        factObserver.observe(item);
    });
    
    // === CTA Box Entrance Animation ===
    const ctaBox = document.querySelector('.cta-box');
    
    if (ctaBox) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 100);
                    
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        ctaObserver.observe(ctaBox);
    }
    
    // === Activity Tags Hover ===
    const activityTags = document.querySelectorAll('.activity-tag');
    
    activityTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // === Smooth Scroll Enhancement ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // === Track CTA Clicks (Analytics Ready) ===
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn, .join-us-cta .btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.className || 'unknown';
            
            console.log(`CTA clicked: ${buttonText} from ${section}`);
            
            // Example Google Analytics event
            // gtag('event', 'about_cta_click', {
            //     'button_text': buttonText,
            //     'section': section
            // });
        });
    });
    
    // === Add Fade In animation styles if not present ===
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // === Console Welcome ===
    console.log('%c📖 About Us Page Loaded', 'color: #FF6B6B; font-size: 16px; font-weight: bold;');
    console.log('%cThank you for learning about our mission!', 'color: #2C3E50; font-size: 12px;');
});