"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/about", label: "Notre Maison" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-deep-green/10 bg-deep-green text-beige">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <Link
              href="/"
              className="font-serif text-3xl font-semibold tracking-wide"
            >
              Maison Des Saveurs
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-beige/80">
              Traiteur mariage Lyon et traiteur événementiel à Villeurbanne.
              Cuisine d&apos;exception pour vos plus beaux moments, dans le
              respect de la tradition et du goût.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-terracotta">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-beige/90 transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-beige/20 pt-8 text-center text-sm text-beige/60"
        >
          © {new Date().getFullYear()} Maison Des Saveurs. Tous droits réservés.
        </motion.div>
      </div>
    </footer>
  );
}
