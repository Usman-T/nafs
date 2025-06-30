import { useEffect } from "react";
import confetti from "canvas-confetti";

export const useConfettiEffect = (step: number) => {
  useEffect(() => {
    if (step === 0) {
      // First burst
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { x: 0.5, y: 0.5 },
        colors: [
          "#fe8019", "#fabd2f", "#b8bb26", "#8ec07c", 
          "#83a598", "#d3869b", "#fb4934"
        ],
        gravity: 0.8,
        scalar: 1.2,
        shapes: ["circle", "square"],
        ticks: 200,
      });

      // Second burst after a delay
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { x: 0.5, y: 0.5 },
          colors: ["#fe8019", "#fabd2f"],
          gravity: 0.6,
          scalar: 1.5,
          shapes: ["circle"],
        });
      }, 500);
    }
  }, [step]);
};