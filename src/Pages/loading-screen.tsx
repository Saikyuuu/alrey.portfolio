"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

export default function LoadingScreen({
  onLoadingComplete,
  duration = 4000,
}: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll after unmount
      document.body.style.overflow = "";
    };
  }, []);

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
      const speedFactor = isMobile ? 0.5 : 0.5; // slower speed on mobile

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

  // Loading progress simulation
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setIsComplete(true);
        clearInterval(interval);
        setTimeout(() => {
          onLoadingComplete?.();
        }, 2500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onLoadingComplete]);

  // Loading text animation
  useEffect(() => {
    const texts = ["Loading", "Loading.", "Loading..", "Loading..."];
    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(texts[index]);
      index = (index + 1) % texts.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Calculate blur amount based on completion state
  const blurAmount = isComplete ? 20 : 0;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-2000 ease-out ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
      }}
    >
      <div className="relative w-full h-screen bg-black overflow-hidden">
        {/* Canvas for particles */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Animated light beams with motion blur */}
        <div className="absolute inset-0">
          {/* Beam 1 */}
          <div
            className={`absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent transform -skew-x-12 animate-beam-1 transition-all duration-2000 ${
              isComplete ? "motion-blur-x-right" : ""
            }`}
          />

          {/* Beam 2 */}
          <div
            className={`absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent transform skew-x-12 animate-beam-2 transition-all duration-2000 ${
              isComplete ? "motion-blur-x-left" : ""
            }`}
          />

          {/* Beam 3 */}
          <div
            className={`absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent transform -skew-x-6 animate-beam-3 transition-all duration-2000 ${
              isComplete ? "motion-blur-x-right" : ""
            }`}
          />

          {/* Beam 4 */}
          <div
            className={`absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent transform skew-x-6 animate-beam-4 transition-all duration-2000 ${
              isComplete ? "motion-blur-x-left" : ""
            }`}
          />
        </div>

        {/* Floating orbs with motion blur */}
        <div className="absolute inset-0">
          <div
            className={`absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/50 rounded-full animate-float-1 blur-sm transition-all duration-2000 ${
              isComplete ? "motion-blur-diagonal-up" : ""
            }`}
          />
          <div
            className={`absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400/50 rounded-full animate-float-2 blur-sm transition-all duration-2000 ${
              isComplete ? "motion-blur-diagonal-down" : ""
            }`}
          />
          <div
            className={`absolute bottom-1/4 left-1/3 w-5 h-5 bg-cyan-400/50 rounded-full animate-float-3 blur-sm transition-all duration-2000 ${
              isComplete ? "motion-blur-y-up" : ""
            }`}
          />
          <div
            className={`absolute bottom-1/3 right-1/3 w-2 h-2 bg-indigo-400/50 rounded-full animate-float-4 blur-sm transition-all duration-2000 ${
              isComplete ? "motion-blur-y-down" : ""
            }`}
          />
          <div
            className={`absolute top-1/2 left-1/6 w-3 h-3 bg-blue-300/50 rounded-full animate-float-5 blur-sm transition-all duration-2000 ${
              isComplete ? "motion-blur-x-right" : ""
            }`}
          />
          <div
            className={`absolute top-2/3 right-1/6 w-4 h-4 bg-purple-300/50 rounded-full animate-float-6 blur-sm transition-all duration-2000 ${
              isComplete ? "motion-blur-x-left" : ""
            }`}
          />
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />

        {/* Loading UI with motion blur */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center h-full transition-all duration-2000 ease-out ${
            isComplete
              ? "blur-sm scale-110 motion-blur-y-up"
              : "blur-0 scale-100"
          }`}
        >
          {/* Main loading circle */}
          <div className="relative mb-8">
            {/* Background circle */}
            <div className="w-32 h-32 rounded-full border-4 border-gray-700/50"></div>

            {/* Progress circle */}
            <svg
              className="absolute inset-0 w-32 h-32 transform -rotate-90"
              viewBox="0 0 128 128"
            >
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 60}`}
                strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
                className="transition-all duration-300 ease-out"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Loading text */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              {loadingText}
            </h1>
            <p className="text-gray-400 text-lg">
              Preparing your experience...
            </p>
          </div>

          {/* Loading bar */}
          <div className="w-80 h-1 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Loading dots */}
          <div className="flex space-x-2 mt-8">
            <div
              className="w-3 h-3 bg-blue-400/70 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-3 h-3 bg-purple-400/70 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-3 h-3 bg-cyan-400/70 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
