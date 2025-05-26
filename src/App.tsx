"use client";

import { useState } from "react";
import HomePage from "./Pages/home-page";
import LoadingScreen from "./Pages/loading-screen";
import BeamParticlesBackground from "./background/background";

export default function Page() {
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    window.scrollTo({ top: 0, behavior: "instant" }); // or "smooth"
    setShowLoading(false);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Particles background - always rendered */}
      <div className="fixed inset-0 z-0">
        <BeamParticlesBackground />
      </div>

      {/* Portfolio content */}
      <div
        className={`relative z-10 transition-all duration-2000 ease-out ${
          showLoading
            ? "opacity-0 blur-lg scale-95 motion-blur-y-down"
            : "opacity-100 blur-0 scale-100"
        }`}
      >
        <HomePage />
      </div>

      {/* Loading screen overlay */}
      {showLoading && (
        <LoadingScreen
          onLoadingComplete={handleLoadingComplete}
          duration={4000}
        />
      )}
    </div>
  );
}
