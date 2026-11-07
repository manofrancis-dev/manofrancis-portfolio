document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // Part A: Interactive Mouse-Chase & Mobile Click/Touch Glow Aura Engine
    // ==========================================================================
    const glowOrbElement = document.getElementById('heroGlowOrb');

    if (glowOrbElement) {
        let mouseX = 0;
        let mouseY = 0;
        let isTicking = false;

        const updateGlowPosition = (clientX, clientY) => {
            mouseX = clientX - 300;
            mouseY = clientY - 300;

            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    glowOrbElement.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                    isTicking = false;
                });
                isTicking = true;
            }
        };

        // Laptop Mouse Hover
        window.addEventListener('mousemove', (event) => {
            updateGlowPosition(event.clientX, event.clientY);
        });

        // Mobile Full Body Click / Touch Interaction
        window.addEventListener('click', (event) => {
            updateGlowPosition(event.clientX, event.clientY);
        });

        window.addEventListener('touchstart', (event) => {
            if (event.touches.length > 0) {
                updateGlowPosition(event.touches[0].clientX, event.touches[0].clientY);
            }
        });

        window.addEventListener('touchmove', (event) => {
            if (event.touches.length > 0) {
                updateGlowPosition(event.touches[0].clientX, event.touches[0].clientY);
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
    // Part F: Dynamic 3D Card Interactive Tilt & Glare Tracking Engine
    // ==========================================================================
    const certCards = document.querySelectorAll('.cert-card-3d');

    certCards.forEach(card => {
        const glare = card.querySelector('.cert-glare');

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
    // Part H: Mobile Horizontal Certification Auto-Swipe Engine (2s Loop)
    // ==========================================================================
    const certGridContainer = document.querySelector('.certifications-3d-grid');
    const certCardItems = document.querySelectorAll('.cert-card-3d');

    if (certGridContainer && certCardItems.length > 0) {
        let activeCardIndex = 0;

        setInterval(() => {
            // Only execute auto-swipe on mobile viewport (<= 768px)
            if (window.innerWidth <= 768) {
                activeCardIndex++;
                
                // Reset to start immediately after hitting the end
                if (activeCardIndex >= certCardItems.length) {
                    activeCardIndex = 0;
                }

                const targetCard = certCardItems[activeCardIndex];
                certGridContainer.scrollTo({
                    left: targetCard.offsetLeft - certGridContainer.offsetLeft,
                    behavior: 'smooth'
                });
            }
        }, 2000);
    }
});
