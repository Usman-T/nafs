"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dimension, DimensionValue } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { iconMap } from "@/lib/iconMap";
import ProgressSkeleton from "./progress-skelton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface DimensionValueWithDimension extends DimensionValue {
  dimension: Dimension;
}

interface Point {
  x: number;
  y: number;
  fullX: number;
  fullY: number;
  name: string;
  color: string;
  value: number;
  description: string;
  angle: number;
}

const ProgressComponent = ({
  dimensions,
}: {
  dimensions: DimensionValueWithDimension[];
}) => {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(
    null
  );
  const [animationPhase, setAnimationPhase] = useState(0);
  const [size, setSize] = useState(400);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoading(false));
    return () => clearTimeout(timer);
  }, []);

  const center = useMemo(() => size / 2, [size]);
  const radius = useMemo(() => size * 0.4, [size]);
  const hexRadius = useMemo(() => radius * 0.8, [radius]);

  const getSize = useCallback(() => {
    return typeof window !== "undefined" && window.innerWidth < 640 ? 300 : 400;
  }, []);

  useEffect(() => {
    setSize(getSize());
    const handleResize = () => setSize(getSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSize]);

  useEffect(() => {
    setAnimationPhase(0);
    const timer = setTimeout(() => setAnimationPhase(1), 300);
    return () => clearTimeout(timer);
  }, [selectedDimension]);

  const points = useMemo(() => {
    return dimensions.map((dim, i) => {
      const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
      return {
        x: center + radius * Math.cos(angle) * dim.value,
        y: center + radius * Math.sin(angle) * dim.value,
        fullX: center + radius * Math.cos(angle),
        fullY: center + radius * Math.sin(angle),
        name: dim.dimension.name,
        color: dim.dimension.color,
        value: dim.value,
        description: dim.dimension.description,
        angle,
      };
    });
  }, [dimensions, center, radius]);

  const getPath = useCallback((pts: Point[]) => {
    return (
      pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z"
    );
  }, []);

  const overallRating = useMemo(
    () =>
      Math.round(
        (dimensions.reduce((sum, dim) => sum + dim.value, 0) /
          dimensions.length) *
          100
      ),
    [dimensions]
  );

  const selectedDimensionData = useMemo(
    () => dimensions.find((d) => d.dimension.name === selectedDimension),
    [dimensions, selectedDimension]
  );

  const targetPoint = useMemo(() => {
    if (!selectedDimension) return null;
    const index = dimensions.findIndex(
      (d) => d.dimension.name === selectedDimension
    );
    const angle = (Math.PI * 2 * index) / dimensions.length - Math.PI / 2;
    const value = dimensions[index].value;

    return {
      x: center + radius * Math.cos(angle) * value,
      y: center + radius * Math.sin(angle) * value,
      angle,
      value,
    };
  }, [selectedDimension, dimensions, center, radius]);

  const generateHexPoints = useCallback(
    (level: number) => {
      return Array.from({ length: 6 }).map((_, j) => {
        const angle = (Math.PI * 2 * j) / 6 - Math.PI / 2;
        return {
          x: center + hexRadius * level * Math.cos(angle),
          y: center + hexRadius * level * Math.sin(angle),
        };
      });
    },
    [center, hexRadius]
  );

  const handleDimensionSelect = useCallback((name: string | null) => {
    setSelectedDimension(name);
  }, []);

  if (!isMounted || isLoading) {
    return <ProgressSkeleton />;
  }

  return (
    <div className="space-y-8 p-8 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[#ebdbb2]">
                {selectedDimension
                  ? `${selectedDimension} Progress`
                  : "Spiritual Dimensions"}
              </span>
              {selectedDimension && (
                <Button
                  size="sm"
                  className="text-[#a89984] hover:text-[#ebdbb2]"
                  onClick={() => handleDimensionSelect(null)}
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Back to all dimensions
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative mb-8 w-full max-w-md mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDimension || "all"}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full flex justify-center"
                  >
                    <svg
                      width={size}
                      height={size}
                      viewBox={`0 0 ${size} ${size}`}
                      className="overflow-visible"
                    >
                      {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
                        <polygon
                          key={i}
                          points={generateHexPoints(level)
                            .map((p) => `${p.x},${p.y}`)
                            .join(" ")}
                          fill="none"
                          stroke="#3c3836"
                          strokeWidth="1"
                          opacity={0.5}
                        />
                      ))}

                      {points.map((point, i) => (
                        <line
                          key={i}
                          x1={center}
                          y1={center}
                          x2={point.fullX}
                          y2={point.fullY}
                          stroke="#3c3836"
                          strokeWidth="1"
                          opacity={
                            selectedDimension
                              ? i ===
                                dimensions.findIndex(
                                  (d) => d.dimension.name === selectedDimension
                                )
                                ? 0.8
                                : 0.3
                              : 0.5
                          }
                        />
                      ))}

                      {!selectedDimension && (
                        <motion.path
                          d={getPath(points)}
                          fill="rgba(254, 128, 25, 0.2)"
                          stroke="#fe8019"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        />
                      )}

                      {selectedDimension && targetPoint && (
                        <motion.line
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          x1={center}
                          y1={center}
                          x2={targetPoint.x}
                          y2={targetPoint.y}
                          stroke="#fe8019"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      )}

                      {!selectedDimension &&
                        points.map((point, i) => (
                          <motion.g
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                          >
                            <circle
                              cx={point.x}
                              cy={point.y}
                              fill={point.color}
                              stroke="none"
                              onClick={() => handleDimensionSelect(point.name)}
                              style={{ cursor: "pointer" }}
                            />
                          </motion.g>
                        ))}

                      {selectedDimension && targetPoint && (
                        <motion.circle
                          initial={{ cx: center, cy: center, r: 8 }}
                          animate={{
                            cx: animationPhase === 0 ? center : targetPoint.x,
                            cy: animationPhase === 0 ? center : targetPoint.y,
                            r: 8,
                          }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          fill="#fe8019"
                          stroke="#ebdbb2"
                          strokeWidth="2"
                        />
                      )}

                      {points.map((point, i) => {
                        const labelRadius = radius * 1.15;
                        const labelX =
                          center + labelRadius * Math.cos(point.angle);
                        const labelY =
                          center + labelRadius * Math.sin(point.angle);

                        return (
                          <text
                            key={i}
                            x={labelX}
                            y={labelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="14"
                            fill={
                              selectedDimension === point.name
                                ? "#fe8019"
                                : point.color
                            }
                            fontWeight={
                              selectedDimension === point.name ? "bold" : "500"
                            }
                            opacity={
                              selectedDimension
                                ? point.name === selectedDimension
                                  ? 1
                                  : 0.5
                                : 1
                            }
                            className="cursor-pointer"
                            onClick={() => handleDimensionSelect(point.name)}
                          >
                            {point.name}
                          </text>
                        );
                      })}
                    </svg>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDimension || "all"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                  >
                    {selectedDimension ? (
                      <>
                        <div className="text-lg text-[#ebdbb2]">
                          {selectedDimensionData?.dimension.name}
                        </div>
                        <div className="text-5xl font-bold text-[#fe8019]">
                          {Math.round(
                            (selectedDimensionData?.value ?? 0) * 100
                          )}
                        </div>
                        <div className="text-sm text-[#a89984] max-w-[300px] mx-auto mt-2">
                          {selectedDimensionData?.dimension.description}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-lg text-[#ebdbb2]">
                          Overall Spiritual Rating
                        </div>
                        <div className="text-5xl font-bold text-[#fe8019]">
                          {overallRating}%
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <Carousel className="gap-2 w-full">
              <CarouselContent className="w-full -ml-1">
                {dimensions.map((dim) => {
                  const IconComponent =
                    iconMap[dim.dimension.icon] || "BookOpen";
                  const isSelected = selectedDimension === dim.dimension.name;

                  return (
                    <CarouselItem
                      className="basis-1/3 sm:basis-1/5 lg:basis-1/7 pt-4 pl-1 "
                      key={dim.dimension.id}
                    >
                      <motion.div
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col items-center cursor-pointer ${
                          isSelected ? "scale-110" : ""
                        }`}
                        onClick={() =>
                          handleDimensionSelect(dim.dimension.name)
                        }
                      >
                        <div
                          className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center ${
                            isSelected
                              ? "bg-[#fe8019] text-[#1d2021]"
                              : "bg-[#3c3836]"
                          }`}
                        >
                          <IconComponent
                            className="h-4 w-4"
                            style={{
                              color: isSelected
                                ? "#1d2021"
                                : dim.dimension.color,
                            }}
                          />
                        </div>
                        <div
                          className={`text-xs mt-2 font-medium ${
                            isSelected ? "text-[#fe8019]" : "text-[#a89984]"
                          }`}
                        >
                          {dim.dimension.name}
                        </div>
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProgressComponent;
