"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pt-24">
      <section className="border-b border-deep-green/10 bg-beige py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-sm uppercase tracking-[0.3em] text-terracotta"
          >
            Écrivez-nous
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 font-serif text-5xl font-semibold text-deep-green md:text-6xl"
          >
            Contact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-deep-green/80"
          >
            Parlez-nous de votre événement. Nous vous répondrons sous 24 h.
          </motion.p>
        </div>
      </section>

      <section className="bg-beige py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded border border-deep-green/10 bg-white p-12 text-center"
            >
              <p className="font-serif text-2xl font-semibold text-deep-green">
                Merci pour votre demande.
              </p>
              <p className="mt-2 text-deep-green/80">
                Nous vous recontacterons très prochainement.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-serif text-sm font-medium text-deep-green"
                  >
                    Nom *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-2 w-full border border-deep-green/20 bg-white px-4 py-3 text-deep-green placeholder-deep-green/40 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-serif text-sm font-medium text-deep-green"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full border border-deep-green/20 bg-white px-4 py-3 text-deep-green placeholder-deep-green/40 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                    placeholder="vous@exemple.fr"
                  />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-serif text-sm font-medium text-deep-green"
                  >
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="mt-2 w-full border border-deep-green/20 bg-white px-4 py-3 text-deep-green placeholder-deep-green/40 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                    placeholder="07 58 63 97 34"
                  />
                </div>
                <div>
                  <label
                    htmlFor="event-date"
                    className="block font-serif text-sm font-medium text-deep-green"
                  >
                    Date de l&apos;événement
                  </label>
                  <input
                    id="event-date"
                    name="event-date"
                    type="text"
                    className="mt-2 w-full border border-deep-green/20 bg-white px-4 py-3 text-deep-green placeholder-deep-green/40 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                    placeholder="ex. juin 2026"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="guests"
                  className="block font-serif text-sm font-medium text-deep-green"
                >
                  Nombre d&apos;invités (approximatif)
                </label>
                <input
                  id="guests"
                  name="guests"
                  type="text"
                  className="mt-2 w-full border border-deep-green/20 bg-white px-4 py-3 text-deep-green placeholder-deep-green/40 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                  placeholder="ex. 80–100"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block font-serif text-sm font-medium text-deep-green"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full resize-y border border-deep-green/20 bg-white px-4 py-3 text-deep-green placeholder-deep-green/40 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                  placeholder="Décrivez votre événement, le lieu, et vos préférences (régimes, style, etc.)..."
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-premium btn-cta-signature w-full bg-terracotta py-4 font-medium tracking-widest text-beige hover:bg-terracotta/90 sm:w-auto sm:px-12"
                >
                  Envoyer la demande
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </section>

      <section className="border-t border-deep-green/10 bg-beige-dark py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-sm uppercase tracking-widest text-deep-green/70"
          >
            Ou contactez-nous directement
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-2 font-serif text-xl text-deep-green"
          >
            contact.mds.traiteur@gmail.com
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-1 text-deep-green/80"
          >
            07 58 63 97 34
          </motion.p>
        </div>
      </section>
    </div>
  );
}
