"use client"

import React from 'react'
import { motion } from "framer-motion";
import {
  Award,
  Check
} from "lucide-react";

const OnboardingWelcome = () => {
  return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto h-16 w-16 rounded-full bg-[#fe8019] flex items-center justify-center mb-4"
              >
                <Award className="h-8 w-8 text-[#1d2021]" />
              </motion.div>
              <h2 className="text-2xl font-bold text-[#ebdbb2]">
                Welcome to Nafs
              </h2>
              <p className="text-[#a89984]">
                Let&apos;s start your spiritual growth journey with a challenge
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start"
              >
                <div className="h-6 w-6 rounded-full bg-[#fe8019] flex items-center justify-center mr-3 flex-shrink-0">
                  <Check className="h-3 w-3 text-[#1d2021]" />
                </div>
                <div>
                  <span className="text-[#ebdbb2]">
                    Track your spiritual growth
                  </span>
                  <p className="text-sm text-[#a89984]">
                    Monitor progress across 7 spiritual dimensions
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start"
              >
                <div className="h-6 w-6 rounded-full bg-[#fe8019] flex items-center justify-center mr-3 flex-shrink-0">
                  <Check className="h-3 w-3 text-[#1d2021]" />
                </div>
                <div>
                  <span className="text-[#ebdbb2]">
                    Build consistent habits
                  </span>
                  <p className="text-sm text-[#a89984]">
                    Develop routines that strengthen your faith
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start"
              >
                <div className="h-6 w-6 rounded-full bg-[#fe8019] flex items-center justify-center mr-3 flex-shrink-0">
                  <Check className="h-3 w-3 text-[#1d2021]" />
                </div>
                <div>
                  <span className="text-[#ebdbb2]">Achieve your goals</span>
                  <p className="text-sm text-[#a89984]">
                    Complete challenges and earn achievements
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
  )
}

export default OnboardingWelcome