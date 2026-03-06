"use client";

import { motion } from "framer-motion";
import VisionHero from "./components/VisionHero";
import Menu3DExperience from "./components/Menu3DExperience";
import GlobeLyon from "./components/GlobeLyon";
import LuxuryTestimonials from "./components/LuxuryTestimonials";
import ContactCTA from "./components/ContactCTA";

const sectionVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  return (
    <>
      <VisionHero />

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
        <GlobeLyon />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <LuxuryTestimonials />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <ContactCTA />
      </motion.div>
    </>
  );
}
