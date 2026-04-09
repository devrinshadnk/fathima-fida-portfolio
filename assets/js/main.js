/* ============================================
   FATHIMA FIDA M — Portfolio Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Loader ----------
    const loader = document.getElementById('loader');
    const loaderProgress = document.getElementById('loader-progress');
    let progress = 0;

    const loadInterval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
                initAnimations();
            }, 400);
        }
        loaderProgress.style.width = progress + '%';
    }, 200);

    document.body.style.overflow = 'hidden';

    // ---------- Custom Cursor ----------
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX - 4 + 'px';
            cursor.style.top = mouseY - 4 + 'px';
        });

        function updateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            cursorFollower.style.left = followerX - 18 + 'px';
            cursorFollower.style.top = followerY - 18 + 'px';
            requestAnimationFrame(updateFollower);
        }
        updateFollower();

        // Hover effects on interactive elements
        const hoverElements = document.querySelectorAll('a, button, .project-card, .tool-tag');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorFollower.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovering'));
        });
    }

    // ---------- Navigation ----------
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Scroll detection for nav background
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;

        // Update active nav link based on scroll position
        updateActiveNav();
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link update
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- GSAP Animations ----------
    function initAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            // Fallback: simple CSS animations if GSAP isn't loaded
            initFallbackAnimations();
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Hero animations
        const heroTimeline = gsap.timeline({ delay: 0.2 });

        heroTimeline
            .to('.hero-tag', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            })
            .to('.hero-word', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            }, '-=0.3')
            .to('.hero-description', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.4')
            .to('.hero-cta', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            .to('.scroll-indicator', {
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.2');

        // Section reveals
        gsap.utils.toArray('.section-header, .about-content, .about-image').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // Project cards
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 60,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Process steps
        gsap.utils.toArray('.process-step').forEach((step, i) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 0.6,
                delay: i * 0.15,
                ease: 'power3.out'
            });
        });

        // Contact section
        gsap.from('.contact-left', {
            scrollTrigger: {
                trigger: '.contact-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -40,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('.contact-right', {
            scrollTrigger: {
                trigger: '.contact-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: 40,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Counter animation
        gsap.utils.toArray('.stat-number').forEach(el => {
            const target = parseInt(el.getAttribute('data-count'));
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                textContent: 0,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                    el.textContent = Math.ceil(parseFloat(el.textContent));
                },
                onComplete: function() {
                    el.textContent = target;
                }
            });
        });

        // Parallax orbs
        gsap.to('.orb-1', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: -150,
            ease: 'none'
        });

        gsap.to('.orb-2', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: -100,
            ease: 'none'
        });
    }

    // Fallback for non-GSAP browsers
    function initFallbackAnimations() {
        // Animate hero elements
        document.querySelector('.hero-tag').style.cssText = 'opacity:1;transform:translateY(0);transition:all 0.6s ease 0.2s';
        document.querySelectorAll('.hero-word').forEach((word, i) => {
            word.style.cssText = `opacity:1;transform:translateY(0);transition:all 0.8s ease ${0.3 + i * 0.1}s`;
        });
        document.querySelector('.hero-description').style.cssText = 'opacity:1;transform:translateY(0);transition:all 0.6s ease 0.8s';
        document.querySelector('.hero-cta').style.cssText = 'opacity:1;transform:translateY(0);transition:all 0.6s ease 1s';

        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.cssText = 'opacity:1;transition:opacity 0.6s ease 1.2s';
        }

        // Intersection Observer for scroll reveals
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-header, .project-card, .process-step, .about-content, .about-image, .contact-left, .contact-right').forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });

        // Counter animation fallback
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 60;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target;
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.ceil(current);
                        }
                    }, 30);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(el => {
            counterObserver.observe(el);
        });
    }

    // ---------- Mobile-Specific Animations ----------
    function initMobileAnimations() {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) return;

        const mobileObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animType = el.dataset.mobileAnim || 'fade-up';
                    const delay = el.dataset.mobileDelay || 0;

                    setTimeout(() => {
                        el.classList.add('active');
                    }, delay * 1000);

                    mobileObserver.unobserve(el);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        // Add mobile-specific animation classes
        document.querySelectorAll('.experience-item').forEach((el, i) => {
            el.classList.add('slide-in-left');
            el.dataset.mobileDelay = i * 0.12;
            mobileObserver.observe(el);
        });

        document.querySelectorAll('.stat').forEach((el, i) => {
            el.classList.add('scale-in');
            el.dataset.mobileDelay = i * 0.1;
            mobileObserver.observe(el);
        });

        document.querySelectorAll('.process-step').forEach((el, i) => {
            el.classList.add('slide-in-left');
            el.dataset.mobileDelay = i * 0.15;
            mobileObserver.observe(el);
        });

        document.querySelectorAll('.contact-link').forEach((el, i) => {
            el.classList.add('fade-up-mobile');
            el.dataset.mobileDelay = i * 0.08;
            mobileObserver.observe(el);
        });

        // Mobile project cards — staggered fade-in
        const mobileProjects = document.querySelectorAll('.mobile-project');
        if (mobileProjects.length) {
            const projectObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.mobile-project');
                        cards.forEach((card, i) => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, i * 80);
                        });
                        projectObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            const workMobile = document.querySelector('.work-mobile');
            if (workMobile) {
                projectObserver.observe(workMobile);
            }
        }

        // Add stagger class to grids
        const staggerContainers = document.querySelectorAll('.tools-grid, .about-stats');
        staggerContainers.forEach(container => {
            container.classList.add('mobile-stagger');
            const staggerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        staggerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            staggerObserver.observe(container);
        });

        // Horizontal scroll snap indicator for work section
        const workGrid = document.querySelector('.work-grid');
        if (workGrid) {
            let isDown = false;
            let startX;
            let scrollLeft;

            workGrid.addEventListener('touchstart', () => {
                workGrid.style.scrollBehavior = 'auto';
            });

            workGrid.addEventListener('touchend', () => {
                workGrid.style.scrollBehavior = 'smooth';
            });
        }
    }

    // Call mobile animations after main init
    setTimeout(initMobileAnimations, 100);

    // ---------- Initialize Lucide Icons ----------
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
