"use client";

import { motion } from "framer-motion";
import VisionHero from "./components/VisionHero";
import AppleScrollShowcase from "./components/AppleScrollShowcase";
import ParallaxFoodGallery from "./components/ParallaxFoodGallery";
import Menu3DExperience from "./components/Menu3DExperience";
import LuxuryTestimonials from "./components/LuxuryTestimonials";

const sectionVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  return (
    <>
      <VisionHero />

      <AppleScrollShowcase />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <ParallaxFoodGallery />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <Menu3DExperience />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <LuxuryTestimonials />
      </motion.div>
    </>
  );
}
