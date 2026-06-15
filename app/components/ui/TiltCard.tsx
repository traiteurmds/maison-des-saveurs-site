"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 28;
    const y = -(e.clientX - rect.left - rect.width / 2) / 28;
    setRotate({ x, y });
  };

  const onLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      animate={reduced ? undefined : { rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
