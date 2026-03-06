"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: "tajine",
    title: "Tajine",
    subtitle: "Cuisson lente, saveurs d’exception",
    src: "/images/menu/poulet-olives.jpg",
    alt: "Tajine de poulet marocain aux olives et citron",
  },
  {
    id: "pastilla",
    title: "Pastilla",
    subtitle: "Feuilletage doré, amandes et épices",
    src: "/images/menu/pastilla.jpg",
    alt: "Pastilla marocaine traditionnelle faite maison",
  },
  {
    id: "couscous",
    title: "Couscous Royal",
    subtitle: "Semoule, légumes et viandes mijotées",
    src: "/images/menu/couscous.jpg",
    alt: "Couscous royal marocain traiteur Lyon",
  },
  {
    id: "mini-sales",
    title: "Mini salés",
    subtitle: "Bouchées et amuse-bouches raffinés",
    src: "/images/menu/mini-sales.jpg",
    alt: "Buffet de mini salés marocains pour événements",
  },
];

export default function AppleScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, i) => {
        if (!section) return;
        const img = section.querySelector(".showcase-image");
        const content = section.querySelector(".showcase-content");
        if (!img || !content) return;

        gsap.fromTo(
          img,
          { scale: 0.92, y: 80 },
          {
            scale: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          content,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          img,
          { y: 0 },
          {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-deep-green">
      {sections.map((section, i) => (
        <div
          key={section.id}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          className="relative flex min-h-screen items-center justify-center overflow-hidden py-24"
        >
          <div className="showcase-image absolute inset-0 flex items-center justify-center px-4">
            <div className="relative h-[85vh] w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={section.src}
                alt={section.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/90 via-deep-green/20 to-transparent" aria-hidden />
            </div>
          </div>
          <div className="showcase-content relative z-10 mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-serif text-5xl font-semibold text-white drop-shadow-lg sm:text-6xl md:text-7xl">
              {section.title}
            </h2>
            <p className="mt-4 font-serif text-xl text-beige/95 sm:text-2xl">
              {section.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
