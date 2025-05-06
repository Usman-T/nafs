"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const InteractiveRadarChart = () => {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(
    null
  );

  const dimensions = [
    {
      name: "Salah",
      value: 0.7,
      color: "#83a598",
      description: "Prayer consistency and quality",
    },
    {
      name: "Quran",
      value: 0.5,
      color: "#8ec07c",
      description: "Recitation, understanding, and memorization",
    },
    {
      name: "Charity",
      value: 0.6,
      color: "#fe8019",
      description: "Giving zakat, sadaqah, and helping others",
    },
    {
      name: "Community",
      value: 0.4,
      color: "#fabd2f",
      description: "Involvement with the Muslim ummah",
    },
    {
      name: "Dhikr",
      value: 0.8,
      color: "#d3869b",
      description: "Remembrance of Allah throughout the day",
    },
    {
      name: "Knowledge",
      value: 0.6,
      color: "#b8bb26",
      description: "Learning Islamic teachings and wisdom",
    },
    {
      name: "Character",
      value: 0.7,
      color: "#fb4934",
      description: "Developing good character in daily interactions",
    },
  ];

  const size = 280;
  const center = size / 2;
  const radius = size * 0.4;
  const hexRadius = radius * 0.8;

  // Calculate points on the chart
  const points = dimensions.map((dim, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle) * dim.value,
      y: center + radius * Math.sin(angle) * dim.value,
      fullX: center + radius * Math.cos(angle),
      fullY: center + radius * Math.sin(angle),
      name: dim.name,
      color: dim.color,
      value: dim.value,
      description: dim.description,
      angle,
    };
  });

  // Create the path for the filled area
  const path =
    points
      .map((point, i) => (i === 0 ? "M" : "L") + point.x + "," + point.y)
      .join(" ") + "Z";

  // Calculate overall rating (average of all dimension values)
  const overallRating = Math.round(
    (dimensions.reduce((sum, dim) => sum + dim.value, 0) / dimensions.length) *
      100
  );

  const handleDimensionClick = (name: string) => {
    setSelectedDimension(selectedDimension === name ? null : name);
  };

  const selectedDimensionData = dimensions.find(
    (d) => d.name === selectedDimension
  );

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className=""
        >
          {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => {
            const hexPoints = Array.from({ length: 7 }).map((_, j) => {
              const angle = (Math.PI * 2 * j) / 7 - Math.PI / 2;
              const x = center + hexRadius * level * Math.cos(angle);
              const y = center + hexRadius * level * Math.sin(angle);
              return `${x},${y}`;
            });
            return (
              <polygon
                key={i}
                points={hexPoints.join(" ")}
                fill="none"
                stroke="#3c3836"
                strokeWidth="1"
                opacity={0.5}
              />
            );
          })}

          {points.map((point, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.fullX}
              y2={point.fullY}
              stroke="#3c3836"
              strokeWidth="1"
              opacity={0.5}
            />
          ))}

          <path
            d={path}
            fill="rgba(254, 128, 25, 0.2)"
            stroke="#fe8019"
            strokeWidth="2"
          />

          {points.map((point, i) => (
            <g
              key={i}
              onClick={() => handleDimensionClick(point.name)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill={
                  selectedDimension === point.name ? "#fe8019" : point.color
                }
                stroke={selectedDimension === point.name ? "#ebdbb2" : "none"}
                strokeWidth="2"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="15"
                fill="transparent"
                className="cursor-pointer"
              />
            </g>
          ))}

          {points.map((point, i) => {
            const labelRadius = radius * 1.15;
            const labelX = center + labelRadius * Math.cos(point.angle);
            const labelY = center + labelRadius * Math.sin(point.angle);

            return (
              <text
                key={i}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill={
                  selectedDimension === point.name ? "#ebdbb2" : point.color
                }
                fontWeight={selectedDimension === point.name ? "bold" : "500"}
                onClick={() => handleDimensionClick(point.name)}
                className="cursor-pointer"
              >
                {point.name}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 text-center">
        {selectedDimension ? (
          <div className="space-y-2">
            <div className="text-sm text-[#a89984]">
              {selectedDimensionData?.name}
            </div>
            <div className="text-3xl font-bold text-[#ebdbb2]">
              {Math.round(selectedDimensionData?.value! * 100)}%
            </div>
            <div className="text-xs text-[#a89984] max-w-[220px]">
              {selectedDimensionData?.description}
            </div>
            <Button variant="link" size="sm" className="text-[#fe8019]" asChild>
              <Link href="/dashboard/progress">
                View detailed progress <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-sm text-[#a89984]">Overall Rating</div>
            <div className="text-3xl font-bold text-[#ebdbb2]">
              {overallRating}%
            </div>
            <div className="text-xs text-[#a89984]">
              Click on any dimension to see details
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveRadarChart;
