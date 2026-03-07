// Initialize Lucide Icons
lucide.createIcons();

// Simple Hover Sound effect (Optional - adds premium feel)
const cards = document.querySelectorAll('.work-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Aap yahan hover logic dal sakte hain
    });
});
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}