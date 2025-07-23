import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { iconMap } from "@/lib/iconMap";

const InteractiveRadarDemo = ({ isActive }: { isActive: boolean }) => {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(
    null
  );
  const [userInteracted, setUserInteracted] = useState(false);

  const dimensions = [
    {
      name: "Knowledge",
      description: "Learning for the soul",
      color: "#FFD300",
      icon: "BookOpen",
      value: 0.7,
    },
    {
      name: "Body",
      description: "The amana of your health",
      color: "#00BFFF",
      icon: "Dumbbell",
      value: 0.6,
    },
    {
      name: "Purpose",
      description: "Ambition for the akhira",
      color: "#B026FF",
      icon: "Target",
      value: 0.5,
    },
    {
      name: "Faith",
      description: "Iman in practice",
      color: "#00FFFF",
      icon: "Sparkles",
      value: 0.8,
    },
    {
      name: "Character",
      description: "The Sunnah in action",
      color: "#39FF14",
      icon: "HeartHandshake",
      value: 0.7,
    },
    {
      name: "Discipline",
      description: "Mastering the self",
      color: "#FF073A",
      icon: "AlarmClock",
      value: 0.6,
    },
    {
      name: "Remembrance",
      description: "Inner connection to Allah",
      color: "#FF6EC7",
      icon: "Brain",
      value: 0.9,
    },
  ];

  const size = 240;
  const center = size / 2;
  const radius = size * 0.35;

  const points = dimensions.map((dim, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
    const animatedValue = dim.value;

    return {
      x: center + radius * Math.cos(angle) * animatedValue,
      y: center + radius * Math.sin(angle) * animatedValue,
      fullX: center + radius * Math.cos(angle),
      fullY: center + radius * Math.sin(angle),
      ...dim,
      angle,
    };
  });

  const path =
    points
      .map((point, i) => (i === 0 ? "M" : "L") + point.x + "," + point.y)
      .join(" ") + "Z";

  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <svg width={size} height={size} className="mx-auto">
          {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
            <polygon
              key={i}
              points={Array.from({ length: dimensions.length })
                .map((_, j) => {
                  const angle =
                    (Math.PI * 2 * j) / dimensions.length - Math.PI / 2;
                  const x = center + radius * level * Math.cos(angle);
                  const y = center + radius * level * Math.sin(angle);
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="#3c3836"
              strokeWidth="1"
              opacity={0.3}
            />
          ))}

          {/* Axis lines */}
          {points.map((point, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.fullX}
              y2={point.fullY}
              stroke="#3c3836"
              strokeWidth="1"
              opacity={0.3}
            />
          ))}

          {/* Filled area */}
          <path
            d={path}
            fill="rgba(254, 128, 25, 0.2)"
            stroke="#fe8019"
            strokeWidth="2"
          />

          {/* Interactive points with icons */}
          {points.map((point, i) => {
            return (
              <motion.g key={i}>
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedDimension(
                      selectedDimension === point.name ? null : point.name
                    );
                    setUserInteracted(true);
                  }}
                  style={{ cursor: "pointer" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: isActive ? 1 : 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.3,
                    type: "spring",
                  }}
                />
                <motion.text
                  x={point.fullX}
                  y={point.fullY + (point.fullY > center ? 20 : -15)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fill={point.color}
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedDimension(
                      selectedDimension === point.name ? null : point.name
                    );
                    setUserInteracted(true);
                  }}
                >
                  {point.name}
                </motion.text>
              </motion.g>
            );
          })}
        </svg>
      </motion.div>

      <AnimatePresence>
        {selectedDimension && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mt-6 bg-[#1d2021] rounded-lg p-4 border border-[#3c3836] max-w-xs mx-auto"
          >
            <div className="flex justify-center mb-3">
              <div className="relative">
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200`}
                  style={{
                    backgroundColor: dimensions.find(
                      (d) => d.name === selectedDimension
                    )?.color,
                  }}
                >
                  {(() => {
                    const dim = dimensions.find(
                      (d) => d.name === selectedDimension
                    );
                    const IconComponent = iconMap[dim?.icon || ""] || Check;
                    return <IconComponent className="h-6 w-6 text-[#1d2021]" />;
                  })()}
                </motion.div>
              </div>
            </div>
            <div className="text-[#fe8019] font-bold text-lg mb-1">
              {selectedDimension}
            </div>
            <div className="text-sm text-[#a89984] mb-3">
              {
                dimensions.find((d) => d.name === selectedDimension)
                  ?.description
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedDimension && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          className="text-center mt-4"
        >
          <div className="text-[#fe8019] font-medium">
            Track Your Spiritual Growth
          </div>
          <div className="text-xs text-[#a89984] mt-1">
            Tap any dimension to explore
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveRadarDemo;
