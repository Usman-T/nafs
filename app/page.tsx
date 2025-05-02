"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Heart,
  Users,
  Compass,
  Sunrise,
  Calendar,
} from "lucide-react";

// Custom PrayingHands icon
function PrayingHands({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 11h3v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" />
      <path d="M15 7h3a1 1 0 0 1 1 1v7h-4" />
      <path d="M4.6 9a9 9 0 0 1 .4-2.8A1 1 0 0 1 6 5.5h12a1 1 0 0 1 1 .7 9 9 0 0 1 .4 2.8" />
      <path d="M7 5.5V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v.5" />
      <path d="M14 16v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
    </svg>
  );
}

// Animated radar chart component
function AnimatedRadarChart() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const dimensions = [
    { name: "Salah", value: 0.8 * progress },
    { name: "Quran", value: 0.6 * progress },
    { name: "Charity", value: 0.7 * progress },
    { name: "Community", value: 0.5 * progress },
    { name: "Dhikr", value: 0.9 * progress },
    { name: "Knowledge", value: 0.7 * progress },
    { name: "Character", value: 0.8 * progress },
  ];

  const size = 300;
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
    };
  });

  // Create the path for the filled area
  const path =
    points
      .map((point, i) => (i === 0 ? "M" : "L") + point.x + "," + point.y)
      .join(" ") + "Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible"
    >
      {/* Background circles */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={radius * level}
          fill="none"
          stroke="#2e2e2e"
          strokeWidth="1"
          strokeDasharray={i === 4 ? "none" : "2,2"}
          style={{ transition: "all 0.5s ease-out" }}
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
          stroke="#2e2e2e"
          strokeWidth="1"
          style={{ transition: "all 0.5s ease-out" }}
        />
      ))}

      {/* Define gradient for filled area */}
      <defs>
        <linearGradient id="spiderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d65d0e" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fe8019" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Filled area */}
      <path
        d={path}
        fill="url(#spiderGradient)"
        stroke="#fe8019"
        strokeWidth="2"
        style={{ transition: "all 0.8s ease-out" }}
      />

      {/* Data points */}
      {points.map((point, i) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="#fe8019"
          style={{ transition: "all 0.8s ease-out" }}
        />
      ))}

      {/* Labels */}
      {points.map((point, i) => {
        const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
        const labelRadius = radius * 1.15;
        const labelX = center + labelRadius * Math.cos(angle);
        const labelY = center + labelRadius * Math.sin(angle);

        return (
          <text
            key={i}
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="#ebdbb2"
            fontWeight="500"
          >
            {point.name}
          </text>
        );
      })}
    </svg>
  );
}

// Feature card component with flicker animation
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{
        opacity: [1, 0.98, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      viewport={{ once: true }}
      className="bg-[#282828] border border-[#3c3836] rounded-lg p-6 hover:border-[#fe8019] transition-all duration-300"
    >
      <motion.div
        animate={{
          opacity: [1, 0.9, 1],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="h-12 w-12 rounded-lg bg-[#3c3836] flex items-center justify-center mb-4"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2 text-[#ebdbb2]">{title}</h3>
      <p className="text-[#a89984]">{description}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const smoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    smoothScroll(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2]">
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 z-50 border-b border-[#3c3836] bg-[#1d2021]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="h-6 w-6 text-[#fe8019]" />
            <span className="text-xl font-bold">Nafs</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              onClick={(e) => handleScroll(e, "features")}
              className="text-sm font-medium text-[#a89984] hover:text-[#fe8019] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#dimensions"
              onClick={(e) => handleScroll(e, "dimensions")}
              className="text-sm font-medium text-[#a89984] hover:text-[#fe8019] transition-colors"
            >
              Dimensions
            </Link>
            <Link
              href="#about"
              onClick={(e) => handleScroll(e, "about")}
              className="text-sm font-medium text-[#a89984] hover:text-[#fe8019] transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:inline-flex h-9 items-center justify-center rounded-md border border-[#3c3836] bg-transparent px-4 py-2 text-sm font-medium text-[#ebdbb2] shadow-sm transition-colors hover:bg-[#3c3836]"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex h-9 items-center justify-center rounded-md bg-[#fe8019] px-4 py-2 text-sm font-medium text-[#1d2021] shadow-sm transition-colors hover:bg-[#d65d0e]"
            >
              Sign Up
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden rounded-md p-2 text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#3c3836] bg-[#1d2021]/95 backdrop-blur-md">
            <div className="container mx-auto py-3 space-y-1">
              {["Features", "Dimensions", "About"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleScroll(e, item.toLowerCase())}
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#a89984] hover:text-[#fe8019] hover:bg-[#3c3836]"
                >
                  {item}
                </Link>
              ))}
              <div className="pt-2 border-t border-[#3c3836] mt-2">
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#a89984] hover:text-[#fe8019] hover:bg-[#3c3836]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="pt-16 pb-16 md:pt-24 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              {/* Left Column - Text Content */}
              <div className="w-full md:w-1/2 md:pr-8 mb-10 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Nurture Your{" "}
                    <span className="text-[#fe8019]">Spiritual Growth</span>
                  </h1>
                  <p className="text-lg text-[#a89984] mb-8">
                    Track your Islamic habits, visualize your spiritual
                    dimensions, and embark on a journey of self-improvement with
                    our comprehensive habit tracking app.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/signup"
                      className="inline-flex h-12 items-center justify-center rounded-md bg-[#fe8019] px-6 text-base font-medium text-[#1d2021] shadow-md transition-colors hover:bg-[#d65d0e]"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      href="#features"
                      onClick={(e) => handleScroll(e, "features")}
                      className="inline-flex h-12 items-center justify-center rounded-md border border-[#3c3836] bg-[#282828] px-6 text-base font-medium text-[#ebdbb2] shadow-sm transition-colors hover:bg-[#3c3836]"
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Animated Visualization */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full md:w-1/2 flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#fe8019]/10 rounded-full blur-[100px]"></div>
                  <div className="relative bg-[#282828] border border-[#3c3836] rounded-2xl p-8 shadow-lg">
                    <AnimatedRadarChart />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-[#282828]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Key Features
              </h2>
              <p className="text-[#a89984] max-w-2xl mx-auto">
                Our platform offers tools to help you track, visualize, and
                improve your spiritual journey.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Calendar className="h-8 w-8 text-[#fe8019]" />}
                title="Habit Tracking"
                description="Track your daily prayers, Quran readings, charity, and other Islamic practices with streak goals."
              />
              <FeatureCard
                icon={<Compass className="h-8 w-8 text-[#fe8019]" />}
                title="Spiritual Dimensions"
                description="Visualize your growth across 7 key dimensions of Islamic spirituality on an interactive radar chart."
              />
              <FeatureCard
                icon={<PrayingHands className="h-8 w-8 text-[#fe8019]" />}
                title="Prayer Tracking"
                description="Never miss a prayer with timely reminders and track your consistency over time."
              />
            </div>
          </div>
        </section>

        {/* Dimensions Section */}
        <section id="dimensions" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                7 Dimensions of Spiritual Growth
              </h2>
              <p className="text-[#a89984] max-w-2xl mx-auto">
                Our tracker helps you visualize and improve in these key areas
                of Islamic spirituality.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[
                {
                  icon: <PrayingHands className="h-6 w-6 text-[#fe8019]" />,
                  title: "Salah (Prayer)",
                  description:
                    "Consistency and quality of your five daily prayers.",
                },
                {
                  icon: <BookOpen className="h-6 w-6 text-[#fe8019]" />,
                  title: "Quran",
                  description:
                    "Regular recitation, understanding, and memorization.",
                },
                {
                  icon: <Heart className="h-6 w-6 text-[#fe8019]" />,
                  title: "Charity",
                  description:
                    "Giving zakat, sadaqah, and helping others in need.",
                },
                {
                  icon: <Users className="h-6 w-6 text-[#fe8019]" />,
                  title: "Community",
                  description:
                    "Involvement with the Muslim ummah and building relationships.",
                },
                {
                  icon: <Moon className="h-6 w-6 text-[#fe8019]" />,
                  title: "Dhikr",
                  description: "Remembrance of Allah throughout your day.",
                },
                {
                  icon: <Compass className="h-6 w-6 text-[#fe8019]" />,
                  title: "Knowledge",
                  description: "Learning Islamic teachings and wisdom.",
                },
                {
                  icon: <Sunrise className="h-6 w-6 text-[#fe8019]" />,
                  title: "Character",
                  description:
                    "Developing akhlaq (good character) in daily interactions.",
                },
              ].map((dimension, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  animate={{
                    opacity: [1, 0.98, 1],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="bg-[#282828] border border-[#3c3836] rounded-lg p-5 hover:border-[#fe8019] transition-all duration-300"
                >
                  <div className="flex items-start">
                    <motion.div
                      animate={{
                        opacity: [1, 0.9, 1],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="mr-4 p-2 rounded-md bg-[#3c3836]"
                    >
                      {dimension.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-[#ebdbb2]">
                        {dimension.title}
                      </h3>
                      <p className="text-sm text-[#a89984]">
                        {dimension.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-[#282828]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                About Nafs
              </h2>
              <p className="text-[#a89984] max-w-2xl mx-auto">
                Nafs helps you cultivate consistent Islamic habits and track
                your progress toward spiritual growth.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2"
              >
                <div className="max-w-lg">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Our Mission
                  </h3>
                  <p className="text-[#a89984] mb-6">
                    We believe that consistent small actions lead to significant
                    spiritual growth. Our mission is to help Muslims worldwide
                    build and maintain beneficial habits that strengthen their
                    connection with Allah.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Provide tools for tracking spiritual practices",
                      "Visualize growth across multiple dimensions",
                      "Foster a supportive community of believers",
                      "Make Islamic self-improvement accessible to all",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="h-5 w-5 text-[#fe8019] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-[#ebdbb2]">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2"
              >
                <div className="bg-[#1d2021] border border-[#3c3836] rounded-lg p-6 shadow-lg">
                  <div className="aspect-video relative overflow-hidden rounded-md">
                    <Image
                      src="/placeholder.svg?height=400&width=600&text=Nafs+App+Demo"
                      alt="Nafs App Demo"
                      width={600}
                      height={400}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1d2021] to-transparent opacity-60"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-[#282828] border border-[#3c3836] rounded-lg p-8 md:p-12 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#fe8019]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fe8019]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Begin Your Spiritual Journey Today
                </h2>
                <p className="text-[#a89984] max-w-2xl mx-auto mb-8">
                  Join thousands of Muslims who are using our platform to track
                  their spiritual growth and strengthen their connection with
                  Allah.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/signup"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-[#fe8019] px-8 text-base font-medium text-[#1d2021] shadow-md transition-colors hover:bg-[#d65d0e]"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex h-12 items-center justify-center rounded-md border border-[#3c3836] bg-[#3c3836] px-8 text-base font-medium text-[#ebdbb2] shadow-sm transition-colors hover:bg-[#504945]"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1d2021] border-t border-[#3c3836] py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Moon className="h-6 w-6 text-[#fe8019]" />
                <span className="text-xl font-bold">Nafs</span>
              </div>
              <p className="text-[#a89984] mb-4">
                Track your spiritual journey and grow closer to Allah with our
                comprehensive Islamic self-improvement platform.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-[#ebdbb2] mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Features", "Dimensions", "About", "Login", "Sign Up"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={
                          item === "Login"
                            ? "/login"
                            : item === "Sign Up"
                            ? "/signup"
                            : `#${item.toLowerCase()}`
                        }
                        onClick={(e) =>
                          item !== "Login" &&
                          item !== "Sign Up" &&
                          handleScroll(e, item.toLowerCase())
                        }
                        className="text-[#a89984] hover:text-[#fe8019] transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-[#ebdbb2] mb-4">Contact</h3>
              <ul className="space-y-2 text-[#a89984]">
                <li>Email: support@nafsapp.com</li>
                <li>Follow us on social media</li>
              </ul>
              <div className="flex space-x-4 mt-4">
                {["Twitter", "Facebook", "Instagram"].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="h-8 w-8 rounded-full bg-[#3c3836] flex items-center justify-center text-[#a89984] hover:bg-[#fe8019] hover:text-[#1d2021] transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#3c3836] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-[#a89984] mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Nafs. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-[#a89984] hover:text-[#fe8019] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-[#a89984] hover:text-[#fe8019] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
