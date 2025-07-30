import './common.js';

// Aurelion Website JavaScript
// Handles only site-wide and visual effects (CSS animations, no AOS)

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
  initializeAnimations();
});

function initializeAnimations() {
  // Add starlight effect animation
  createStarlightEffect();
}

// Fade-up animation is now handled by CSS only (see _animations.scss)

// Create animated starlight background effect
function createStarlightEffect() {
  const container = document.querySelector('.aurelion-container');
  if (!container) return;
  
  // Create stars
  for (let i = 0; i < 50; i++) {
    createStar(container);
  }
}

function createStar(container) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.cssText = `
    position: absolute;
    width: 2px;
    height: 2px;
    background: #FFD700;
    border-radius: 50%;
    opacity: ${Math.random() * 0.8 + 0.2};
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    animation: twinkle ${Math.random() * 4 + 2}s infinite ease-in-out;
    pointer-events: none;
    z-index: 1;
  `;
  
  container.appendChild(star);
}

// Add CSS for star animation only (fadeUp is now in SCSS)
const starStyles = document.createElement('style');
starStyles.textContent = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  .star {
    box-shadow: 0 0 6px currentColor;
  }
`;
document.head.appendChild(starStyles);

// Smooth scrolling for navigation links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  const lightEffect = document.querySelector('.aurelion-light-effect');
  
  if (lightEffect) {
    lightEffect.style.transform = `translateY(${rate}px)`;
  }
});
