import type { Article } from "../types";
import { JOURNAL_IMAGES as IMG } from "../images";

export const histoireDeNotreCheffe: Article = {
  slug: "histoire-de-notre-cheffe",
  rubrique: "histoire",
  title: "Une passion née dans l'enfance : l'histoire de notre cheffe et de Maison Des Saveurs",
  seoTitle: "L'histoire de notre cheffe : une vie de cuisine marocaine",
  description:
    "Une cheffe qui cuisine depuis l'enfance, un savoir-faire transmis de génération en génération : l'histoire derrière Maison Des Saveurs, traiteur à Lyon.",
  dek: "Avant d'être des recettes, nos plats sont des souvenirs. Voici l'histoire de la cheffe qui leur donne vie, et de la maison qu'elle met aujourd'hui au service de vos plus belles réceptions.",
  excerpt:
    "Une passion née dans l'enfance, transmise de génération en génération, devenue un métier. Le récit fondateur de Maison Des Saveurs.",
  publishedAt: "2026-10-22",
  hero: {
    ...IMG.sauceService,
    caption: "Le geste juste, au moment juste : une sauce nappée en cuisine avant le service.",
  },
  keywords: ["cheffe cuisine marocaine Lyon", "traiteur marocain Lyon", "cuisine marocaine traditionnelle", "savoir-faire culinaire"],
  related: ["epices-marocaines", "repas-de-mariage"],
  closing: {
    title: "Une table à partager, *pour vos invités*",
    text: "Mariage, fête de famille ou réception professionnelle : racontez-nous votre événement, nous vous répondons avec une proposition sur mesure.",
  },
  body: [
    {
      type: "p",
      text: "Il suffit parfois d'une odeur pour revenir des années en arrière. Le cumin qui chauffe doucement au fond d'une marmite, la cannelle posée sur une pastilla, le bouillon d'un couscous qui embaume toute la maison un jour de fête. Avant d'être des recettes, ces parfums sont des souvenirs : des voix dans une cuisine, des mains qui travaillent ensemble, une table que l'on agrandit parce que d'autres arrivent.",
    },
    {
      type: "p",
      text: "C'est de là que vient Maison Des Saveurs. Pas d'un concept imaginé sur le papier, mais de la vie d'une femme qui cuisine depuis toujours, et qui a fait de cette passion son métier.",
    },
    { type: "h2", id: "enfance", text: "Une passion qui commence dans l'enfance" },
    {
      type: "p",
      text: "Notre cheffe cuisine depuis son enfance. Elle fait partie de ces personnes pour qui la cuisine n'a jamais été une corvée, ni un simple passage obligé de la journée, mais un endroit où l'on apprend, où l'on observe et où l'on se sent utile aux autres.",
    },
    {
      type: "p",
      text: "Dans la cuisine marocaine traditionnelle, beaucoup de choses s'apprennent ainsi : en regardant faire, en goûtant, en recommençant. On ne retient pas seulement une liste d'ingrédients. On retient un geste, la couleur que doit prendre une sauce, le moment où une viande est prête, la façon de travailler la semoule entre ses mains pour qu'elle reste légère.",
    },
    {
      type: "p",
      text: "Cette curiosité des premières années ne l'a jamais quittée. Avec le temps, elle est devenue une exigence.",
    },
    { type: "h2", id: "transmission", text: "De génération en génération" },
    {
      type: "p",
      text: "Chez elle, l'amour de la cuisine s'est transmis de génération en génération. C'est sans doute ce qui donne à la cuisine marocaine sa force particulière : elle vit moins dans les livres que dans les familles. Chaque maison a ses habitudes, ses dosages, sa manière de préparer un même plat. Deux couscous ne se ressemblent jamais tout à fait, et c'est très bien ainsi.",
    },
    {
      type: "p",
      text: "Recevoir un tel héritage, ce n'est pas reproduire à l'identique. C'est comprendre pourquoi les choses se font d'une certaine manière, pour pouvoir les refaire avec justesse, des années plus tard, pour d'autres personnes.",
    },
    {
      type: "quote",
      text: "Une cuisine de tradition ne se résume pas à une liste d'ingrédients. Elle est faite de gestes, de patience et de transmission.",
    },
    {
      type: "figure",
      layout: "wide",
      image: {
        ...IMG.couscous,
        caption: "Le couscous, plat de partage par excellence, dressé pour une réception.",
      },
    },
    { type: "h2", id: "restauration", text: "Une vie consacrée à la restauration" },
    {
      type: "p",
      text: "Notre cheffe a toujours travaillé dans la restauration. Au fil de plus de trente années passées en cuisine, ce qui était une passion familiale est devenu un véritable savoir-faire professionnel.",
    },
    {
      type: "p",
      text: "La restauration enseigne ce que la cuisine de famille n'apprend pas toujours : l'organisation, la régularité, la rigueur, la maîtrise du temps quand de nombreuses assiettes doivent partir en même temps. Elle enseigne aussi une forme d'humilité. Un plat réussi un jour doit l'être tout autant le lendemain, et pour cent personnes comme pour dix.",
    },
    {
      type: "p",
      text: "C'est cette double culture qui fait la singularité de sa cuisine : la mémoire et le cœur d'une cuisine familiale, la méthode et l'exigence d'une professionnelle.",
    },
    { type: "h2", id: "epices-tradition-generosite", text: "Les épices, la tradition et la générosité" },
    {
      type: "p",
      text: "Dans sa cuisine, les épices ne servent jamais à masquer. Elles accompagnent les produits, leur donnent de la profondeur et du caractère. Le gingembre réveille, le safran colore et parfume, la cannelle arrondit une viande aux pruneaux, le cumin apporte du relief. Tout l'art consiste à trouver l'équilibre, pour qu'aucune saveur n'écrase les autres. Nous y consacrons d'ailleurs un article entier : [les épices marocaines et leurs parfums](/journal/epices-marocaines).",
    },
    {
      type: "p",
      text: "La tradition, elle, sert de boussole. Les plats que nous préparons, le couscous, la pastilla, le poulet aux olives, la viande aux pruneaux ou la rfissa, ont une histoire et un sens. Ils accompagnent des moments précis de la vie : une naissance, des fiançailles, un mariage, un repas qui réunit toute la famille.",
    },
    {
      type: "p",
      text: "Et puis il y a la générosité, qui n'est pas un argument mais une manière d'être. Dans la culture marocaine, recevoir, c'est faire en sorte que personne ne manque de rien. Un grand plat posé au centre de la table, que chacun partage, le dit mieux que n'importe quel discours.",
    },
    {
      type: "figure",
      layout: "portrait",
      image: {
        ...IMG.saladesBuffet,
        caption: "Une table de réception dressée avec générosité.",
      },
    },
    { type: "h2", id: "maison-des-saveurs", text: "Une maison récente, le savoir-faire d'une vie" },
    {
      type: "p",
      text: "Maison Des Saveurs est une entreprise récente. Ce qui ne l'est pas, c'est l'expérience de celle qui est en cuisine. Aujourd'hui, notre cheffe met ce savoir-faire au service de vos événements, à Lyon, à Villeurbanne et dans la région lyonnaise.",
    },
    {
      type: "p",
      text: "Concrètement, cela veut dire préparer une cuisine marocaine traditionnelle et halal, en quantités généreuses, et la présenter avec soin. Selon les besoins de chaque réception, nous pouvons aussi prendre en charge la livraison, le réchauffage, le dressage, le service en salle et la vaisselle. Vous trouverez le détail de ces options sur la page de [nos prestations](/services).",
    },
    {
      type: "p",
      text: "Nous ne cherchons pas à être un simple fournisseur de plats. Nous voulons être la maison à laquelle on confie un repas important, en toute confiance.",
    },
    { type: "h2", id: "mariages", text: "Le jour d'un mariage, une responsabilité particulière" },
    {
      type: "p",
      text: "Certaines commandes ne ressemblent à aucune autre. Un mariage se prépare parfois pendant des mois. Ce jour-là, deux familles se retrouvent, des proches viennent parfois de loin, plusieurs générations se mêlent autour des mêmes tables.",
    },
    {
      type: "p",
      text: "Notre cheffe le sait : elle ne prépare pas seulement un repas, elle participe à un moment de l'histoire d'une famille. Le repas n'est pas tout, bien sûr. Il y a l'émotion, la musique, les retrouvailles. Mais il en fait pleinement partie. C'est souvent à table que les invités prennent le temps de se parler, de rire et de partager.",
    },
    {
      type: "p",
      text: "Contribuer à illuminer cette journée, c'est veiller à ce que chaque plat soit servi au bon moment et joliment présenté, à ce que les quantités soient justes et généreuses, à ce que chaque invité se sente accueilli. C'est un travail discret, qui ne cherche pas la lumière, mais qui se remarque lorsqu'il est bien fait. Si vous préparez votre mariage, notre guide pour [préparer le repas de mariage](/journal/repas-de-mariage) vous aidera à poser les bonnes questions.",
    },
    {
      type: "figure",
      layout: "column",
      image: {
        ...IMG.serviceBaklawa,
        caption: "Le service, dernier geste d'une longue préparation.",
      },
    },
    { type: "h2", id: "table-a-partager", text: "Une table à partager" },
    {
      type: "p",
      text: "Cuisiner pour les autres, au fond, c'est toujours la même chose qu'à l'enfance : vouloir faire plaisir, rassembler, et donner à chacun l'envie de rester encore un peu à table.",
    },
    {
      type: "p",
      text: "C'est cet esprit que nous souhaitons apporter à chacune de vos réceptions : une cuisine généreuse, soignée, fidèle à ses racines, préparée par une cheffe qui connaît la valeur du travail bien fait.",
    },
    {
      type: "cta",
      title: "Découvrez l'univers et les prestations de Maison Des Saveurs",
      text: "Parcourez notre carte, découvrez nos prestations pour les mariages, les fêtes de famille et les événements professionnels, ou parlez-nous directement de votre projet.",
      links: [
        { href: "/services", label: "Nos prestations" },
        { href: "/menu", label: "La carte" },
      ],
    },
  ],
};
