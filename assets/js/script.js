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

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 100;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
   // Initialize EmailJS
(function() {
  emailjs.init({
    publicKey: "r9-t85ViUGExx-hc4" // ✅ Replace with your Public Key
  });
})();

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  emailjs.sendForm("service_r2gspm1", "template_9w7ia8l", "#contact-form")
    .then(function(response) {
      console.log("SUCCESS!", response.status, response.text);
      alert("✅ Email Sent Successfully!");
      document.getElementById("contact-form").reset();
    }, function(error) {
      console.error("FAILED...", error);
      alert("❌ Failed to Send Email. Please try again!");
    });
});


    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Alok yadav";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["MERN Stack developer",],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 300,
});
// <!-- typed js effect ends -->

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
                
                // Start auto-scrolling every 4 seconds (slightly slower for home page)
                const intervalId = setInterval(autoScroll, 4000);
                
                // Pause on hover
                card.addEventListener('mouseenter', () => {
                    clearInterval(intervalId);
                });
                
                // Resume on mouse leave
                card.addEventListener('mouseleave', () => {
                    const newIntervalId = setInterval(autoScroll, 4000);
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

// Initialize auto-scrolling when DOM is loaded
document.addEventListener('DOMContentLoaded', initAutoScrollCards);

async function fetchData(type = "skills") {
    try {
        let response;
        if (type === "skills") {
            response = await fetch("skills.json");
        } else {
            response = await fetch("./projects/projects.json");
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn(`Failed to fetch ${type} data:`, error);
        return []; // Return empty array as fallback
    }
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer || !Array.isArray(skills)) {
        console.warn("Skills container not found or invalid skills data");
        return;
    }
    
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    if (!projectsContainer || !Array.isArray(projects)) {
        console.warn("Projects container not found or invalid projects data");
        return;
    }
    
    let projectHTML = "";
    projects.slice(0, 4).filter(project => project.category != "basicweb").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
// Check if device is mobile to optimize performance
const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: isMobile ? 8 : 15,  // Reduce tilt intensity on mobile
    speed: isMobile ? 200 : 400,  // Slower animation on mobile
    glare: !isMobile,  // Disable glare effect on mobile for better performance
    "max-glare": 0.2,
    scale: isMobile ? 1.02 : 1.05,  // Subtle scale on mobile
});

// Enhanced mobile touch interactions for project cards
if (isMobile) {
    const projectBoxes = document.querySelectorAll('.work .box');
    
    projectBoxes.forEach(box => {
        let touchStarted = false;
        
        // Handle touch start
        box.addEventListener('touchstart', function(e) {
            touchStarted = true;
            this.classList.add('mobile-active');
        }, { passive: true });
        
        // Handle touch end
        box.addEventListener('touchend', function(e) {
            if (touchStarted) {
                setTimeout(() => {
                    this.classList.remove('mobile-active');
                }, 300);
            }
            touchStarted = false;
        }, { passive: true });
        
        // Handle touch cancel
        box.addEventListener('touchcancel', function(e) {
            this.classList.remove('mobile-active');
            touchStarted = false;
        }, { passive: true });
    });
}
// <!-- tilt js effect ends -->


// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

/* SCROLL EVENTS GALLERY */
srtop.reveal('.gallery .box', { interval: 200 });

/* Events gallery modal interactions */
(function () {
    // Skip modal functionality for clickable cards to avoid conflicts
    const galleryItems = Array.from(document.querySelectorAll('.gallery .gallery-item')).filter(img => {
        return !img.closest('.clickable-event');
    });
    
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
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(i);
        });
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

// Individual Card Image Sliding Functionality
(function() {
    const autoScrollCards = document.querySelectorAll('.auto-scroll-card');
    
    if (!autoScrollCards.length) return;
    
    class CardImageSlider {
        constructor(card) {
            this.card = card;
            this.imageSlider = card.querySelector('.image-slider');
            this.images = JSON.parse(card.getAttribute('data-images') || '[]');
            this.currentIndex = 0;
            this.isSliding = false;
            this.autoSlideInterval = null;
            this.progressBar = null;
            this.progressInterval = null;
            
            // Validate required elements exist
            if (!this.imageSlider || !this.images.length) {
                console.warn('CardImageSlider: Missing required elements or images');
                return;
            }
            
            this.init();
        }
        
        init() {
            if (this.images.length <= 1) return;
            
            this.createImages();
            this.setupEventListeners();
        }
        
        createImages() {
            // Clear existing images except the first one
            const existingImg = this.imageSlider.querySelector('.gallery-item');
            this.imageSlider.innerHTML = '';
            
            // Create all images with error handling
            this.validImages = [];
            let loadedCount = 0;
            
            this.images.forEach((imageSrc, index) => {
                const img = document.createElement('img');
                img.draggable = false;
                img.alt = `${this.card.querySelector('h3').textContent} - Image ${index + 1}`;
                
                // Handle image load success
                img.onload = () => {
                    this.validImages.push(imageSrc);
                    img.className = `gallery-item ${this.validImages.length === 1 ? 'active' : ''}`;
                    this.imageSlider.appendChild(img);
                    loadedCount++;
                    
                    // Update images array to only include valid images
                    if (loadedCount === this.images.length) {
                        this.images = this.validImages;
                        if (this.images.length > 1) {
                            this.createProgressBar();
                            this.startAutoSlide();
                        }
                    }
                };
                
                // Handle image load error
                img.onerror = () => {
                    console.warn(`Image not found: ${imageSrc}`);
                    loadedCount++;
                    
                    // Check if all images have been processed
                    if (loadedCount === this.images.length) {
                        this.images = this.validImages;
                        if (this.images.length > 1) {
                            this.createProgressBar();
                            this.startAutoSlide();
                        }
                    }
                };
                
                img.src = imageSrc;
            });
        }
        
        createProgressBar() {
            if (!this.imageSlider) return;
            
            this.progressBar = document.createElement('div');
            this.progressBar.className = 'progress-bar';
            this.progressBar.style.width = '0%';
            this.imageSlider.appendChild(this.progressBar);
        }
        
        slideToNext() {
            if (this.isSliding) return;
            
            this.isSliding = true;
            const currentImg = this.imageSlider.querySelector('.gallery-item.active');
            const nextIndex = (this.currentIndex + 1) % this.images.length;
            const nextImg = this.imageSlider.children[nextIndex];
            
            // Add null checks to prevent errors
            if (!currentImg || !nextImg) {
                this.isSliding = false;
                return;
            }
            
            // Prepare next image
            nextImg.style.transform = 'translateX(100%)';
            nextImg.style.opacity = '0';
            
            // Trigger transition
            setTimeout(() => {
                if (currentImg && nextImg) {
                    currentImg.classList.remove('active');
                    currentImg.classList.add('prev');
                    
                    nextImg.classList.add('active');
                    nextImg.style.transform = 'translateX(0)';
                    nextImg.style.opacity = '1';
                    
                    this.currentIndex = nextIndex;
                }
            }, 50);
            
            // Clean up after transition
            setTimeout(() => {
                if (currentImg) {
                    currentImg.classList.remove('prev');
                    currentImg.style.transform = 'translateX(-100%)';
                    currentImg.style.opacity = '0';
                }
                this.isSliding = false;
            }, 850);
        }
        
        startAutoSlide() {
            if (this.images.length <= 1 || !this.imageSlider) return;
            
            this.stopAutoSlide();
            this.startProgressAnimation();
            
            this.autoSlideInterval = setInterval(() => {
                this.slideToNext();
                this.startProgressAnimation();
            }, 3500); // 3.5 seconds per slide
        }
        
        stopAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
            this.stopProgressAnimation();
        }
        
        startProgressAnimation() {
            this.stopProgressAnimation();
            
            if (!this.progressBar) return;
            
            this.progressBar.style.width = '0%';
            this.progressBar.style.transition = 'none';
            
            setTimeout(() => {
                this.progressBar.style.transition = 'width 3.5s linear';
                this.progressBar.style.width = '100%';
            }, 50);
        }
        
        stopProgressAnimation() {
            if (this.progressBar) {
                this.progressBar.style.transition = 'none';
                this.progressBar.style.width = '0%';
            }
        }
        
        resetAutoSlide() {
            this.stopAutoSlide();
            setTimeout(() => this.startAutoSlide(), 100);
        }
        
        setupEventListeners() {
            // Pause on hover
            this.card.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });
            
            this.card.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
            
            // Manual navigation on click (optional)
            this.imageSlider.addEventListener('click', (e) => {
                e.stopPropagation();
                this.slideToNext();
                this.resetAutoSlide();
            });
        }
        
        destroy() {
            this.stopAutoSlide();
        }
    }
    
    // Initialize all card sliders
    const cardSliders = [];
    
    autoScrollCards.forEach(card => {
        const slider = new CardImageSlider(card);
        cardSliders.push(slider);
    });
    
    // Pause all sliders when page is not visible
    document.addEventListener('visibilitychange', () => {
        cardSliders.forEach(slider => {
            if (document.hidden) {
                slider.stopAutoSlide();
            } else {
                slider.startAutoSlide();
            }
        });
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cardSliders.forEach(slider => slider.destroy());
    });
})();

// Simple solution to ensure event cards work
$(document).ready(function() {
    // Handle clickable event cards with higher priority
    $('.clickable-event').each(function() {
        const $card = $(this);
        const onclickAttr = $card.attr('onclick');
        
        if (onclickAttr) {
            // Remove the onclick attribute to prevent conflicts
            $card.removeAttr('onclick');
            $card.css('cursor', 'pointer');
            
            // Add click handler with high priority
            $card.on('click.eventcard', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                // Extract URL from the original onclick
                const urlMatch = onclickAttr.match(/window\.location\.href='([^']+)'/);
                if (urlMatch) {
                    console.log('Navigating to:', urlMatch[1]); // Debug log
                    window.location.href = urlMatch[1];
                }
                return false;
            });
            
            // Also handle clicks on child elements
            $card.find('*').on('click.eventcard', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                const urlMatch = onclickAttr.match(/window\.location\.href='([^']+)'/);
                if (urlMatch) {
                    console.log('Child click - navigating to:', urlMatch[1]); // Debug log
                    window.location.href = urlMatch[1];
                }
                return false;
            });
        }
    });
});
