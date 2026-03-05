"use client";

import { motion } from "framer-motion";
import LuxuryHero from "./components/LuxuryHero";
import InteractiveMenu from "./components/InteractiveMenu";
import LuxuryGallery from "./components/LuxuryGallery";
import LuxuryReviews from "./components/LuxuryReviews";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  return (
    <>
      <LuxuryHero />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <InteractiveMenu />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <LuxuryGallery />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <LuxuryReviews />
      </motion.div>
    </>
  );
}
