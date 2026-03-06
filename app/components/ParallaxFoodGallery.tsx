"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { id: "1", title: "Couscous royal", src: "/images/menu/couscous.jpg", alt: "Couscous royal marocain traiteur Lyon", speed: 0.4 },
  { id: "2", title: "Pastilla", src: "/images/menu/pastilla.jpg", alt: "Pastilla marocaine traditionnelle faite maison", speed: 0.6 },
  { id: "3", title: "Rfissa", src: "/images/menu/rfissa.jpg", alt: "Rfissa marocaine traditionnelle", speed: 0.3 },
  { id: "4", title: "Poulet aux olives", src: "/images/menu/poulet-olives.jpg", alt: "Poulet marocain aux olives et citron", speed: 0.5 },
  { id: "5", title: "Viande aux pruneaux", src: "/images/menu/viande-pruneaux.jpg", alt: "Tajine de boeuf marocain aux pruneaux et amandes", speed: 0.45 },
  { id: "6", title: "Assortiment mini salés", src: "/images/menu/mini-sales.jpg", alt: "Buffet de mini salés marocains pour événements", speed: 0.35 },
];

export default function ParallaxFoodGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el || !sectionRef.current) return;
        const speed = items[i]?.speed ?? 0.4;
        gsap.to(el, {
          y: () => -window.innerHeight * speed * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden border-t border-deep-green/10 bg-beige-dark py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-16 text-center font-serif text-4xl font-semibold text-deep-green md:text-5xl">
          Nos créations
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(15,31,24,0.28)]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/95 via-deep-green/40 to-transparent opacity-80 transition-all duration-500 group-hover:opacity-100" aria-hidden />
              <p className="absolute bottom-6 left-6 right-6 font-serif text-2xl font-semibold text-white opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
