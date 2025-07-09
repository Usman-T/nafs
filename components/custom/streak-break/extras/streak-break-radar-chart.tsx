import { DimensionValue } from "@prisma/client";
import type React from "react";

import { useState, useEffect, useRef } from "react";

const RadarChart = ({
  dimensions,
  previousValues,
  currentValues,
  animate = true,
}: {
  dimensions: any[];
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

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const size = Math.min(rect.width, rect.height);
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = size * 0.35;

    ctx.clearRect(0, 0, rect.width, rect.height);

    const sides = dimensions.length;
    const angleStep = (Math.PI * 2) / sides;

    // Draw background grid with glow
    ctx.strokeStyle = "#3c3836";
    ctx.lineWidth = 1;
    ctx.shadowColor = "#fe8019";
    ctx.shadowBlur = 2;

    for (let i = 1; i <= 5; i++) {
      const circleRadius = (radius * i) / 5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.shadowBlur = 0;

    // Draw axis lines
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      ctx.stroke();

      // Draw labels with better positioning
      const labelRadius = radius * 1.2;
      const labelX = centerX + Math.cos(angle) * labelRadius;
      const labelY = centerY + Math.sin(angle) * labelRadius;

      ctx.fillStyle = dimensions[i].color;
      ctx.font = "bold 12px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = dimensions[i].color;
      ctx.shadowBlur = 4;
      ctx.fillText(dimensions[i].name, labelX, labelY);
      ctx.shadowBlur = 0;
    }

    // Draw previous values (ghosted)
    if (Object.keys(previousValues).length > 0) {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const value = previousValues[dimensions[i].name.toLowerCase()] || 0;
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
      ctx.fillStyle = "rgba(235, 219, 178, 0.15)";
      ctx.fill();
      ctx.strokeStyle = "rgba(235, 219, 178, 0.4)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw current values with dramatic animation
    if (Object.keys(currentValues).length > 0) {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const prevValue = previousValues[dimensions[i].name.toLowerCase()] || 0;
        const currentValue =
          currentValues[dimensions[i].name.toLowerCase()] || 0;
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

      // Gradient fill
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      );
      gradient.addColorStop(0, "rgba(254, 128, 25, 0.3)");
      gradient.addColorStop(1, "rgba(251, 73, 52, 0.1)");
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = "#fe8019";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#fe8019";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw enhanced points
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const prevValue = previousValues[dimensions[i].name.toLowerCase()] || 0;
        const currentValue =
          currentValues[dimensions[i].name.toLowerCase()] || 0;
        const animatedValue =
          prevValue + (currentValue - prevValue) * animationProgress;
        const pointRadius = (radius * animatedValue) / 100;
        const x = centerX + Math.cos(angle) * pointRadius;
        const y = centerY + Math.sin(angle) * pointRadius;

        // Outer glow
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = `${dimensions[i].color}20`;
        ctx.fill();

        // Main point
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = dimensions[i].color;
        ctx.fill();
        ctx.strokeStyle = "#1d2021";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }, [dimensions, previousValues, currentValues, animationProgress]);

  useEffect(() => {
    if (!animate) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animateRadar = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const duration = 2500;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      setAnimationProgress(easeOutCubic(progress));

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
      className="w-full h-80 rounded-lg"
      style={{ width: "100%", height: "320px" }}
    />
  );
};

export default RadarChart;
