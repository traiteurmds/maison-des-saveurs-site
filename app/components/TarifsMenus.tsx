"use client";

import { motion } from "framer-motion";

export default function TarifsMenus() {
  return (
    <section className="relative overflow-hidden border-t border-deep-green/10 bg-beige py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.55),transparent_55%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[1200px] -translate-x-1/2 bg-gradient-to-b from-white/30 via-transparent to-transparent opacity-50"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-serif text-3xl font-semibold tracking-tight text-deep-green md:text-4xl"
        >
          ### 🥘 Nos Menus – Une Expérience Généreuse et Authentique
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="mx-auto mt-8 max-w-4xl rounded-2xl border border-deep-green/10 bg-white/35 p-6 shadow-[0_20px_60px_rgba(15,31,24,0.08)] backdrop-blur"
        >
          <p className="font-serif leading-relaxed text-deep-green/85">
            Découvrez une cuisine riche en saveurs, pensée pour vous offrir bien plus qu’un simple
            repas. Tous nos menus sont proposés par personne et incluent : pain frais, boissons,
            thé à la menthe, la livraison directement sur votre lieu de réception, ainsi que le
            dressage soigné en assiettes centrales pour une présentation élégante et conviviale.
          </p>
          <p className="mt-4 font-serif leading-relaxed text-deep-green/85">
            ✨ Une prestation généreuse, où chaque détail est pris en charge pour vous simplifier la
            vie et sublimer votre événement. Vous profitez pleinement sans vous soucier de
            l’organisation : nous nous occupons de tout.
          </p>
          <p className="mt-4 font-serif leading-relaxed text-deep-green/85">
            Les portions sont copieuses, les recettes fidèles à la tradition, et chaque bouchée
            vous transporte vers un goût authentique, chaleureux et raffiné.
          </p>
          <p className="mt-4 font-serif leading-relaxed text-deep-green/85">
            👉 Les menus Royal se distinguent par une salade encore plus généreuse et raffinée,
            avec une décoration soignée, des crevettes, ainsi que des briouates ou cigares au choix
            inclus, pour une touche encore plus festive et gourmande.
          </p>
        </motion.div>

        <div className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {(
            [
              {
                key: "couscous",
                title: "MENU COUSCOUS : 40€",
                desc: "Un couscous traditionnel, complet et réconfortant, préparé dans le respect des recettes authentiques.",
                supplement: "SUPPLÉMENT MENU ROYAL COUSCOUS : 45€",
                bestSeller: false,
              },
              {
                key: "poulet-olives",
                title: "MENU POULET OLIVES : 40€",
                desc: "Un grand classique savoureux, subtilement mijoté avec des olives pour un goût équilibré et parfumé.",
                supplement: "SUPPLÉMENT : MENU ROYAL POULET OLIVES : 45€",
                bestSeller: true,
              },
              {
                key: "viande-pruneaux",
                title: "MENU VIANDE PRUNEAUX : 55€",
                desc: "Un mélange sucré-salé délicat, avec une viande fondante et des pruneaux savoureux.",
                supplement: "SUPPLÉMENT MENU ROYAL PRUNEAUX : 60€",
                bestSeller: false,
              },
            ] as const
          ).map((item) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className={`relative overflow-hidden rounded-2xl border p-6 shadow-[0_22px_70px_rgba(15,31,24,0.10)] backdrop-blur ${
                item.bestSeller
                  ? "border-deep-green/25 bg-deep-green/95 text-beige"
                  : "border-deep-green/10 bg-white/35 text-deep-green"
              }`}
            >
              {item.bestSeller && (
                <div className="absolute left-4 top-4 z-10">
                  <span className="inline-flex items-center rounded-full bg-terracotta px-4 py-2 font-serif text-xs font-semibold tracking-wide text-white shadow-lg">
                    BEST SELLER
                  </span>
                </div>
              )}

              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 ${
                  item.bestSeller ? "bg-gradient-to-b from-white/10 via-transparent to-transparent" : "bg-gradient-to-b from-white/50 via-transparent to-transparent"
                }`}
              />

              {item.bestSeller && (
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="pointer-events-none absolute -top-24 left-0 h-48 w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.45),transparent)]"
                  animate={{ x: [0, 220, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              <h3
                className={`relative z-10 font-serif text-xl font-semibold md:text-2xl ${
                  item.bestSeller ? "" : "text-deep-green"
                }`}
              >
                {item.title}
              </h3>

              <p
                className={`relative z-10 mt-3 font-serif leading-relaxed ${
                  item.bestSeller ? "text-beige/85" : "text-deep-green/85"
                }`}
              >
                {item.desc}
              </p>

              <div
                className={`relative z-10 mt-5 rounded-xl border px-4 py-3 font-serif ${
                  item.bestSeller
                    ? "border-beige/20 bg-beige/10 text-beige"
                    : "border-deep-green/10 bg-white/50 text-deep-green"
                }`}
              >
                <p className="text-sm font-semibold md:text-base">{item.supplement}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

