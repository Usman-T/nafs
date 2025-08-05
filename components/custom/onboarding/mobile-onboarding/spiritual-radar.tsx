import React from "react";

export const SpiritualRadar = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-[#fe8019] to-[#d79921] rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1d2021"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 sm:w-16 sm:h-16"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-[#ebdbb2]">
        Spiritual Radar
      </h3>
      <p className="text-sm sm:text-base text-[#ebdbb2]/70 text-center">
        Visualize your spiritual journey and growth over time.
      </p>
    </div>
  );
};
