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
    description: "Cuisson lente, saveurs d'exception",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90",
    alt: "Tajine marocain",
  },
  {
    id: "pastilla",
    title: "Pastilla",
    description: "Feuilletage doré, amandes et épices",
    src: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1400&q=90",
    alt: "Pastilla",
  },
  {
    id: "couscous",
    title: "Couscous Royal",
    description: "Semoule, légumes et viandes mijotées",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1400&q=90",
    alt: "Couscous royal",
  },
  {
    id: "mini-sales",
    title: "Mini salés",
    description: "Bouchées et amuse-bouches raffinés",
    src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1400&q=90",
    alt: "Mini salés",
  },
];

export default function AppleScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, i) => {
        if (!section) return;
        const imgWrap = section.querySelector(".story-image-wrap");
        const img = section.querySelector(".story-image");
        const content = section.querySelector(".story-content");
        if (!imgWrap || !img || !content) return;

        gsap.fromTo(
          imgWrap,
          { scale: 0.9, y: 80 },
          {
            scale: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 15%",
              scrub: 1.4,
            },
          }
        );

        gsap.fromTo(
          content,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "top 38%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          img,
          { y: 0 },
          {
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.8,
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
          className="relative flex min-h-[100vh] items-center justify-center overflow-hidden"
          style={{ minHeight: "100vh" }}
        >
          <div className="story-image-wrap absolute inset-0 flex items-center justify-center px-4">
            <div className="story-image relative h-[82vh] w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl will-change-transform">
              <Image
                src={section.src}
                alt={section.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/92 via-deep-green/25 to-transparent" aria-hidden />
            </div>
          </div>
          <div className="story-content relative z-10 mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-serif text-5xl font-semibold text-white drop-shadow-lg sm:text-6xl md:text-7xl">
              {section.title}
            </h2>
            <p className="mt-5 font-serif text-xl text-beige/95 sm:text-2xl">
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
