/* ===================================
   get-involved.js - Get Involved Page JavaScript
   Tab switching, donation calculator, form handling
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // === Tab Navigation ===
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Scroll to tabs section
            document.querySelector('.involvement-tabs').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Check URL hash for direct tab access
    const hash = window.location.hash.replace('#', '');
    if (hash && ['donate', 'volunteer', 'corporate'].includes(hash)) {
        const targetButton = document.querySelector(`[data-tab="${hash}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
    
    // === Donation Amount Selection ===
    const amountButtons = document.querySelectorAll('.amount-btn');
    const impactText = document.querySelector('.impact-text');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked button
            this.classList.add('active');
            
            // Get amount
            const amount = parseInt(this.getAttribute('data-amount'));
            
            // Handle custom amount
            if (this.classList.contains('custom')) {
                const customAmount = prompt('Enter your donation amount (€):');
                if (customAmount && !isNaN(customAmount)) {
                    updateImpact(parseInt(customAmount));
                }
            } else {
                updateImpact(amount);
            }
        });
    });
    
    function updateImpact(amount) {
        const childrenHelped = Math.floor(amount / 25);
        if (childrenHelped > 0) {
            impactText.innerHTML = `Your €${amount} will bring joy to <strong>${childrenHelped} ${childrenHelped === 1 ? 'child' : 'children'}</strong> 🎄`;
        } else {
            impactText.innerHTML = `Your €${amount} contributes to helping children in Moldova ❤️`;
        }
    }
    
    // === Payment Method Selection ===
    const paymentButtons = document.querySelectorAll('.payment-btn');
    const paymentDetails = document.querySelectorAll('.payment-details');
    
    paymentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            
            // Remove active from all buttons
            paymentButtons.forEach(btn => btn.classList.remove('active'));
            
            // Hide all payment details
            paymentDetails.forEach(detail => detail.style.display = 'none');
            
            // Activate clicked button
            this.classList.add('active');
            
            // Show corresponding payment details
            const targetDetail = document.getElementById(`${method}Payment`);
            if (targetDetail) {
                targetDetail.style.display = 'block';
            }
        });
    });
    
    // === Copy to Clipboard ===
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            // Create temporary textarea
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            
            // Select and copy
            textarea.select();
            document.execCommand('copy');
            
            // Remove textarea
            document.body.removeChild(textarea);
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = '✓ Copied!';
            this.style.background = 'var(--success-green)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
            
            // Show message
            window.showMessage('Copied to clipboard!', 'success');
        });
    });
    
    // === Counter Animation for Stats ===
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
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
    const statNumbers = document.querySelectorAll('.stat-box .stat-number');
    let countersAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                statNumbers.forEach(numberElement => {
                    const spans = numberElement.querySelectorAll('[data-target]');
                    if (spans.length > 0) {
                        spans.forEach(span => {
                            const target = parseInt(span.getAttribute('data-target'));
                            animateCounter(span, target);
                        });
                    } else {
                        const target = parseInt(numberElement.getAttribute('data-target'));
                        if (!isNaN(target)) {
                            animateCounter(numberElement, target);
                        }
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (statNumbers.length > 0) {
        counterObserver.observe(document.querySelector('.quick-stats'));
    }
    
    // === Quick Contact Form ===
    const contactForm = document.getElementById('quickContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate
            if (!name || !email || !subject || !message) {
                window.showMessage('Please fill in all required fields', 'error');
                return;
            }
            
            if (!window.validateEmail(email)) {
                window.showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading
            const submitButton = this.querySelector('button[type="submit"]');
            const hideLoading = window.showLoading(submitButton);
            
            // Simulate sending (replace with actual API call)
            setTimeout(() => {
                hideLoading();
                window.showMessage('Thank you! We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                
                // In production, send to backend:
                /*
                fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                })
                .then(response => response.json())
                .then(data => {
                    hideLoading();
                    if (data.success) {
                        window.showMessage('Thank you! We\'ll get back to you within 24 hours.', 'success');
                        contactForm.reset();
                    } else {
                        window.showMessage('Something went wrong. Please try emailing us directly.', 'error');
                    }
                })
                .catch(error => {
                    hideLoading();
                    window.showMessage('Network error. Please try emailing us directly.', 'error');
                });
                */
            }, 1500);
        });
    }
    
    // === Smooth Scroll for Anchor Links ===
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
    
    // === Track Donation Button Clicks (Analytics) ===
    const donateButtons = document.querySelectorAll('a[href*="payment"], a[href*="donate"]');
    
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const amount = document.querySelector('.amount-btn.active')?.getAttribute('data-amount') || 'unknown';
            
            console.log(`Donation initiated: ${buttonText} - Amount: €${amount}`);
            
            // Example Google Analytics event
            // gtag('event', 'donation_click', {
            //     'amount': amount,
            //     'button': buttonText
            // });
        });
    });
    
    // === Track Volunteer Button Clicks ===
    const volunteerButtons = document.querySelectorAll('a[href*="volunteer"]');
    
    volunteerButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Volunteer application clicked');
            
            // Example Google Analytics event
            // gtag('event', 'volunteer_interest', {
            //     'button': this.textContent.trim()
            // });
        });
    });
    
    // === Track Corporate Partnership Interest ===
    const corporateButtons = document.querySelectorAll('a[href*="corporate"], a[href*="partnership"]');
    
    corporateButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Corporate partnership interest');
            
            // Example Google Analytics event
            // gtag('event', 'corporate_interest', {
            //     'button': this.textContent.trim()
            // });
        });
    });
    
    // === Add animations to cards ===
    const cards = document.querySelectorAll('.donation-card, .opportunity-card, .tier-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
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
                }, index * 100);
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => cardObserver.observe(card));
    
    // === Urgency Banner Animation ===
    const urgencyBanner = document.querySelector('.urgency-banner');
    if (urgencyBanner) {
        setInterval(() => {
            urgencyBanner.style.transform = 'scale(1.02)';
            setTimeout(() => {
                urgencyBanner.style.transform = 'scale(1)';
            }, 200);
        }, 5000);
    }
    
    // === Console Welcome ===
    console.log('%c💝 Get Involved Page Loaded', 'color: #FF6B6B; font-size: 16px; font-weight: bold;');
    console.log('%cThank you for considering supporting ForaChild!', 'color: #2C3E50; font-size: 12px;');
});