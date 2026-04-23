// 1. Mobile Friendly Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.getElementById('hamburger-btn');
    if (navLinks && hamburger) {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    }
}

// Close menu on link click (Mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        const hamburger = document.getElementById('hamburger-btn');
        if(hamburger) hamburger.classList.remove('toggle');
    });
});

// 2. Ultra-Fast Data Display (No Animations)
function showContentImmediately() {
    // Saare cards aur hidden elements ko target karein
    const targets = document.querySelectorAll('.service-card, .about-card, .luxury-card, .card-3d, .stat-item, .reveal, .project-card-premium');
    
    targets.forEach(el => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.transform = "none";
        el.style.transition = "none";
        el.classList.add('show', 'active', 'reveal-active'); // Saari possible classes add kar di
    });
}

// 3. Smooth Scroll (Navbar height offset fix)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offset = 80; 
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetElement.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 4. Fast Counter (Optimized)
const startCounters = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const speed = 20; 
    const increment = target / speed;

    const updateCount = () => {
        if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
};

// 5. Carousel Logic (Desktop Only)
function initCarousel() {
    const track = document.querySelector('.carousel-3d-track');
    const cards = document.querySelectorAll('.card-3d');
    if (!track || cards.length === 0 || window.innerWidth < 768) return;

    const totalCards = cards.length;
    const radius = Math.round((350 / 2) / Math.tan(Math.PI / totalCards)) + 120;
    let angle = 0;
    let animId = null;
    let running = false;

    cards.forEach((card, i) => {
        const cardAngle = (360 / totalCards) * i;
        card.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px)`;
    });

    function rotate() {
        if (!running) return;
        if (window.innerWidth >= 768) {
            angle -= 0.3;
            track.style.transform = `rotateY(${angle}deg)`;
        }
        animId = requestAnimationFrame(rotate);
    }

    function startRotate() {
        if (!running && window.innerWidth >= 768) {
            running = true;
            rotate();
        }
    }

    function stopRotate() {
        running = false;
        if (animId) cancelAnimationFrame(animId);
    }

    // Stop when tab is hidden (saves battery + prevents jank)
    document.addEventListener('visibilitychange', () => {
        document.hidden ? stopRotate() : startRotate();
    });

    startRotate();
}

// 6. Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Icons
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Show content immediately to avoid "hidden data" bug
    showContentImmediately();
    
    // Counter Observer
    const stats = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(s => statObserver.observe(s));

    // Carousel
    initCarousel();
});

// Copy Email
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        const msg = document.getElementById('copy-msg');
        if(msg) {
            msg.style.display = 'inline';
            setTimeout(() => msg.style.display = 'none', 2000);
        }
    });
}



// View More functionality (Fix)
// View More Smooth Toggle
document.querySelectorAll('.view-more-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.service-card');
        const content = card.querySelector('.expandable-content');
        
        if (content) {
            // Toggle Active Class
            content.classList.toggle('active');
            

        }
    });
});





