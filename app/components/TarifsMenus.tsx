"use client";

import { motion } from "framer-motion";

export default function TarifsMenus() {
  return (
    <section className="relative overflow-hidden border-t border-deep-green/10 bg-beige py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side_at_50%_0%,rgba(255,255,255,0.55),transparent_70%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[1200px] -translate-x-1/2 bg-gradient-to-b from-white/30 via-transparent to-transparent opacity-60 md:block"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-serif text-3xl font-semibold tracking-tight text-deep-green md:text-4xl"
        >
          🥘 Nos Menus – Une Expérience Généreuse et Authentique
        </motion.h2>

        <div aria-hidden className="mx-auto mt-5 flex w-full max-w-[240px] items-center justify-center gap-4">
          <span className="h-px w-20 bg-terracotta/55" />
          <span className="h-px w-2 bg-terracotta" />
          <span className="h-px w-20 bg-terracotta/55" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="mx-auto mt-10 max-w-5xl rounded-2xl border border-deep-green/10 bg-white/35 p-7 text-center shadow-[0_20px_70px_rgba(15,31,24,0.08)] backdrop-blur"
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className={`relative overflow-hidden rounded-2xl border p-6 text-center backdrop-blur shadow-[0_18px_60px_rgba(15,31,24,0.08)] ${
                item.bestSeller
                  ? "relative z-10 min-h-[420px] translate-y-[-18px] border-deep-green/25 bg-deep-green/95 text-beige shadow-[0_30px_90px_rgba(15,31,24,0.18)]"
                  : "min-h-[400px] border-deep-green/10 bg-white/40 text-deep-green"
              }`}
            >
              {item.bestSeller && (
                <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-terracotta px-5 py-2 font-serif text-xs font-semibold tracking-wide text-white shadow-lg">
                    BEST SELLER
                  </span>
                </div>
              )}

              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 ${
                  item.bestSeller
                    ? "bg-gradient-to-b from-white/10 via-transparent to-transparent"
                    : "bg-gradient-to-b from-white/55 via-transparent to-transparent"
                }`}
              />

              {item.bestSeller && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-[-30%] top-0 h-full w-[60%] bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.45),transparent)]"
                  animate={{ x: ["-20%", "240%"] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              <h3 className="relative z-10 font-serif text-xl font-semibold md:text-2xl">
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
                    : "border-deep-green/10 bg-white/55 text-deep-green"
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

