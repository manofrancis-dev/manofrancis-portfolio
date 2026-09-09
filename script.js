document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // Part A: Interactive Mouse-Chase Glow Aura Engine (Optimized via rAF)
    // ==========================================================================
    const glowOrbElement = document.getElementById('heroGlowOrb');

    if (glowOrbElement) {
        let mouseX = 0;
        let mouseY = 0;
        let isTicking = false;

        window.addEventListener('mousemove', (event) => {
            mouseX = event.clientX - 300;
            mouseY = event.clientY - 300;

            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    glowOrbElement.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                    isTicking = false;
                });
                isTicking = true;
            }
        });
    }

    // ==========================================================================
    // Part B: High-Performance Scroll Reveal Intersection Observer
    // ==========================================================================
    const revealTargetNodes = document.querySelectorAll('.reveal-on-scroll');

    const observerConfigOptions = {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const scrollIntersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerConfigOptions);

    revealTargetNodes.forEach(node => {
        scrollIntersectionObserver.observe(node);
    });

    // ==========================================================================
    // Part C: Firebase Contact Form Handling Engine
    // ==========================================================================
    const gatewayFormElement = document.getElementById('contactForm');
    const feedbackStatusOutput = document.getElementById('formStatus');

    if (gatewayFormElement) {
        gatewayFormElement.addEventListener('submit', async (event) => {
            event.preventDefault();

            const inputSenderName = document.getElementById('userName').value.trim();
            const inputSenderEmail = document.getElementById('userEmail').value.trim();
            const inputSenderMessage = document.getElementById('userMessage').value.trim();

            if (!inputSenderName || !inputSenderEmail || !inputSenderMessage) {
                renderFormFeedback('All fields are strictly required for security validation.', 'error');
                return;
            }

            if (!window.FirebaseEngine) {
                renderFormFeedback('System Error: Database connection layer not initialized.', 'error');
                return;
            }

            try {
                const { getFirestore, collection, addDoc, serverTimestamp } = window.FirebaseEngine;
                const db = getFirestore();

                await addDoc(collection(db, 'messages'), {
                    name: inputSenderName,
                    email: inputSenderEmail,
                    message: inputSenderMessage,
                    timestamp: serverTimestamp()
                });

                renderFormFeedback('Transmission successful! Connection gateway secured.', 'success');
                gatewayFormElement.reset();

            } catch (runtimeError) {
                console.error("Database Write Rejection Details: ", runtimeError);
                renderFormFeedback('Data transmission rejected. Check your connection metrics.', 'error');
            }
        });
    }

    function renderFormFeedback(dynamicMessage, feedbackStatusType) {
        if (!feedbackStatusOutput) return;
        
        feedbackStatusOutput.textContent = dynamicMessage;
        feedbackStatusOutput.className = 'form-status-feedback-msg'; 
        feedbackStatusOutput.classList.add(feedbackStatusType);

        setTimeout(() => {
            feedbackStatusOutput.textContent = '';
            feedbackStatusOutput.className = 'form-status-feedback-msg';
        }, 6000);
    }

    // ==========================================================================
    // Part D: Mobile System Navigation Drawer Toggle Logic
    // ==========================================================================
    const menuToggleBtn = document.getElementById('mobileMenuBtn');
    const menuLinksTray = document.getElementById('navMenuLinks');
    const internalNavLinks = document.querySelectorAll('.nav-menu-links a');

    if (menuToggleBtn && menuLinksTray) {
        const toggleMenuContext = () => {
            menuToggleBtn.classList.toggle('is-active');
            menuLinksTray.classList.toggle('is-active');
        };

        menuToggleBtn.addEventListener('click', toggleMenuContext);

        internalNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuLinksTray.classList.contains('is-active')) {
                    toggleMenuContext();
                }
            });
        });
    }

    // ==========================================================================
    // Part E: Premium Top-to-Bottom Window Scrolling Engine
    // ==========================================================================
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('is-visible');
            } else {
                backToTopBtn.classList.remove('is-visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // Part F: Dynamic 3D Card Hover & Mobile Click Background Effect Engine
    // ==========================================================================
    const certCards = document.querySelectorAll('.cert-card-3d');

    certCards.forEach(card => {
        const glare = card.querySelector('.cert-glare');

        // Laptop / Desktop Mouse Hover Effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

            if (glare) {
                glare.style.transform = `translate(${x - rect.width}px, ${y - rect.height}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            if (glare) {
                glare.style.transform = 'translate(0, 0)';
            }
        });

        // Mobile Click / Tap Background Effect Logic
        card.addEventListener('click', () => {
            // Reset other cards
            certCards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active-tap');
                    c.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                    const otherGlare = c.querySelector('.cert-glare');
                    if (otherGlare) otherGlare.style.transform = 'translate(0, 0)';
                }
            });

            // Toggle background effect on current card
            const isTapped = card.classList.toggle('active-tap');
            if (isTapped) {
                card.style.transform = 'perspective(1000px) rotateX(4deg) rotateY(-4deg) scale(1.02)';
                if (glare) glare.style.transform = 'translate(30%, 30%)';
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                if (glare) glare.style.transform = 'translate(0, 0)';
            }
        });
    });

    // ==========================================================================
    // Part G: Scrollspy Active Link Navigation Highlighting
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu-links a[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('is-active');
                } else {
                    navLink.classList.remove('is-active');
                }
            }
        });
    });

    // ==========================================================================
    // Part H: Mobile Horizontal Auto-Swipe Engine (Every 2 Seconds Loop)
    // ==========================================================================
    const certGridContainer = document.querySelector('.certifications-3d-grid');

    if (certGridContainer) {
        let autoSwipeTimer = null;

        const runAutoSwipe = () => {
            if (window.innerWidth <= 768) {
                if (autoSwipeTimer) clearInterval(autoSwipeTimer);

                autoSwipeTimer = setInterval(() => {
                    const firstCard = certGridContainer.querySelector('.cert-card-3d');
                    if (!firstCard) return;

                    const cardGap = 20; // Horizontal gap between cards
                    const scrollAmount = firstCard.offsetWidth + cardGap;
                    const maxScrollLeft = certGridContainer.scrollWidth - certGridContainer.clientWidth;

                    // If reaching the end, instantly reset back to beginning
                    if (certGridContainer.scrollLeft >= maxScrollLeft - 10) {
                        certGridContainer.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        certGridContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }
                }, 2000); // 2 Seconds Interval
            } else {
                if (autoSwipeTimer) clearInterval(autoSwipeTimer);
            }
        };

        runAutoSwipe();
        window.addEventListener('resize', runAutoSwipe);

        // Pause auto-swipe temporarily on user touch
        certGridContainer.addEventListener('touchstart', () => {
            if (autoSwipeTimer) clearInterval(autoSwipeTimer);
        }, { passive: true });

        certGridContainer.addEventListener('touchend', () => {
            runAutoSwipe();
        }, { passive: true });
    }
});
