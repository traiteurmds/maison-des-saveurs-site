"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { id: "1", title: "Tajine", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85", alt: "Tajine", speed: 0.4 },
  { id: "2", title: "Couscous", src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=85", alt: "Couscous", speed: 0.6 },
  { id: "3", title: "Pastilla", src: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=85", alt: "Pastilla", speed: 0.3 },
  { id: "4", title: "Pâtisseries", src: "https://images.unsplash.com/photo-1604329760661-e71dc83f2b26?w=800&q=85", alt: "Pâtisseries", speed: 0.5 },
  { id: "5", title: "Mini salés", src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=85", alt: "Mini salés", speed: 0.45 },
  { id: "6", title: "Thé & douceurs", src: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=85", alt: "Thé", speed: 0.35 },
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
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(15,31,24,0.15)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(15,31,24,0.28)]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
