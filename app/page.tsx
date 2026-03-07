"use client";

import { motion } from "framer-motion";
import VisionHero from "./components/VisionHero";
import Menu3DExperience from "./components/Menu3DExperience";
import GoogleMapReviews from "./components/GoogleMapReviews";
import ContactCTA from "./components/ContactCTA";

const sectionVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  return (
    <>
      <VisionHero />

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <Menu3DExperience />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <GoogleMapReviews />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <ContactCTA />
      </motion.section>
    </>
  );
}
