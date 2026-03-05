"use client";

import { motion } from "framer-motion";
import VisionHero from "./components/VisionHero";
import AppleScrollStory from "./components/AppleScrollStory";
import ParallaxFoodGallery from "./components/ParallaxFoodGallery";
import Menu3DExperience from "./components/Menu3DExperience";
import EventGallery from "./components/EventGallery";
import LuxuryTestimonials from "./components/LuxuryTestimonials";
import ContactCTA from "./components/ContactCTA";

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
      {/* Dev server test: delete this block once Fast Refresh is confirmed working */}
      <div className="bg-red-600 p-4 text-center text-2xl font-bold text-white">
        TEST RELOAD WORKING
      </div>
      <VisionHero />

      <AppleScrollStory />

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
        <EventGallery />
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
