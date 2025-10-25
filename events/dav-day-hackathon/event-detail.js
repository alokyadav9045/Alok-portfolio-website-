// Event Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Photo gallery functionality
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryIndicators = document.getElementById('galleryIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const imageModal = document.getElementById('image-modal');
    
    // Photo array - these should match your actual photos
    const photos = [
        'dav-hackathon-cover.jpg',
        '2H9A1072.JPG',
        '2H9A1075.JPG',
        '2H9A1101.JPG',
        '2H9A1102.JPG',
        '2H9A1229.JPG',
        '2H9A1232.JPG',
        '2H9A1263.JPG',
        '2H9A1324.JPG',
        '2H9A1400.JPG',
        '2H9A1444.JPG',
        'K2K04500.JPG',
        'IMG-20250805-WA0030.jpg',
        'IMG_20250621_094932869.jpg',
        'IMG_20250621_180412096.jpg',
        'Snapchat-142108097.jpg',
        'Snapchat-996334667.jpg'
    ];
    
    let currentIndex = 0;
    let isPlaying = true;
    let autoSlideInterval;
    
    // Photo descriptions for modal
    const photoDescriptions = [
        'DAV Day Hackathon - Team collaboration session',
        'Developers working on innovative solutions',
        'Coding sprint in progress',
        'Team presentation preparation',
        'Mentors guiding participants',
        'Project development showcase',
        'Technical implementation discussion',
        'Final presentation setup',
        'Award ceremony moment',
        'Team celebrating achievement',
        'Innovation showcase display',
        'Networking with fellow developers',
        'Project demonstration session',
        'Hackathon closing ceremony',
        'Group photo with participants'
    ];
    
    // Initialize gallery
    function initGallery() {
        // Create photo elements
        photos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = `../images/dav-day-hackathon/${photo}`;
            img.alt = photoDescriptions[index];
            img.className = 'gallery-item';
            img.addEventListener('click', () => openModal(index));
            galleryTrack.appendChild(img);
        });
        
        // Create indicators
        photos.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            galleryIndicators.appendChild(indicator);
        });
        
        // Start auto-slide
        startAutoSlide();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        const translateX = -currentIndex * 100;
        galleryTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        document.querySelectorAll('.indicator').forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % photos.length;
        goToSlide(currentIndex);
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        goToSlide(currentIndex);
    }
    
    // Start auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    // Stop auto-slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    // Toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    }
    
    // Modal functionality
    function openModal(index) {
        const modalImg = imageModal.querySelector('img');
        const modalCaption = imageModal.querySelector('.modal-caption');
        
        modalImg.src = `../images/dav-day-hackathon/${photos[index]}`;
        modalImg.alt = photoDescriptions[index];
        modalCaption.textContent = photoDescriptions[index];
        
        imageModal.classList.add('active');
        imageModal.setAttribute('aria-hidden', 'false');
        
        // Store current modal index for navigation
        imageModal.currentIndex = index;
        
        // Stop auto-slide when modal is open
        stopAutoSlide();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        imageModal.classList.remove('active');
        imageModal.setAttribute('aria-hidden', 'true');
        
        // Resume auto-slide
        if (isPlaying) {
            startAutoSlide();
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    function modalPrevImage() {
        const newIndex = (imageModal.currentIndex - 1 + photos.length) % photos.length;
        openModal(newIndex);
    }
    
    function modalNextImage() {
        const newIndex = (imageModal.currentIndex + 1) % photos.length;
        openModal(newIndex);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
    
    // Modal event listeners
    const modalClose = imageModal?.querySelector('.modal-close');
    const modalPrev = imageModal?.querySelector('.modal-prev');
    const modalNext = imageModal?.querySelector('.modal-next');
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalPrev) modalPrev.addEventListener('click', modalPrevImage);
    if (modalNext) modalNext.addEventListener('click', modalNextImage);
    
    // Close modal on background click
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeModal();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (imageModal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    modalPrevImage();
                    break;
                case 'ArrowRight':
                    modalNextImage();
                    break;
            }
        } else {
            switch(e.key) {
                case 'ArrowLeft':
                    prevSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    togglePlayPause();
                    break;
            }
        }
    });
    
    // Pause on hover
    if (galleryTrack) {
        galleryTrack.addEventListener('mouseenter', () => {
            if (isPlaying) stopAutoSlide();
        });
        
        galleryTrack.addEventListener('mouseleave', () => {
            if (isPlaying) startAutoSlide();
        });
    }
    
    // Initialize the gallery
    initGallery();
    
    // Navbar functionality (inherited from main site)
    const menu = document.querySelector('#menu');
    const navbar = document.querySelector('.navbar');
    
    if (menu && navbar) {
        menu.addEventListener('click', () => {
            menu.classList.toggle('fa-times');
            navbar.classList.toggle('nav-toggle');
        });
        
        window.addEventListener('scroll', () => {
            menu.classList.remove('fa-times');
            navbar.classList.remove('nav-toggle');
        });
    }
    
    // Smooth scrolling for anchor links
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
    
    // Add scroll reveal animation
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
    document.querySelectorAll('.event-description, .photo-gallery, .technical-details').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});