// Event Detail Page Gallery Script - Smart Cities Expo

class EventGallery {
    constructor() {
        this.galleryTrack = document.querySelector('.gallery-track');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.playBtn = document.querySelector('.play-btn');
        this.indicators = document.querySelectorAll('.indicator');
        this.modal = document.querySelector('.image-modal');
        this.modalImg = document.querySelector('.modal-content img');
        this.modalCaption = document.querySelector('.modal-caption');
        this.modalClose = document.querySelector('.modal-close');
        this.modalPrev = document.querySelector('.modal-prev');
        this.modalNext = document.querySelector('.modal-next');

        this.currentIndex = 0;
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        this.updateGallery();
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateIndicators();
    }

    setupEventListeners() {
        // Gallery navigation
        this.prevBtn?.addEventListener('click', () => this.prevImage());
        this.nextBtn?.addEventListener('click', () => this.nextImage());
        this.playBtn?.addEventListener('click', () => this.toggleAutoPlay());

        // Gallery items click for modal
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => this.openModal(index));
        });

        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToImage(index));
        });

        // Modal controls
        this.modalClose?.addEventListener('click', () => this.closeModal());
        this.modalPrev?.addEventListener('click', () => this.modalPrevImage());
        this.modalNext?.addEventListener('click', () => this.modalNextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
            if (e.key === 'ArrowLeft') {
                if (this.modal.classList.contains('active')) {
                    this.modalPrevImage();
                } else {
                    this.prevImage();
                }
            }
            if (e.key === 'ArrowRight') {
                if (this.modal.classList.contains('active')) {
                    this.modalNextImage();
                } else {
                    this.nextImage();
                }
            }
        });

        // Close modal on backdrop click
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Touch/swipe support
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        let startX = 0;
        let endX = 0;

        this.galleryTrack?.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.galleryTrack?.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextImage();
            } else {
                this.prevImage();
            }
        }
    }

    prevImage() {
        this.currentIndex = this.currentIndex === 0 ? this.galleryItems.length - 1 : this.currentIndex - 1;
        this.updateGallery();
        this.updateIndicators();
    }

    nextImage() {
        this.currentIndex = this.currentIndex === this.galleryItems.length - 1 ? 0 : this.currentIndex + 1;
        this.updateGallery();
        this.updateIndicators();
    }

    goToImage(index) {
        this.currentIndex = index;
        this.updateGallery();
        this.updateIndicators();
    }

    updateGallery() {
        if (this.galleryTrack) {
            const translateX = -this.currentIndex * 100;
            this.galleryTrack.style.transform = `translateX(${translateX}%)`;
        }
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoPlay() {
        if (this.isAutoPlaying) {
            this.autoPlayInterval = setInterval(() => {
                this.nextImage();
            }, 4000);
        }
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    toggleAutoPlay() {
        this.isAutoPlaying = !this.isAutoPlaying;
        
        if (this.isAutoPlaying) {
            this.startAutoPlay();
            this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            this.stopAutoPlay();
            this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    openModal(index) {
        this.currentIndex = index;
        const currentItem = this.galleryItems[index];
        
        if (this.modal && this.modalImg && currentItem) {
            this.modalImg.src = currentItem.src;
            this.modalImg.alt = currentItem.alt;
            
            if (this.modalCaption) {
                this.modalCaption.textContent = currentItem.alt || `Smart Cities Expo - Image ${index + 1}`;
            }
            
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.stopAutoPlay();
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (this.isAutoPlaying) {
                this.startAutoPlay();
            }
        }
    }

    modalPrevImage() {
        this.currentIndex = this.currentIndex === 0 ? this.galleryItems.length - 1 : this.currentIndex - 1;
        this.openModal(this.currentIndex);
    }

    modalNextImage() {
        this.currentIndex = this.currentIndex === this.galleryItems.length - 1 ? 0 : this.currentIndex + 1;
        this.openModal(this.currentIndex);
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize event gallery
    new EventGallery();

    // Smooth scroll for navigation links
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

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Animate elements on scroll
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

    // Observe sections for animation
    document.querySelectorAll('.event-description, .photo-gallery, .technical-details').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Tech cards hover effect
    document.querySelectorAll('.tech-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Preload images for better performance
    const images = document.querySelectorAll('.gallery-item');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });

    console.log('Smart Cities Expo event page initialized successfully!');
});