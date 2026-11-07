document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // Part 1: Next-Gen Dual-Ring Interactive Custom Cursor Engine
    // ==========================================================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');

    if (cursorDot && cursorOutline) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let outlineX = mouseX;
        let outlineY = mouseY;

        // Track exact cursor position
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Silky-smooth trailing spring interpolation for the halo outline
        const renderCursorPhysics = () => {
            outlineX += (mouseX - outlineX) * 0.18;
            outlineY += (mouseY - outlineY) * 0.18;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            requestAnimationFrame(renderCursorPhysics);
        };
        renderCursorPhysics();

        // Magnetic hover magnification on interactive targets
        const interactiveTargets = document.querySelectorAll(
            'a, button, input, textarea, .interactive-surface, .showcase-card, .cert-card-3d, .avatar-glass-frame, .stack-card'
        );

        interactiveTargets.forEach(target => {
            target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // ==========================================================================
    // Part 2: Ambient Radial Glow Orb Engine (Desktop Mouse & Mobile Touch)
    // ==========================================================================
    const glowOrbElement = document.getElementById('heroGlowOrb');

    if (glowOrbElement) {
        let orbX = 0;
        let orbY = 0;
        let isOrbTicking = false;

        const updateGlowPosition = (clientX, clientY) => {
            orbX = clientX - 300;
            orbY = clientY - 300;

            if (!isOrbTicking) {
                window.requestAnimationFrame(() => {
                    glowOrbElement.style.transform = `translate3d(${orbX}px, ${orbY}px, 0)`;
                    isOrbTicking = false;
                });
                isOrbTicking = true;
            }
        };

        window.addEventListener('mousemove', (e) => updateGlowPosition(e.clientX, e.clientY));
        window.addEventListener('click', (e) => updateGlowPosition(e.clientX, e.clientY));
        
        window.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) updateGlowPosition(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) updateGlowPosition(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
    }

    // ==========================================================================
    // Part 3: High-Performance Scroll Reveal Intersection Observer
    // ==========================================================================
    const revealTargetNodes = document.querySelectorAll('.reveal-on-scroll');

    const scrollIntersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealTargetNodes.forEach(node => scrollIntersectionObserver.observe(node));

    // ==========================================================================
    // Part 4: Firebase Contact Form Handling Engine (Clear English Feedback)
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
                renderFormFeedback('Please fill out all fields before sending.', 'error');
                return;
            }

            if (!window.FirebaseEngine) {
                renderFormFeedback('Unable to connect to the database right now. Please try again.', 'error');
                return;
            }

            const submitBtn = gatewayFormElement.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending Message...</span>';

            try {
                const { getFirestore, collection, addDoc, serverTimestamp } = window.FirebaseEngine;
                const db = getFirestore();

                await addDoc(collection(db, 'messages'), {
                    name: inputSenderName,
                    email: inputSenderEmail,
                    message: inputSenderMessage,
                    timestamp: serverTimestamp()
                });

                renderFormFeedback('Thank you! Your message has been sent successfully.', 'success');
                gatewayFormElement.reset();

            } catch (runtimeError) {
                console.error("Database Write Error: ", runtimeError);
                renderFormFeedback('Failed to send message. Please check your internet connection and try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    function renderFormFeedback(message, statusType) {
        if (!feedbackStatusOutput) return;
        
        feedbackStatusOutput.textContent = message;
        feedbackStatusOutput.className = 'form-status-feedback-msg'; 
        feedbackStatusOutput.classList.add(statusType);

        setTimeout(() => {
            feedbackStatusOutput.textContent = '';
            feedbackStatusOutput.className = 'form-status-feedback-msg';
        }, 6000);
    }

    // ==========================================================================
    // Part 5: Mobile Navigation Drawer Toggle Logic
    // ==========================================================================
    const menuToggleBtn = document.getElementById('mobileMenuBtn');
    const menuLinksTray = document.getElementById('navMenuLinks');
    const internalNavLinks = document.querySelectorAll('.nav-menu-links a');

    if (menuToggleBtn && menuLinksTray) {
        const toggleMenuContext = () => {
            menuToggleBtn.classList.toggle('is-active');
            menuLinksTray.classList.toggle('is-active');
            menuToggleBtn.setAttribute('aria-expanded', menuLinksTray.classList.contains('is-active'));
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
    // Part 6: Smooth Scroll Back to Top Button
    // ==========================================================================
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('is-visible');
            } else {
                backToTopBtn.classList.remove('is-visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // Part 7: 3D Perspective Card Tilt & Interactive Glare Physics
    // ==========================================================================
    const tiltCards = document.querySelectorAll('.cert-card-3d, .showcase-card');

    tiltCards.forEach(card => {
        const glare = card.querySelector('.cert-glare');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

            if (glare) {
                glare.style.transform = `translate(${x - rect.width}px, ${y - rect.height}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            if (glare) {
                glare.style.transform = 'translate(0, 0)';
            }
        });
    });

    // ==========================================================================
    // Part 8: Scrollspy Active Link Navigation Highlighting
    // ==========================================================================
    const sections = document.querySelectorAll('section[id], header[id]');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 160;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu-links a[href*="#${sectionId}"]`);

            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLink.classList.add('is-active');
                } else {
                    navLink.classList.remove('is-active');
                }
            }
        });
    }, { passive: true });

    // ==========================================================================
    // Part 9: Mobile Horizontal Certification Auto-Swipe Loop (2.5s interval)
    // ==========================================================================
    const certGridContainer = document.querySelector('.certifications-3d-grid');
    const certCardItems = document.querySelectorAll('.cert-card-3d');

    if (certGridContainer && certCardItems.length > 0) {
        let activeCardIndex = 0;

        setInterval(() => {
            // Only auto-scroll on mobile screens (<= 768px)
            if (window.innerWidth <= 768) {
                activeCardIndex++;
                
                if (activeCardIndex >= certCardItems.length) {
                    activeCardIndex = 0;
                }

                const targetCard = certCardItems[activeCardIndex];
                certGridContainer.scrollTo({
                    left: targetCard.offsetLeft - certGridContainer.offsetLeft,
                    behavior: 'smooth'
                });
            }
        }, 2500);
    }
});
