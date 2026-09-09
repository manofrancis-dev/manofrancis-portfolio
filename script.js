/**
 * Application Controller Logic & Mobile Interactive Modules
 * Mano Francis Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Menu Navigation Toggle
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenuLinks = document.getElementById('navMenuLinks');
    const navLinks = document.querySelectorAll('.nav-item-link, .nav-cta-btn');

    if (mobileMenuBtn && navMenuLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navMenuLinks.classList.toggle('active');
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenuLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ==========================================================================
       2. Radial Mouse-Tracking Glow Orb Logic
       ========================================================================== */
    const heroGlowOrb = document.getElementById('heroGlowOrb');

    if (heroGlowOrb) {
        window.addEventListener('mousemove', (e) => {
            heroGlowOrb.style.left = `${e.clientX}px`;
            heroGlowOrb.style.top = `${e.clientY}px`;
        });
    }

    /* ==========================================================================
       3. Intersection Observer for Scroll Reveal Animations
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => revealObserver.observe(element));

    /* ==========================================================================
       4. Certificate Auto-Swipe Logic for Mobile (2-Second Loop)
       ========================================================================== */
    const certGrid = document.querySelector('.certifications-3d-grid');
    const certCards = document.querySelectorAll('.cert-card-3d');
    
    if (certGrid && certCards.length > 0) {
        let currentIndex = 0;
        let autoSwipeTimer = null;

        const startAutoSwipe = () => {
            // Activate only on mobile devices (<= 768px width)
            if (window.innerWidth <= 768) {
                if (!autoSwipeTimer) {
                    autoSwipeTimer = setInterval(() => {
                        currentIndex = (currentIndex + 1) % certCards.length; // Infinite cycle back to 0
                        const cardWidth = certCards[0].offsetWidth + 16; // width + grid gap
                        
                        certGrid.scrollTo({
                            left: currentIndex * cardWidth,
                            behavior: 'smooth'
                        });
                    }, 2000); // 2 seconds interval
                }
            } else {
                // Clear interval if viewport expands to desktop
                if (autoSwipeTimer) {
                    clearInterval(autoSwipeTimer);
                    autoSwipeTimer = null;
                }
            }
        };

        // Initialize swipe trigger
        startAutoSwipe();

        // Update tracking on manual scroll
        certGrid.addEventListener('scroll', () => {
            if (window.innerWidth <= 768 && certCards[0].offsetWidth > 0) {
                const cardWidth = certCards[0].offsetWidth + 16;
                currentIndex = Math.round(certGrid.scrollLeft / cardWidth);
            }
        });

        // Re-evaluate swipe mode on viewport resize
        window.addEventListener('resize', startAutoSwipe);
    }

    /* ==========================================================================
       5. Back To Top Trigger Button
       ========================================================================== */
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       6. Contact Form Submission Engine with Firebase Support
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            const name = document.getElementById('userName').value.trim();
            const email = document.getElementById('userEmail').value.trim();
            const message = document.getElementById('userMessage').value.trim();

            if (!name || !email || !message) {
                formStatus.style.color = '#ef4444';
                formStatus.textContent = 'Please complete all required fields.';
                return;
            }

            try {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Transmitting...</span>';
                formStatus.style.color = '#9ca3af';
                formStatus.textContent = 'Processing form payload...';

                // Save message directly to Firebase Firestore
                if (window.FirebaseEngine) {
                    const db = window.FirebaseEngine.getFirestore();
                    const messagesCollection = window.FirebaseEngine.collection(db, 'messages');
                    
                    await window.FirebaseEngine.addDoc(messagesCollection, {
                        name: name,
                        email: email,
                        message: message,
                        timestamp: window.FirebaseEngine.serverTimestamp()
                    });

                    formStatus.style.color = '#10b981';
                    formStatus.textContent = 'Message transmitted successfully! I will contact you shortly.';
                    contactForm.reset();
                } else {
                    throw new Error('Firebase Engine unavailable');
                }
            } catch (error) {
                console.error('Submission Error:', error);
                formStatus.style.color = '#ef4444';
                formStatus.textContent = 'Unable to send message directly. Please email mj4682770@gmail.com.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

});
