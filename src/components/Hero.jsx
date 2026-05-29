"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBaby,
  FaCheckCircle,
  FaHome,
  FaUserTie,
  FaUtensils,
} from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.82,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const fadeScale = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.95,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const heroServices = [
  { icon: <FaBaby />, label: "Babysitters" },
  { icon: <FaUtensils />, label: "Cooks" },
  { icon: <FaUserTie />, label: "Receptionists" },
  { icon: <FaHome />, label: "House Helpers" },
];

export default function Hero() {
  return (
    <section className="hero-section hero-modern min-h-screen flex items-center overflow-hidden">
      <div className="hero-blob hero-blob-one" />
      <div className="hero-blob hero-blob-two" />

      <div className="container-custom hero-modern-grid">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="hero-content"
        >
          <motion.div variants={fadeUp} className="hero-badge">
            <FaCheckCircle />
            Trusted staffing for homes & businesses
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="hero-title text-gray-900"
          >
            Find reliable staff without the hiring stress.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="hero-subtitle text-gray-600"
          >
            SSS Recruitment helps you connect with babysitters, cooks,
            receptionists, and house helpers through a simple, clear, and
            people-first process.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="hero-actions flex flex-wrap items-center gap-4"
          >
            <motion.div
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link href="/services" className="btn-primary btn-compact">
                Explore Services <span aria-hidden="true">&rarr;</span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link href="/contact" className="btn-outline btn-compact hero-secondary-btn">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-service-strip">
            {heroServices.map((service) => (
              <span key={service.label}>
                {service.icon}
                {service.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeScale}
          initial="hidden"
          animate="show"
          className="hero-visual"
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hero-simple-card"
          >
            <div className="hero-simple-photo">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="Professional team working together"
              />
            </div>

            <div className="hero-simple-note">
              <FaCheckCircle />
              <div>
                <strong>Simple. Reliable. Human.</strong>
                <p>Staffing guidance for everyday needs.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
