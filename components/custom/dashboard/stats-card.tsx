"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const StatsCard = ({stat}) => {
  return (
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href={stat.link} className="block h-full">
              <Card className="bg-[#282828] border-[#3c3836] h-full hover:border-[#fe8019] transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[#a89984]">{stat.title}</div>
                    <div className="h-8 w-8 rounded-full bg-[#3c3836] flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#ebdbb2] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#a89984]">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
  )
}

export default StatsCard