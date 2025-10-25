// Event Detail Page Gallery Script

document.addEventListener('DOMContentLoaded', function() {
    // Photo gallery functionality
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryIndicators = document.getElementById('galleryIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const imageModal = document.getElementById('image-modal');
    
    // Photo array for AI Day Lucknow
    const photos = [
        'ai-day-cover.jpg',
        '20241019_134642.jpg',
        'IMG-20241020-WA0008.jpg',
        'IMG-20241021-WA0012.jpg',
        'IMG-20241020-WA0022.jpg',
        'IMG-20241020-WA0028.jpg',
        'IMG-20241021-WA0013.jpg',
        'IMG-20241021-WA0014.jpg',
        'Snapchat-1147138858.jpg',
        'Snapchat-1577219327.jpg',
        '1729394421088.jpg'
    ];
    
    let currentIndex = 0;
    let isPlaying = true;
    let autoSlideInterval;
    
    // Photo descriptions for modal
    const photoDescriptions = [
        'AI Day Lucknow - Conference Opening Session',
        'Machine Learning Workshop in Progress',
        'Deep Learning Architecture Discussion',
        'AI Ethics and Responsible AI Panel',
        'Computer Vision Demo and Hands-on',
        'Natural Language Processing Workshop',
        'Industry Expert Networking Session',
        'Certificate Award Ceremony',
        'Group Photo with AI Enthusiasts',
        'Conference Closing and Future Plans'
    ];
    
    // Initialize gallery
    function initGallery() {
        // Create photo elements
        photos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = `../images/ai-day-lucknow/${photo}`;
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
    
    // Toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            clearInterval(autoSlideInterval);
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            startAutoSlide();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }
    }
    
    // Start auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 3000);
    }
    
    // Modal functionality
    function openModal(index) {
        const modal = document.getElementById('image-modal');
        const modalImg = modal.querySelector('img');
        const modalCaption = modal.querySelector('.modal-caption');
        
        modalImg.src = `../images/ai-day-lucknow/${photos[index]}`;
        modalImg.alt = photoDescriptions[index];
        modalCaption.textContent = photoDescriptions[index];
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Pause auto-slide when modal is open
        if (isPlaying) {
            clearInterval(autoSlideInterval);
        }
    }
    
    function closeModal() {
        const modal = document.getElementById('image-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Resume auto-slide when modal is closed
        if (isPlaying) {
            startAutoSlide();
        }
    }
    
    // Event listeners
    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);
    playPauseBtn?.addEventListener('click', togglePlayPause);
    
    // Modal event listeners
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    document.querySelector('.modal-prev')?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        openModal(currentIndex);
    });
    document.querySelector('.modal-next')?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % photos.length;
        openModal(currentIndex);
    });
    
    // Close modal on backdrop click
    document.getElementById('image-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'image-modal') {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('image-modal');
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + photos.length) % photos.length;
                openModal(currentIndex);
            }
            if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % photos.length;
                openModal(currentIndex);
            }
        }
    });
    
    // Initialize gallery
    initGallery();
    
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

    console.log('AI Day Lucknow event page initialized successfully!');
});