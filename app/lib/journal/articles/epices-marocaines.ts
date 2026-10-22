import type { Article } from "../types";
import { JOURNAL_IMAGES as IMG } from "../images";

export const epicesMarocaines: Article = {
  slug: "epices-marocaines",
  rubrique: "cuisine-marocaine",
  title: "Les épices marocaines : les parfums qui donnent son âme à notre cuisine",
  seoTitle: "Épices marocaines : parfums, associations et usages",
  description:
    "Gingembre, safran, cumin, cannelle, ras el hanout : les épices de la cuisine marocaine, leurs parfums, leurs associations et l'art du dosage.",
  dek: "Gingembre, safran, cumin, cannelle… Les épices ne sont pas là pour cacher les saveurs, mais pour les révéler. Petit voyage dans les parfums qui font le caractère de la cuisine marocaine.",
  excerpt:
    "Parfum, intensité, piquant : comprendre les épices marocaines, leurs associations et l'art du dosage.",
  publishedAt: "2026-10-22",
  hero: {
    ...IMG.pruneaux,
    caption: "Viande aux pruneaux et aux amandes, l'un des grands classiques du sucré-salé marocain.",
  },
  keywords: ["épices marocaines", "ras el hanout", "cuisine marocaine traditionnelle", "safran", "traiteur marocain Lyon"],
  related: ["histoire-de-notre-cheffe", "repas-de-mariage"],
  closing: {
    title: "Ces parfums, *à votre table*",
    text: "Couscous, pastilla, poulet aux olives, viande aux pruneaux : composez votre menu et recevez une proposition adaptée à votre événement.",
  },
  body: [
    {
      type: "p",
      text: "Il y a d'abord la couleur. L'or du curcuma, le rouge profond du paprika, le brun chaud de la cannelle. Puis vient le parfum, qui s'échappe d'une marmite bien avant que le plat n'arrive sur la table. Dans la cuisine marocaine, les épices sont partout, mais rarement là où on les attend : elles ne brûlent pas, elles enveloppent. Elles ne cachent pas le goût des produits, elles le prolongent.",
    },
    {
      type: "p",
      text: "Comprendre les épices, c'est comprendre une bonne partie de cette cuisine. Voici celles que l'on retrouve le plus souvent, la manière dont elles s'associent, et pourquoi le dosage compte autant que les ingrédients eux-mêmes.",
    },
    { type: "h2", id: "parfum-intensite-piquant", text: "Parfum, intensité, piquant : trois notions différentes" },
    {
      type: "p",
      text: "On imagine souvent qu'une cuisine épicée est forcément une cuisine qui pique. C'est une confusion fréquente. La cuisine marocaine traditionnelle est avant tout une cuisine *parfumée*, et beaucoup plus rarement une cuisine *brûlante*.",
    },
    {
      type: "list",
      items: [
        "**Le parfum**, c'est l'arôme que dégage une épice : floral pour le safran, chaud pour le cumin, sucré pour la cannelle.",
        "**L'intensité**, c'est la force de ce parfum. Une pincée de safran pèse plus dans un plat qu'une cuillerée de paprika doux.",
        "**Le piquant**, c'est la sensation de chaleur en bouche, apportée surtout par les piments forts. Dans de nombreuses familles, on en met peu, ou on le sert à part pour que chacun dose selon son goût.",
      ],
    },
    {
      type: "p",
      text: "Un plat peut donc être très parfumé sans être piquant du tout. C'est même le cas de la plupart des grands plats de fête.",
    },
    { type: "h2", id: "nuancier", text: "Le nuancier des épices marocaines" },
    {
      type: "p",
      text: "Voici les épices que l'on rencontre le plus souvent dans la cuisine marocaine, avec leur nom courant en darija. Les transcriptions varient d'une région à l'autre, tout comme les usages.",
    },
    { type: "spices" },
    {
      type: "p",
      text: "À ces épices s'ajoutent des herbes fraîches qui jouent un rôle tout aussi important : la coriandre et le persil, hachés en abondance, ainsi que l'ail, l'oignon, le citron confit et les olives. Ce sont eux qui apportent la fraîcheur et l'acidité qui équilibrent la chaleur des épices.",
    },
    { type: "h2", id: "associations", text: "Les grandes associations" },
    {
      type: "p",
      text: "Les épices marocaines vivent rarement seules. Elles fonctionnent en familles, que l'on retrouve d'un plat à l'autre avec des variations infinies.",
    },
    { type: "h3", text: "Les sauces dorées" },
    {
      type: "p",
      text: "Gingembre, curcuma, safran et poivre, avec de l'oignon et une matière grasse : c'est la base de nombreuses sauces jaunes, comme celle du poulet aux olives et au citron confit. Le gingembre donne la chaleur, le curcuma la couleur, le safran le parfum.",
    },
    { type: "h3", text: "Les sauces rouges et la chermoula" },
    {
      type: "p",
      text: "Quand le paprika et le cumin prennent davantage de place, la sauce devient plus rouge et plus profonde. La chermoula, mélange d'herbes fraîches, d'ail, de cumin, de paprika, de citron et d'huile, sert souvent de marinade, notamment pour le poisson.",
    },
    { type: "h3", text: "Le sucré-salé" },
    {
      type: "p",
      text: "La cannelle s'associe au safran et au gingembre pour accompagner les fruits secs, les pruneaux, le miel ou les amandes. C'est l'esprit de la viande aux pruneaux, et celui de la pastilla au poulet, que l'on termine traditionnellement d'un voile de sucre glace et de cannelle.",
    },
    {
      type: "pair",
      images: [IMG.pouletAmandes, IMG.pastilla],
      caption: "À gauche, une sauce dorée aux épices. À droite, une pastilla aux fruits de mer, autre visage de la pastilla.",
    },
    { type: "h2", id: "dosage", text: "Le dosage, tout est question d'équilibre" },
    {
      type: "p",
      text: "Avoir les bonnes épices ne suffit pas. Ce qui fait la différence, c'est la quantité, le moment où on les ajoute et la manière dont elles se mêlent aux autres ingrédients.",
    },
    {
      type: "list",
      items: [
        "**La juste mesure.** Une épice puissante comme le safran ou le fenugrec peut prendre le dessus en un instant. L'objectif est d'entendre chaque saveur, sans qu'aucune ne domine.",
        "**Le temps de cuisson.** Dans beaucoup de tajines, les épices sont mises dès le début, avec l'oignon et la matière grasse, pour qu'elles infusent longuement. La patience fait partie de la recette.",
        "**La fraîcheur des épices.** Une épice moulue perd peu à peu son parfum. Mieux vaut des épices de qualité, conservées dans un bocal fermé, à l'abri de la lumière, de la chaleur et de l'humidité.",
      ],
    },
    {
      type: "aside",
      title: "Le conseil de la maison",
      text: "Pour reconnaître des épices bien dosées, fiez-vous à la fin de la bouchée : un plat équilibré laisse un parfum long et agréable, jamais une amertume ni une sensation de poussière.",
    },
    { type: "h2", id: "dans-nos-plats", text: "Des épices aux plats de fête" },
    {
      type: "p",
      text: "Voici comment ces épices se retrouvent, le plus souvent, dans les plats que l'on sert lors des réceptions marocaines. Les recettes changent d'une famille à l'autre ; ces repères donnent simplement une idée de leur caractère.",
    },
    {
      type: "list",
      items: [
        "**Le couscous** : un bouillon parfumé où se mêlent souvent gingembre, curcuma, poivre et parfois safran, avec ses légumes et ses pois chiches.",
        "**Le poulet aux olives** : la sauce dorée par excellence, relevée par le citron confit et les olives.",
        "**La viande aux pruneaux** : cannelle, safran et gingembre pour un sucré-salé tout en rondeur, souvent garni d'amandes et de sésame.",
        "**La pastilla au poulet** : feuilles croustillantes, farce parfumée, et le contraste du sucre glace et de la cannelle.",
        "**La rfissa** : plat de partage associé aux naissances dans de nombreuses familles, où le fenugrec et le ras el hanout jouent un grand rôle.",
      ],
    },
    {
      type: "p",
      text: "Tous ces plats figurent sur [notre carte](/menu). Notre cheffe les prépare selon sa propre manière, construite au fil de plus de trente ans en cuisine, que nous vous racontons dans [son histoire](/journal/histoire-de-notre-cheffe).",
    },
    { type: "h2", id: "variations", text: "Une cuisine qui change d'une famille à l'autre" },
    {
      type: "p",
      text: "Il n'existe pas une cuisine marocaine, mais une multitude de cuisines familiales et régionales. On associe souvent Fès à un sucré-salé raffiné, Marrakech à la tanjia mijotée longuement, les villes côtières aux poissons marinés dans la chermoula. Dans la région de Taliouine, au sud du pays, on cultive un safran réputé.",
    },
    {
      type: "p",
      text: "Le ras el hanout illustre parfaitement cette diversité. Son nom signifie « tête de la boutique » : chaque épicier composait le sien, avec parfois plus d'une vingtaine d'ingrédients. Aujourd'hui encore, deux mélanges portant le même nom peuvent avoir un parfum très différent.",
    },
    {
      type: "p",
      text: "C'est aussi ce qui rend cette cuisine si attachante. Derrière chaque dosage se cache une histoire de famille, une habitude transmise, une préférence que l'on garde sans toujours savoir d'où elle vient.",
    },
    {
      type: "quote",
      text: "Les épices ne sont pas là pour masquer les aliments : elles participent à l'équilibre, à la profondeur et à la personnalité des plats.",
    },
    {
      type: "cta",
      title: "Envie de découvrir notre univers culinaire lors de votre prochain événement ?",
      text: "Mariage, fête de famille, repas d'entreprise : découvrez nos plats et nos prestations, puis parlez-nous de votre projet.",
      links: [
        { href: "/menu", label: "Découvrir la carte" },
        { href: "/services", label: "Nos prestations" },
      ],
    },
  ],
};
