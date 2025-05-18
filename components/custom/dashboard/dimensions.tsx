"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveRadarChart from "@/components/custom/dashboard/radar-chart";
import { Dimension, DimensionValue } from "@prisma/client";

interface DimensionValueWithDimension extends DimensionValue {
  dimension: Dimension;
}

const Dimensions = ({
  dimensions,
}: {
  dimensions: DimensionValueWithDimension[];
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="col-span-1"
    >
      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-[#ebdbb2]">Spiritual Dimensions</span>
            <Link
              href="/dashboard/progress"
              className="text-[#fe8019] text-sm hover:underline"
            >
              View all
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InteractiveRadarChart dimensions={dimensions} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Dimensions;
