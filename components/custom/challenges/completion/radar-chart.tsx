import { motion } from "framer-motion";

const RadarChart = ({
  dimensions,
  size = 300,
  animate = false,
  highlightDimension = null,
  showAnimation = false,
  animateDimension = null,
  interactive = false,
  onDimensionClick = null,
}: {
  dimensions: any[];
  size?: number;
  animate?: boolean;
  highlightDimension?: string | null;
  showAnimation?: boolean;
  animateDimension?: {
    name: string;
    oldValue: number;
    newValue: number;
  } | null;
  interactive?: boolean;
  onDimensionClick?: ((dimension: string) => void) | null;
}) => {
  const center = size / 2;
  const radius = size * 0.4;

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

  // Calculate animation points if needed
  const animationPoints = animateDimension
    ? dimensions.map((dim, i) => {
        const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
        const value =
          dim.name === animateDimension.name
            ? animateDimension.oldValue
            : dim.value;
        return {
          x: center + radius * Math.cos(angle) * value,
          y: center + radius * Math.sin(angle) * value,
        };
      })
    : [];

  const animationPath =
    animationPoints.length > 0
      ? animationPoints
          .map((point, i) => (i === 0 ? "M" : "L") + point.x + "," + point.y)
          .join(" ") + "Z"
      : "";

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Background circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
          <motion.circle
            key={i}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke="#3c3836"
            strokeWidth="1"
            opacity={0.3}
            initial={animate ? { scale: 0, opacity: 0 } : {}}
            animate={animate ? { scale: 1, opacity: 0.3 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}

        {/* Axis lines */}
        {points.map((point, i) => (
          <motion.line
            key={i}
            x1={center}
            y1={center}
            x2={point.fullX}
            y2={point.fullY}
            stroke="#3c3836"
            strokeWidth="1"
            opacity={0.5}
            initial={animate ? { pathLength: 0, opacity: 0 } : {}}
            animate={animate ? { pathLength: 1, opacity: 0.5 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
          />
        ))}

        {/* Filled area with animation */}
        {animate ? (
          <motion.path
            d={path}
            fill="rgba(254, 128, 25, 0.2)"
            stroke="#fe8019"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          />
        ) : showAnimation && animateDimension ? (
          <>
            <path
              d={animationPath}
              fill="rgba(254, 128, 25, 0.1)"
              stroke="#fe8019"
              strokeWidth="1"
              opacity={0.5}
            />
            <motion.path
              d={path}
              fill="rgba(254, 128, 25, 0.2)"
              stroke="#fe8019"
              strokeWidth="2"
              initial={{ d: animationPath }}
              animate={{ d: path }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </>
        ) : (
          <path
            d={path}
            fill="rgba(254, 128, 25, 0.2)"
            stroke="#fe8019"
            strokeWidth="2"
          />
        )}

        {/* Data points */}
        {points.map((point, i) => {
          const isHighlighted =
            highlightDimension === point.name ||
            animateDimension?.name === point.name;

          return (
            <g
              key={i}
              onClick={() =>
                interactive && onDimensionClick && onDimensionClick(point.name)
              }
              style={interactive ? { cursor: "pointer" } : {}}
            >
              {animateDimension?.name === point.name && (
                <motion.circle
                  cx={
                    center +
                    radius * Math.cos(point.angle) * animateDimension.oldValue
                  }
                  cy={
                    center +
                    radius * Math.sin(point.angle) * animateDimension.oldValue
                  }
                  r="6"
                  fill={point.color}
                  opacity={0.5}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              )}

              {animateDimension?.name === point.name ? (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill={point.color}
                  stroke={isHighlighted ? "#ebdbb2" : "none"}
                  strokeWidth="2"
                  initial={{
                    cx:
                      center +
                      radius *
                        Math.cos(point.angle) *
                        animateDimension.oldValue,
                    cy:
                      center +
                      radius *
                        Math.sin(point.angle) *
                        animateDimension.oldValue,
                    scale: 1,
                  }}
                  animate={{
                    cx: point.x,
                    cy: point.y,
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    scale: {
                      duration: 0.4,
                      times: [0, 0.6, 1],
                      delay: 0.8,
                    },
                  }}
                />
              ) : (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill={isHighlighted ? "#fe8019" : point.color}
                  stroke={isHighlighted ? "#ebdbb2" : "none"}
                  strokeWidth="2"
                  initial={animate ? { scale: 0 } : {}}
                  animate={animate ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: animate ? 1 + i * 0.05 : 0,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                />
              )}

              {/* Pulse animation for highlighted dimension */}
              {isHighlighted && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="transparent"
                  stroke="#fe8019"
                  strokeWidth="2"
                  initial={{ r: 6, opacity: 0.8 }}
                  animate={{ r: 15, opacity: 0 }}
                  transition={{
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeOut",
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Labels */}
        {points.map((point, i) => {
          const labelRadius = radius * 1.15;
          const labelX = center + labelRadius * Math.cos(point.angle);
          const labelY = center + labelRadius * Math.sin(point.angle);
          const isHighlighted =
            highlightDimension === point.name ||
            animateDimension?.name === point.name;

          return (
            <motion.text
              key={i}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill={isHighlighted ? "#ebdbb2" : point.color}
              fontWeight={isHighlighted ? "bold" : "500"}
              initial={animate ? { opacity: 0 } : {}}
              animate={animate ? { opacity: 1 } : {}}
              transition={{
                duration: 0.3,
                delay: animate ? 1.2 + i * 0.05 : 0,
              }}
              onClick={() =>
                interactive && onDimensionClick && onDimensionClick(point.name)
              }
              style={interactive ? { cursor: "pointer" } : {}}
            >
              {point.name}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
};

export default RadarChart;
