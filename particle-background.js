'use strict';

/**
 * Particle network background for the hero section.
 * Adjust the values in the `settings` object to tweak the behaviour.
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
        return;
    }

    const context = canvas.getContext('2d');
    const hostSection = canvas.parentElement;

    if (!hostSection) {
        return;
    }

    const settings = {
        // Node colour can be changed here
        nodeColor: '#ffffff',
        connectionColor: '255, 255, 255',
        connectionBaseOpacity: 0.25,
        connectionDistance: 150,
        particleSize: 2.4,
        maxVelocity: 0.28,
        baseDensity: 9000,
        minParticles: 60,
        maxParticles: 140
    };

    let width = 0;
    let height = 0;
    let particles = [];

    class Particle {
        constructor(x, y) {
            this.x = typeof x === 'number' ? x : Math.random() * width;
            this.y = typeof y === 'number' ? y : Math.random() * height;
            this.setVelocity();
        }

        setVelocity() {
            const angle = Math.random() * Math.PI * 2;
            const minSpeed = settings.maxVelocity * 0.35;
            const speed = minSpeed + Math.random() * (settings.maxVelocity - minSpeed);

            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x <= 0 || this.x >= width) {
                this.vx *= -1;
                this.x = Math.min(Math.max(this.x, 0), width);
            }

            if (this.y <= 0 || this.y >= height) {
                this.vy *= -1;
                this.y = Math.min(Math.max(this.y, 0), height);
            }
        }

        draw() {
            context.beginPath();
            context.arc(this.x, this.y, settings.particleSize, 0, Math.PI * 2);
            context.fillStyle = settings.nodeColor;
            context.fill();
        }
    }

    function adjustParticleCount() {
        if (!width || !height) {
            return;
        }

        const area = width * height;
        const target = Math.max(
            settings.minParticles,
            Math.min(settings.maxParticles, Math.floor(area / settings.baseDensity))
        );

        if (particles.length > target) {
            particles = particles.slice(0, target);
        } else {
            for (let i = particles.length; i < target; i += 1) {
                particles.push(new Particle());
            }
        }
    }

    function drawConnections() {
        const limit = settings.connectionDistance;
        const limitSquared = limit * limit;
        context.lineWidth = 1;

        for (let i = 0; i < particles.length; i += 1) {
            const particleA = particles[i];

            for (let j = i + 1; j < particles.length; j += 1) {
                const particleB = particles[j];
                const dx = particleA.x - particleB.x;
                const dy = particleA.y - particleB.y;
                const distanceSquared = dx * dx + dy * dy;

                if (distanceSquared > limitSquared) {
                    continue;
                }

                const distance = Math.sqrt(distanceSquared);
                const alpha = 1 - distance / limit;
                const opacity = settings.connectionBaseOpacity * alpha;

                if (opacity <= 0) {
                    continue;
                }

                context.beginPath();
                context.moveTo(particleA.x, particleA.y);
                context.lineTo(particleB.x, particleB.y);
                context.strokeStyle = `rgba(${settings.connectionColor}, ${opacity})`;
                context.stroke();
            }
        }
    }

    function resizeCanvas() {
        const previousWidth = width;
        const previousHeight = height;

        width = hostSection.offsetWidth;
        height = hostSection.offsetHeight;

        if (!width || !height) {
            return;
        }

        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(devicePixelRatio, devicePixelRatio);

        if (previousWidth && previousHeight) {
            const scaleX = width / previousWidth;
            const scaleY = height / previousHeight;

            particles.forEach(particle => {
                particle.x *= scaleX;
                particle.y *= scaleY;
            });
        }

        adjustParticleCount();
    }

    function animate() {
        if (!width || !height) {
            requestAnimationFrame(animate);
            return;
        }

        context.clearRect(0, 0, width, height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        requestAnimationFrame(animate);
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 150);
    });

    resizeCanvas();
    animate();
});
