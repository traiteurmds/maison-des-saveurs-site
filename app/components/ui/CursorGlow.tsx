"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function CursorGlow() {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [reduced]);

  if (reduced || !visible) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[9998] hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        width: 280,
        height: 280,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(184,132,84,0.12) 0%, rgba(184,132,84,0.04) 35%, transparent 70%)",
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
    />
  );
}
