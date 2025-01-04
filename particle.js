const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

let mouse = {
    x: null,
    y: null,
    radius: 150
};

class Particle {
    constructor() {
        // Initialize particle at random position
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 3 + 1;
        this.density = (Math.random() * 30) + 1;
        // Set particle to be part of a circle
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 100 + 50; // Random radius for different sized circles
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // Calculate base position on circle
        this.baseX = canvas.width/2 + Math.cos(this.angle) * this.radius;
        this.baseY = canvas.height/2 + Math.sin(this.angle) * this.radius;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            // Repel from mouse
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            this.x -= directionX * force * this.density;
            this.y -= directionY * force * this.density;
        } else {
            // Return to circle position
            dx = this.baseX - this.x;
            dy = this.baseY - this.y;
            this.x += dx * 0.05;
            this.y += dy * 0.05;
        }

        // Rotate angle for circular motion
        this.angle += 0.01;
    }
}

const particleArray = [];

function init() {
    // Create particles that will form multiple circles
    for (let i = 0; i < 300; i++) {
        particleArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let particle of particleArray) {
        particle.draw();
        particle.update();
    }
    
    requestAnimationFrame(animate);
}

canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.x - rect.left;
    mouse.y = e.y - rect.top;
});

canvas.addEventListener('mouseleave', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animate();