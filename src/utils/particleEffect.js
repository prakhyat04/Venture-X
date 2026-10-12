/**
 * Interactive Gold Energy Particle Burst System
 * Spawns radiant royal gold particles at the interaction coordinates (x, y)
 * radiating outward with realistic physics, size variance, and smooth opacity falloff.
 */

export function triggerGoldParticles(event, options = {}) {
  const {
    count = 24,
    spread = 65,
    colors = ['#FFF1B8', '#F2D77A', '#E6C65C', '#C9A227', '#8F741D'],
    minSize = 3,
    maxSize = 7,
    duration = 650
  } = options;

  let x = 0;
  let y = 0;

  if (event && event.clientX !== undefined) {
    x = event.clientX;
    y = event.clientY;
  } else if (event && event.currentTarget) {
    const rect = event.currentTarget.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  } else {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
  }

  // Create or retrieve global particle overlay container
  let container = document.getElementById('gold-particles-overlay');
  if (!container) {
    container = document.createElement('div');
    container.id = 'gold-particles-overlay';
    container.className = 'particle-container';
    document.body.appendChild(container);
  }

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'gold-particle';

    const angle = Math.random() * Math.PI * 2;
    const distance = (Math.random() * 0.7 + 0.3) * spread;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;

    const size = Math.random() * (maxSize - minSize) + minSize;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const isSquareSpark = Math.random() > 0.6;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.borderRadius = isSquareSpark ? '2px' : '50%';
    particle.style.opacity = '1';
    particle.style.transition = `all ${duration}ms cubic-bezier(0.12, 0.8, 0.32, 1)`;

    container.appendChild(particle);

    // Trigger animation next frame
    requestAnimationFrame(() => {
      particle.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(${Math.random() * 0.4 + 0.3}) rotate(${Math.random() * 180}deg)`;
      particle.style.opacity = '0';
    });

    // Cleanup after animation completes
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, duration + 50);
  }
}
