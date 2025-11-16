/* ===================================
   gallery.js - Photo Gallery JavaScript
   Filtering, lightbox, view toggle
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // === Gallery Elements ===
    const galleryGrid = document.getElementById('galleryGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxTag = document.getElementById('lightboxTag');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    let currentFilter = 'all';
    let visibleCards = [];
    
    // === Filter Functionality ===
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter category
            currentFilter = this.getAttribute('data-filter');
            
            // Filter gallery cards with animation
            filterGallery(currentFilter);
        });
    });
    
    function filterGallery(category) {
        visibleCards = [];
        
        galleryCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                // Show card with animation delay
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = `fadeInScale 0.5s ease forwards`;
                    }, 10);
                }, index * 50);
                visibleCards.push(card);
            } else {
                // Hide card
                card.classList.add('hidden');
            }
        });
        
        // Update load more button visibility
        updateLoadMoreButton();
    }
    
    // === View Toggle (Grid vs Masonry) ===
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get view type
            const viewType = this.getAttribute('data-view');
            
            // Toggle grid layout
            if (viewType === 'masonry') {
                galleryGrid.classList.add('masonry');
            } else {
                galleryGrid.classList.remove('masonry');
            }
        });
    });
    
    // === Lightbox Functionality ===
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        // Update visible cards array
        visibleCards = Array.from(galleryCards).filter(card => !card.classList.contains('hidden'));
        currentImageIndex = visibleCards.indexOf(galleryCards[index]);
        
        // Get card data
        const card = galleryCards[index];
        const img = card.querySelector('img');
        const title = card.querySelector('.card-info h3').textContent;
        const description = card.querySelector('.card-info p').textContent;
        const tag = card.querySelector('.card-tag').textContent;
        
        // Update lightbox content
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
        lightboxTag.textContent = tag;
        lightboxTag.className = 'card-tag';
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % visibleCards.length;
        updateLightboxImage();
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + visibleCards.length) % visibleCards.length;
        updateLightboxImage();
    }
    
    function updateLightboxImage() {
        const card = visibleCards[currentImageIndex];
        const img = card.querySelector('img');
        const title = card.querySelector('.card-info h3').textContent;
        const description = card.querySelector('.card-info p').textContent;
        const tag = card.querySelector('.card-tag').textContent;
        
        // Fade out
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            lightboxTag.textContent = tag;
            
            // Fade in
            lightboxImage.style.opacity = '1';
        }, 200);
    }
    
    // Lightbox event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    // Close lightbox on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    });
    
    // === Load More Functionality ===
    let visibleCount = galleryCards.length;
    const cardsPerLoad = 6;
    
    // Initially hide some cards if there are many
    if (galleryCards.length > 9) {
        galleryCards.forEach((card, index) => {
            if (index >= 9) {
                card.style.display = 'none';
            }
        });
        visibleCount = 9;
    } else {
        loadMoreBtn.style.display = 'none';
    }
    
    function updateLoadMoreButton() {
        const hiddenCards = Array.from(galleryCards).filter(card => 
            card.style.display === 'none' && !card.classList.contains('hidden')
        );
        
        if (hiddenCards.length === 0) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const hiddenCards = Array.from(galleryCards).filter(card => 
                card.style.display === 'none' && !card.classList.contains('hidden')
            );
            
            // Show next batch of cards
            hiddenCards.slice(0, cardsPerLoad).forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInScale 0.5s ease forwards';
                }, index * 100);
            });
            
            // Update button visibility
            setTimeout(() => {
                updateLoadMoreButton();
            }, cardsPerLoad * 100);
        });
    }
    
    // === Smooth Scroll to Gallery ===
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scroll');
    
    if (scrollTo === 'gallery') {
        setTimeout(() => {
            galleryGrid.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
    
    // === Image Lazy Loading Enhancement ===
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // === Add fade in animation to lightbox image ===
    lightboxImage.style.transition = 'opacity 0.3s ease';
    
    // === Initialize visible cards ===
    visibleCards = Array.from(galleryCards).filter(card => !card.classList.contains('hidden'));
    
    // === Analytics tracking (optional) ===
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('.card-info h3').textContent;
            
            // Track in console (replace with actual analytics)
            console.log(`Photo viewed: ${title} (${category})`);
            
            // Example Google Analytics event
            // gtag('event', 'photo_view', {
            //     'photo_category': category,
            //     'photo_title': title
            // });
        });
    });
    
    // === Console Message ===
    console.log('%c📸 Gallery loaded', 'color: #FF6B6B; font-size: 16px; font-weight: bold;');
    console.log(`Total photos: ${galleryCards.length}`);
});