import { Dimension } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

const RadarChart = ({
  dimensions,
  previousValues,
  currentValues,
  animate = true,
}: {
  dimensions: Dimension[];
  previousValues: Record<string, number>;
  currentValues: Record<string, number>;
  animate?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationProgress, setAnimationProgress] = useState(animate ? 0 : 1);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;

    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = "#1d2021";
    ctx.fillRect(0, 0, size, size);

    const sides = dimensions.length;
    const angleStep = (Math.PI * 2) / sides;

    ctx.strokeStyle = "#3c3836";
    ctx.lineWidth = 1;

    for (let i = 1; i <= 5; i++) {
      const circleRadius = (radius * i) / 5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      ctx.stroke();

      const labelRadius = radius * 1.15;
      const labelX = centerX + Math.cos(angle) * labelRadius;
      const labelY = centerY + Math.sin(angle) * labelRadius;
      ctx.fillStyle = dimensions[i].color;
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(dimensions[i].name, labelX, labelY);
    }

    if (Object.keys(previousValues).length > 0) {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const value = previousValues[dimensions[i].id.toLowerCase()] || 0;
        const pointRadius = (radius * value) / 100;
        const x = centerX + Math.cos(angle) * pointRadius;
        const y = centerY + Math.sin(angle) * pointRadius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(254, 128, 25, 0.1)";
      ctx.fill();
      ctx.strokeStyle = "rgba(254, 128, 25, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    if (Object.keys(currentValues).length > 0) {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const prevValue = previousValues[dimensions[i].id.toLowerCase()] || 0;
        const currentValue = currentValues[dimensions[i].id.toLowerCase()] || 0;
        const animatedValue =
          prevValue + (currentValue - prevValue) * animationProgress;
        const pointRadius = (radius * animatedValue) / 100;
        const x = centerX + Math.cos(angle) * pointRadius;
        const y = centerY + Math.sin(angle) * pointRadius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(254, 128, 25, 0.3)";
      ctx.fill();
      ctx.strokeStyle = "#fe8019";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [dimensions, previousValues, currentValues, animationProgress]);

  useEffect(() => {
    if (!animate) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animateRadar = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const duration = 1500;
      const progress = Math.min(elapsed / duration, 1);

      setAnimationProgress(progress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateRadar);
      }
    };

    animationFrame = requestAnimationFrame(animateRadar);

    return () => cancelAnimationFrame(animationFrame);
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="w-full max-w-[300px] h-auto mx-auto"
    ></canvas>
  );
};

export default RadarChart;
