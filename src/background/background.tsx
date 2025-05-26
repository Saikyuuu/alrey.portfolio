"use client";

import { useEffect, useRef } from "react";

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
    }> = [];

    // Create particles
    const createParticle = () => {
      const isMobile = window.innerWidth < 768;
      const speedFactor = isMobile ? 0.2 : 0.5; // slower speed on mobile

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speedFactor,
        vy: (Math.random() - 0.5) * speedFactor,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        life: Math.random() * 200 + 100,
      };
    };

    // Determine number of particles based on screen size
    const particleCount = window.innerWidth < 768 ? 40 : 100;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = "#60a5fa";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Reset particle if life is over
        if (particle.life <= 0) {
          particles[index] = createParticle();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Canvas for particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Animated light beams */}
      <div className="absolute inset-0">
        {/* Beam 1 */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent transform -skew-x-12 animate-beam-1" />

        {/* Beam 2 */}
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent transform skew-x-12 animate-beam-2" />

        {/* Beam 3 */}
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent transform -skew-x-6 animate-beam-3" />

        {/* Beam 4 */}
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent transform skew-x-6 animate-beam-4" />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/50 rounded-full animate-float-1 blur-sm" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400/50 rounded-full animate-float-2 blur-sm" />
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-cyan-400/50 rounded-full animate-float-3 blur-sm" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-indigo-400/50 rounded-full animate-float-4 blur-sm" />
        <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-blue-300/50 rounded-full animate-float-5 blur-sm" />
        <div className="absolute top-2/3 right-1/6 w-4 h-4 bg-purple-300/50 rounded-full animate-float-6 blur-sm" />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />

      {/* Content area */}
    </div>
  );
}
