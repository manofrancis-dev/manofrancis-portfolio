document.addEventListener('DOMContentLoaded', () => {

    const isMobileDevice = window.innerWidth <= 768 || 'ontouchstart' in window;

    // ==========================================================================
    // Part A: Interactive Glow Aura Engine (Optimized for Mobile Performance)
    // ==========================================================================
    const glowOrbElement = document.getElementById('heroGlowOrb');

    if (glowOrbElement && !isMobileDevice) {
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
        threshold: isMobileDevice ? 0.05 : 0.12, // Faster triggers on mobile scroll
        rootMargin: '0px 0px -20px 0px'
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
                renderFormFeedback('All fields are required.', 'error');
                return;
            }

            if (!window.FirebaseEngine) {
                renderFormFeedback('System Error: Database connection layer missing.', 'error');
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

                renderFormFeedback('Transmission successful! Message sent.', 'success');
                gatewayFormElement.reset();

            } catch (runtimeError) {
                console.error("Database Error: ", runtimeError);
                renderFormFeedback('Data transmission rejected. Try again.', 'error');
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
        }, 5000);
    }

    // ==========================================================================
    // Part D: Mobile Drawer Navigation Logic (Body Lock + Smooth Toggle)
    // ==========================================================================
    const menuToggleBtn = document.getElementById('mobileMenuBtn');
    const menuLinksTray = document.getElementById('navMenuLinks');
    const internalNavLinks = document.querySelectorAll('.nav-menu-links a');

    if (menuToggleBtn && menuLinksTray) {
        const toggleMenuContext = () => {
            const isActive = menuLinksTray.classList.toggle('is-active');
            menuToggleBtn.classList.toggle('is-active');
            document.body.style.overflow = isActive ? 'hidden' : ''; // Prevent body background scrolling when drawer is open
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
    // Part E: Top-to-Bottom Window Scrolling Engine
    // ==========================================================================
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
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
    // Part F: Dynamic 3D Card Interactive Tilt (Disabled on Mobile for Speed)
    // ==========================================================================
    const certCards = document.querySelectorAll('.cert-card-3d');

    if (!isMobileDevice) {
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
    }

    // ==========================================================================
    // Part G: Scrollspy Navigation
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
    }, { passive: true });
});
