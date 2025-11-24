// HalalDetect - Common JavaScript Functions

// ====================
// Mobile Menu Toggle
// ====================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileClose = document.querySelector('.mobile-close');

    if (hamburger && mobileMenu && mobileOverlay && mobileClose) {
        // Open menu
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close menu
        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        mobileClose.addEventListener('click', closeMenu);
        mobileOverlay.addEventListener('click', closeMenu);

        // Mobile dropdown toggle
        const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const content = toggle.nextElementSibling;
                const arrow = toggle.querySelector('.dropdown-arrow');

                if (content.classList.contains('active')) {
                    content.classList.remove('active');
                    if (arrow) arrow.textContent = '▼';
                } else {
                    content.classList.add('active');
                    if (arrow) arrow.textContent = '▲';
                }
            });
        });
    }
}

// ====================
// Sticky Header on Scroll
// ====================
function initStickyHeader() {
    const header = document.querySelector('.header');

    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
}

// ====================
// Scroll to Top Button
// ====================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');

    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'flex';
            } else {
                scrollBtn.style.display = 'none';
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ====================
// Newsletter Form Handler
// ====================
function initNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value : '';

            // For now, just show a success message
            // In production, this would send to a newsletter service
            if (email) {
                alert('Thank you for subscribing! We\'ll send you weekly parenting tips.');
                if (emailInput) emailInput.value = '';
            }
        });
    });
}

// ====================
// Contact Form Handler
// ====================
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                name: form.querySelector('[name="name"]').value,
                email: form.querySelector('[name="email"]').value,
                subject: form.querySelector('[name="subject"]').value,
                message: form.querySelector('[name="message"]').value
            };

            // For now, just show a success message
            // In production, this would send to a backend service
            alert('Thank you for your message! We will respond within 48 hours.');
            form.reset();
        });
    }
}

// ====================
// Lazy Loading Images
// ====================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
}

// ====================
// Fade-in Animation on Scroll
// ====================
function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1
        });

        const elements = document.querySelectorAll('.anim-on-scroll');
        elements.forEach(el => animObserver.observe(el));
    }
}

// ====================
// Search Functionality
// ====================
function initSearch() {
    const searchIcon = document.querySelector('.search-icon');
    const searchModal = document.getElementById('searchModal');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.getElementById('searchInput');

    if (searchIcon && searchModal) {
        searchIcon.addEventListener('click', () => {
            searchModal.style.display = 'flex';
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 100);
        });

        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchModal.style.display = 'none';
            });
        }

        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.style.display = 'none';
            }
        });

        // Handle search form submission
        const searchForm = document.getElementById('searchForm');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = searchInput ? searchInput.value : '';
                if (query) {
                    // In production, this would search through articles
                    alert(`Search functionality coming soon! Query: ${query}`);
                }
            });
        }
    }
}

// ====================
// Generate Dynamic Sitemap Data
// ====================
function getSitemapData() {
    return {
        pages: [
            { url: '/', priority: 1.0, changefreq: 'daily' },
            { url: '/about.html', priority: 0.8, changefreq: 'monthly' },
            { url: '/contact.html', priority: 0.6, changefreq: 'monthly' },
            { url: '/by-age.html', priority: 0.9, changefreq: 'weekly' },
            { url: '/challenges.html', priority: 0.9, changefreq: 'weekly' },
            { url: '/islamic-education.html', priority: 0.9, changefreq: 'weekly' },
            { url: '/prophet-stories.html', priority: 1.0, changefreq: 'weekly' },
            { url: '/new-muslims.html', priority: 0.8, changefreq: 'weekly' },
            { url: '/free-resources.html', priority: 0.9, changefreq: 'weekly' },
            { url: '/blog.html', priority: 0.9, changefreq: 'daily' },
            { url: '/privacy-policy.html', priority: 0.3, changefreq: 'yearly' },
            { url: '/terms.html', priority: 0.3, changefreq: 'yearly' },
            { url: '/affiliate-disclosure.html', priority: 0.3, changefreq: 'yearly' }
        ]
    };
}

// ====================
// Initialize All Functions
// ====================
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initStickyHeader();
    initScrollToTop();
    initNewsletterForm();
    initContactForm();
    initLazyLoading();
    initScrollAnimations();
    initSearch();
});

// ====================
// Service Worker Registration (for PWA)
// ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed:', err);
            });
    });
}
