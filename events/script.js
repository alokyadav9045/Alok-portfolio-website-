$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // Initialize auto-scrolling for event cards
    initAutoScrollCards();

});

// Auto-scrolling functionality for event cards
function initAutoScrollCards() {
    const autoScrollCards = document.querySelectorAll('.auto-scroll-card');
    
    autoScrollCards.forEach(card => {
        const img = card.querySelector('.gallery-item');
        const imagesData = card.getAttribute('data-images');
        
        if (imagesData) {
            try {
                const images = JSON.parse(imagesData);
                let currentIndex = 0;
                
                // Create image preloading
                const preloadedImages = [];
                images.forEach(src => {
                    const preloadImg = new Image();
                    preloadImg.src = src;
                    preloadedImages.push(preloadImg);
                });
                
                // Auto-scroll function
                const autoScroll = () => {
                    currentIndex = (currentIndex + 1) % images.length;
                    img.style.opacity = '0';
                    
                    setTimeout(() => {
                        img.src = images[currentIndex];
                        img.style.opacity = '1';
                    }, 300);
                };
                
                // Start auto-scrolling every 3 seconds
                const intervalId = setInterval(autoScroll, 3000);
                
                // Pause on hover
                card.addEventListener('mouseenter', () => {
                    clearInterval(intervalId);
                });
                
                // Resume on mouse leave
                card.addEventListener('mouseleave', () => {
                    const newIntervalId = setInterval(autoScroll, 3000);
                    card.intervalId = newIntervalId;
                });
                
                // Store interval ID for cleanup
                card.intervalId = intervalId;
                
            } catch (e) {
                console.error('Error parsing images data:', e);
            }
        }
    });
}

// Events gallery modal interactions
(function () {
  const galleryItems = Array.from(document.querySelectorAll('.events .gallery-item'));
  const modal = document.getElementById('gallery-modal');
  if (!modal || !galleryItems.length) return;
  
  const modalImg = modal.querySelector('.gm-content img');
  const modalCaption = modal.querySelector('.gm-caption');
  const btnClose = modal.querySelector('.gm-close');
  const btnNext = modal.querySelector('.gm-next');
  const btnPrev = modal.querySelector('.gm-prev');
  let currentIndex = 0;

  function openModal(index) {
    const img = galleryItems[index];
    modalImg.src = img.src;
    modalImg.alt = img.alt || '';
    modalCaption.textContent = img.alt || img.getAttribute('data-caption') || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    currentIndex = index;
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openModal(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openModal(currentIndex);
  }

  galleryItems.forEach((img, i) => {
    img.addEventListener('click', () => openModal(i));
  });

  btnClose.addEventListener('click', closeModal);
  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
})();

// VanillaTilt.js effect
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

// ScrollReveal animations
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL EVENTS */
srtop.reveal('.events .heading', { delay: 200 });
srtop.reveal('.events .quote', { delay: 300 });
srtop.reveal('.events .box', { interval: 200 });

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Hackathons & Tech Events | Portfolio Alok Yadav";
        }
        else {
            document.title = "Come Back To Events";
        }
    });