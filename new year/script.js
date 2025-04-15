
        
const NEPALI_GREETING = "नयाँ वर्षको शुभकामना!";
const BIKRAM_SAMVAT_YEAR = 2081;
const BIKRAM_SAMVAT_YEAR_NEPALI = "२०८२"; // Nepali numerals
const FIREWORK_LAUNCH_INTERVAL = 800; // Launch fireworks a bit faster
const MAX_FIREWORKS = 25; // Allow a few more fireworks

// --- DOM Elements ---
const headingElement = document.getElementById('main-heading');
const yearElement = document.getElementById('year-display');
const extraMessageElement = document.getElementById('extra-message');
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');

// --- State ---
let fireworks = []; // We don't track individual rockets in this simplified version
let particles = [];
let lastFireworkLaunch = 0;

// --- Canvas Setup ---
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial size

// --- Fireworks Logic ---
const gravity = 0.05;
const friction = 0.99; // Air resistance
// Added more festive colors, including reds
const colors = ['#FFD700', '#FF6347', '#00FF7F', '#FF0000', '#FF4500', '#FF69B4', '#FFFFFF', '#ADD8E6', '#FFA500'];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Particle Class
class Particle {
    constructor(x, y, color, velocity) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.size = Math.random() * 3 + 1; // Size between 1 and 4
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.velocity.y += gravity; // Apply gravity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.015; // Fade out
        this.draw();
    }
}

// Firework (Burst) Launch Function
function launchFirework(x, y, color = 'random', particleCount = 120) { // Slightly bigger bursts
     const burstColor = color === 'random' ? getRandomColor() : color;
     const angleIncrement = (Math.PI * 2) / particleCount;

     for(let i = 0; i < particleCount; i++) {
        const speed = Math.random() * 6 + 2; // Random speed for burst (slightly faster)
        const velocity = {
            x: Math.cos(angleIncrement * i) * speed * (Math.random() * 0.8 + 0.2), // Add randomness to spread
            y: Math.sin(angleIncrement * i) * speed * (Math.random() * 0.8 + 0.2)
        };
        // Add particles if not too many already exist
        if (particles.length < 800) { // Limit total particles on screen
            particles.push(new Particle(x, y, burstColor, velocity));
        }
     }
}

// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate);

    // Clear canvas with a trail effect
    ctx.fillStyle = 'rgba(17, 24, 39, 0.1)'; // Use bg-gray-900 equivalent with low alpha
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Launch new fireworks periodically
     const now = Date.now();
     // Check only particle count, as we simplified firework tracking
     if(now - lastFireworkLaunch > FIREWORK_LAUNCH_INTERVAL && particles.length < 700) {
        const startX = Math.random() * canvas.width;
        // Launch higher up for burst effect
        const startY = Math.random() * (canvas.height / 1.8) + (canvas.height / 10); // Burst in upper half mostly
        launchFirework(startX, startY);
        lastFireworkLaunch = now;
    }


    // Update and draw particles
     particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1); // Remove faded particles
        } else {
            particle.update();
        }
    });
}

// --- Initial Setup & Start ---
document.addEventListener('DOMContentLoaded', () => {
    // Set the Greeting and Year directly
    headingElement.innerHTML = NEPALI_GREETING;
    yearElement.innerHTML = `विक्रम सम्वत् ${BIKRAM_SAMVAT_YEAR_NEPALI}`; // Using Nepali numerals

    // Start Fireworks
    animate();
     // Initial burst for immediate effect
    launchFirework(canvas.width / 2, canvas.height / 3, 'random', 200);


    // Trigger Text Animations (after a short delay for effect)
    setTimeout(() => {
        headingElement.classList.remove('opacity-0', 'scale-90');
        headingElement.classList.add('opacity-100', 'scale-100');
    }, 200); // Slightly longer delay

    setTimeout(() => {
         yearElement.classList.remove('opacity-0', 'translate-y-5');
         yearElement.classList.add('opacity-100', 'translate-y-0');
    }, 700); // Slightly later delay

     setTimeout(() => {
         extraMessageElement.classList.remove('opacity-0', 'translate-y-5');
         extraMessageElement.classList.add('opacity-100', 'translate-y-0');
    }, 1200); // Even later delay for the extra message
});
