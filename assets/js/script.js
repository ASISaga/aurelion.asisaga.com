// Aurelion Website JavaScript
// Handles poem modal display and interactions

// Poem content data will be loaded from external JSON files
const poemData = {};

// Load all poem data from external JSON files
function loadPoemData(callback) {
  fetch('assets/poems/poem-list.json')
    .then(response => response.json())
    .then(poemKeys => {
      let loaded = 0;
      poemKeys.forEach(key => {
        fetch(`assets/poems/${key}.json`)
          .then(response => response.json())
          .then(data => {
            poemData[key] = data;
            loaded++;
            if (loaded === poemKeys.length && typeof callback === 'function') {
              callback();
            }
          });
      });
    });
}

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
  loadPoemData(function() {
    initializePoemCards();
    initializeAnimations();
  });
});

// Initialize poem card click handlers
function initializePoemCards() {
  const poemCards = document.querySelectorAll('.poem-card, .individual-poem-card');
  const modal = document.getElementById('poemModal');
  const modalTitle = document.getElementById('poemModalLabel');
  const modalContent = document.getElementById('poemContent');

  if (!modal || !modalTitle || !modalContent) {
    console.warn('Poem modal elements not found');
    return;
  }

  poemCards.forEach(card => {
    card.addEventListener('click', function() {
      const poemKey = this.getAttribute('data-poem');
      const poem = poemData[poemKey];

      if (poem) {
        modalTitle.textContent = poem.title;
        modalContent.innerHTML = `<h1>${poem.title}</h1>\n\n${poem.content}`;

        // Show modal using Bootstrap
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
      }
    });
  });
}

// Initialize scroll animations
function initializeAnimations() {
  // Initialize AOS (Animate On Scroll) if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }
  
  // Add starlight effect animation
  createStarlightEffect();
}

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

// Add CSS for star animation
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
