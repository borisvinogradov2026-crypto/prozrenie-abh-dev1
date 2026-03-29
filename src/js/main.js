document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if(menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking on a link
        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }
});

// Modal Logic
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Close modal when clicking outside
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if(e.target === this) {
            if (this.id === 'videoModal') {
                closeVideoModal();
            } else {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Video Modal Specific Logic
window.openVideoModal = function(videoId) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoPlayer');
    if(modal && iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeVideoModal = function() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoPlayer');
    if(modal && iframe) {
        modal.classList.remove('active');
        iframe.src = '';
        document.body.style.overflow = '';
    }
};
