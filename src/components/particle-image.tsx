import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  color: string;
  opacity: number;
}

const ParticleImage = ({ imageSrc }: { imageSrc: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const particles: Particle[] = [];

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < img.height; y += 2) {
        for (let x = 0; x < img.width; x += 2) {
          const i = (y * img.width + x) * 4;
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const a = imageData.data[i + 3];

          if (a > 128) {
            particles.push({
              x: Math.random() * img.width,
              y: Math.random() * img.height,
              tx: x,
              ty: y,
              color: `rgb(${r},${g},${b})`,
              opacity: 0,
            });
          }
        }
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Slower movement
          p.x += dx * 0.1;
          p.y += dy * 0.1;

          // Opacity increase based on distance
          const maxDistance = 100;
          const fadeFactor = 1 - Math.min(distance / maxDistance, 1);
          p.opacity = Math.min(p.opacity + fadeFactor * 0.05, 1);

          // Extract RGB and apply opacity
          const rgb = p.color.match(/\d+/g)?.join(",") ?? "255,255,255";
          ctx.fillStyle = `rgba(${rgb}, ${p.opacity.toFixed(2)})`;
          ctx.fillRect(p.x, p.y, 1, 1); // smaller particle = more detail
        }

        requestAnimationFrame(animate);
      };

      // Delay animation start by 5 seconds
      setTimeout(() => {
        animate();
      }, 7000);
    };
  }, [imageSrc]);

  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <canvas ref={canvasRef} className="block w-[1000px] h-auto max-w-full" />
    </div>
  );
};

export default ParticleImage;
