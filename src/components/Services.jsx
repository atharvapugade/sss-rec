"use client";

import { motion } from "framer-motion";
import {
  FaUserTie,
  FaBaby,
  FaUtensils,
  FaHome,
} from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.16,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const headerReveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const services = [
  {
    title: "Receptionist",
    desc: "Front desk & guest handling support",
    icon: <FaUserTie />,
  },
  {
    title: "Babysitter",
    desc: "Safe & trusted childcare assistance",
    icon: <FaBaby />,
  },
  {
    title: "Cook Services",
    desc: "Experienced home cooking professionals",
    icon: <FaUtensils />,
  },
  {
    title: "House Helpers",
    desc: "Daily home cleaning & support staff",
    icon: <FaHome />,
  },
];

export default function Services() {
  return (
    <section className="services-section bg-white">
      <div className="container-custom px-4">
        <div className="services-inner">
          <motion.div
            variants={headerReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="services-header"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Our Services
            </h2>

            <p className="services-subtitle text-lg text-gray-500 leading-relaxed text-center">
              Trusted staffing solutions for homes and businesses, designed to
              make hiring simple, fast, and reliable.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="services-grid grid w-full justify-items-center gap-10 md:grid-cols-2 md:gap-8 xl:grid-cols-4 xl:gap-10"
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{
                  y: -10,
                  scale: 1.035,
                  transition: { duration: 0.28, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
                className="service-card group flex min-h-[280px] w-full max-w-[290px] flex-col justify-center px-6"
              >
                <div className="icon-box">{s.icon}</div>

                <h3 className="text-lg font-semibold mt-6 text-gray-900">
                  {s.title}
                </h3>

                <p className="text-xs text-gray-500 mt-3 leading-relaxed px-2">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
