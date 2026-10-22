import type { Article } from "../types";
import { JOURNAL_IMAGES as IMG } from "../images";

export const repasDeMariage: Article = {
  slug: "repas-de-mariage",
  rubrique: "mariages",
  title: "Le repas de mariage : comment créer une table généreuse dont vos invités se souviendront",
  seoTitle: "Repas de mariage marocain : le guide pour bien le préparer",
  description:
    "Invités, format, menu, allergies, contraintes de la salle, questions au traiteur : le guide pour préparer sereinement le repas de votre mariage.",
  dek: "Le repas occupe une place à part dans une journée de mariage. Voici, étape par étape, comment le préparer sereinement, et les questions à se poser avant de choisir son traiteur.",
  excerpt:
    "Invités, format, menu, besoins alimentaires, contraintes du lieu : le guide pour préparer un repas de mariage généreux et bien organisé.",
  publishedAt: "2026-09-18",
  hero: {
    ...IMG.buffetSalades,
    caption: "Salades composées dressées pour une grande réception.",
  },
  keywords: ["repas mariage marocain", "traiteur mariage Lyon", "traiteur marocain mariage", "organiser repas mariage"],
  related: ["histoire-de-notre-cheffe", "epices-marocaines"],
  closing: {
    title: "Vous préparez votre mariage ? *Parlons de votre repas.*",
    text: "Dites-nous la date, le lieu et le nombre d'invités. Nous revenons vers vous avec une proposition de menu et un devis sur mesure.",
  },
  body: [
    {
      type: "p",
      text: "On prépare un mariage pendant des mois. On choisit la salle, la tenue, la musique, on dresse et redresse la liste des invités. Et puis vient la question du repas, qui paraît simple jusqu'au moment où l'on commence à y réfléchir : combien de plats, quel format, pour combien de personnes, servi comment ?",
    },
    {
      type: "p",
      text: "Ce guide rassemble les questions essentielles à se poser, dans l'ordre où elles se présentent. Il ne remplace pas un échange avec votre traiteur, mais il vous permettra d'arriver à ce rendez-vous avec les idées claires.",
    },
    { type: "h2", id: "place-du-repas", text: "Pourquoi le repas compte autant" },
    {
      type: "p",
      text: "Un repas de mariage n'est pas un repas comme les autres. C'est souvent le moment où les deux familles se retrouvent vraiment autour de la même table, où les invités venus de loin prennent le temps de se parler, où les plus âgés et les plus jeunes partagent les mêmes plats.",
    },
    {
      type: "p",
      text: "Dans les mariages marocains, la générosité de la table fait partie de l'accueil. On veut que personne ne manque de rien, que les plats arrivent beaux et que chacun se sente reçu. Le repas ne fait pas à lui seul la réussite d'une fête, mais il y contribue pleinement, et c'est souvent lui dont on se souvient en parlant de la soirée.",
    },
    { type: "h2", id: "generosite", text: "La générosité, premier signe d'accueil" },
    {
      type: "p",
      text: "Dans un mariage marocain, on juge rarement un repas à la complexité de ses assiettes. On se souvient d'une table où les plats arrivaient pleins, où l'on pouvait se resservir, où personne n'avait à surveiller sa part. La générosité est la première manière de dire à vos invités qu'ils sont les bienvenus.",
    },
    {
      type: "p",
      text: "C'est aussi une question de respect envers ceux qui ont fait le déplacement, parfois de loin, pour être à vos côtés. Un plat généreux, bien présenté, posé au centre de la table, crée immédiatement une atmosphère de partage : on se passe les plats, on se sert les uns les autres, on parle. C'est souvent là que naissent les plus beaux souvenirs de la soirée.",
    },
    { type: "h2", id: "invites-et-format", text: "Commencer par les invités et le format" },
    {
      type: "p",
      text: "Avant de penser au menu, deux éléments structurent tout le reste : le nombre de convives et la manière dont le repas sera servi.",
    },
    { type: "h3", text: "Le nombre d'invités" },
    {
      type: "p",
      text: "Partez d'une estimation réaliste, en distinguant les adultes et les enfants. Elle n'a pas besoin d'être définitive dès le premier contact : chez Maison Des Saveurs, le nombre d'invités peut être ajusté jusqu'à deux semaines avant la date. Mais plus l'estimation de départ est juste, plus le devis le sera aussi.",
    },
    { type: "h3", text: "Le format du repas" },
    {
      type: "list",
      items: [
        "**Le repas servi à table**, en grands plats à partager au centre de chaque table de 8 ou de 10 personnes. C'est le format traditionnel des mariages marocains, convivial et généreux.",
        "**Le buffet ou le cocktail**, avec des pièces salées individuelles. Il convient bien à un accueil, à une réception plus libre ou à un événement où les invités circulent.",
        "**Une combinaison des deux**, par exemple un cocktail à l'arrivée des invités, puis un repas servi à table.",
      ],
    },
    {
      type: "p",
      text: "Le format dépend de la salle, du nombre d'invités, du déroulé de la soirée et, bien sûr, de vos envies. Il n'y a pas de bonne réponse universelle, seulement celle qui correspond à votre réception.",
    },
    { type: "h2", id: "composer-le-menu", text: "Composer le menu : entrées, plats, desserts" },
    {
      type: "p",
      text: "Dans beaucoup de mariages marocains, le repas suit un enchaînement bien connu : une ou plusieurs entrées, un ou deux grands plats, puis une fin de repas plus légère. Voici les questions à vous poser à chaque étape.",
    },
    { type: "h3", text: "Les entrées" },
    {
      type: "p",
      text: "L'entrée donne le ton à l'arrivée des invités à table. Une salade royale dressée en étages, une salade variée colorée ou une pastilla, au poulet ou aux fruits de mer, n'ont pas le même effet ni la même place dans le repas. Pensez à la suite : une entrée copieuse appelle un plat principal plus simple, et inversement.",
    },
    { type: "h3", text: "Les plats" },
    {
      type: "p",
      text: "Viande aux pruneaux, poulet aux olives, couscous : ces grands classiques ont chacun leur caractère. Mieux vaut un ou deux plats choisis avec soin que de multiplier les propositions. Pensez à l'équilibre entre le sucré-salé et les saveurs plus franches, et à la variété des textures.",
    },
    { type: "h3", text: "La fin du repas" },
    {
      type: "p",
      text: "Après un repas généreux, des plateaux de fruits frais apportent de la fraîcheur et de la couleur. Les pâtisseries marocaines peuvent les accompagner, au moment du thé ou en fin de soirée.",
    },
    {
      type: "pair",
      images: [IMG.saladesPlateaux, IMG.fruitsMelon],
      caption: "Des salades composées pour ouvrir le repas, des fruits frais pour le conclure.",
    },
    { type: "h2", id: "besoins-alimentaires", text: "Tenir compte des goûts et des besoins de chacun" },
    {
      type: "p",
      text: "Un repas réussi est un repas que tous les invités peuvent apprécier. Prenez le temps de recenser les besoins particuliers avant de valider le menu.",
    },
    {
      type: "list",
      items: [
        "**Les allergies.** La réglementation européenne distingue quatorze allergènes majeurs, dont le gluten, l'arachide, les fruits à coque, le sésame, le lait, les œufs, le poisson ou les crustacés. Signalez toute allergie à votre traiteur avant de valider le devis, et demandez-lui ce qu'il peut garantir.",
        "**Les invités qui ne mangent pas de viande.** Certaines entrées et salades conviennent, et certains plats peuvent parfois être adaptés. Le plus simple est de le mentionner dès la demande.",
        "**Les enfants et les personnes âgées.** Les portions, les textures et le rythme du service peuvent être pensés pour eux.",
        "**Le halal.** Toute la cuisine de Maison Des Saveurs est halal. Si c'est un point important pour vos familles, posez la question à chaque prestataire que vous consultez.",
      ],
    },
    { type: "h2", id: "lieu-et-service", text: "Anticiper les contraintes du lieu et du service" },
    {
      type: "p",
      text: "La salle conditionne beaucoup de choses. Quelques vérifications auprès du lieu, faites tôt, évitent bien des surprises le jour J.",
    },
    {
      type: "list",
      items: [
        "La salle accepte-t-elle un traiteur extérieur, et à quelles conditions ?",
        "Dispose-t-elle d'un office ou d'une cuisine, et de quels équipements pour réchauffer les plats ?",
        "À quelle heure le traiteur peut-il accéder au lieu, et par où se fait la livraison ?",
        "Les tables, les nappes et la vaisselle sont-elles fournies par la salle ?",
        "Qui sert, qui débarrasse, et qui s'occupe de la vaisselle en fin de soirée ?",
      ],
    },
    {
      type: "p",
      text: "Selon les options choisies, un traiteur peut prendre en charge une grande partie de ces points. Chez Maison Des Saveurs, la livraison, le réchauffage, le dressage, le service en salle avec une équipe d'hommes, de femmes ou mixte, le kit vaisselle individuelle, la décoration de table et la récupération de la vaisselle sont proposés en options, chiffrées dans le devis.",
    },
    {
      type: "figure",
      layout: "portrait",
      image: {
        ...IMG.pouletsPommes,
        caption: "Le dressage des plats, juste avant le service.",
      },
    },
    { type: "h2", id: "questions-traiteur", text: "Les questions à poser à votre traiteur" },
    {
      type: "p",
      text: "Comparer des traiteurs, ce n'est pas seulement comparer des prix. Voici les questions qui vous aideront à savoir à qui vous confiez votre repas.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Qui prépare les plats, et où ?",
        "Quels plats recommandez-vous pour notre nombre d'invités et notre format ?",
        "Comment les plats sont-ils servis : grands plats à partager, assiettes, buffet ?",
        "Qu'est-ce qui est compris dans le devis, et qu'est-ce qui est en option ?",
        "Comment se passent la livraison, le réchauffage et le service le jour J ?",
        "Jusqu'à quand peut-on modifier le nombre d'invités ?",
        "Quel acompte faut-il verser pour réserver la date ?",
        "Comment gérez-vous les allergies et les régimes particuliers ?",
      ],
    },
    { type: "h2", id: "preparer-le-devis", text: "Les informations utiles pour un devis précis" },
    {
      type: "p",
      text: "Plus votre demande est complète, plus la réponse sera juste et rapide. Avant de contacter un traiteur, essayez de réunir ces éléments :",
    },
    {
      type: "aside",
      title: "Votre demande de devis, en un coup d'œil",
      items: [
        "La date et les horaires de la réception",
        "La ville et le lieu, si la salle est déjà réservée",
        "Le nombre d'invités, adultes et enfants",
        "Le format souhaité : repas servi à table, buffet, cocktail ou les deux",
        "Les plats qui vous font envie, même provisoirement",
        "Les options souhaitées : service, vaisselle, décoration, boissons",
        "Les allergies et besoins alimentaires connus",
      ],
    },
    {
      type: "p",
      text: "Pensez aussi au calendrier. Nous recommandons de réserver environ un mois à l'avance, et davantage pour un mariage en haute saison. Chez Maison Des Saveurs, un acompte de 30 % confirme la réservation de la date.",
    },
    { type: "h2", id: "notre-approche", text: "Notre manière d'accompagner un mariage" },
    {
      type: "p",
      text: "Derrière chaque repas que nous préparons, il y a une cheffe qui cuisine depuis l'enfance et compte plus de trente ans d'expérience en cuisine. Pour elle, un mariage n'est jamais une simple commande : c'est un moment de l'histoire d'une famille, auquel elle a la chance de participer. Nous vous racontons [son parcours](/journal/histoire-de-notre-cheffe) dans le Journal.",
    },
    {
      type: "p",
      text: "Concrètement, nous construisons le menu avec vous, nous vous conseillons sur les quantités selon le nombre d'invités et de tables, et nous ajustons les options à votre salle et à votre déroulé. Vous retrouverez l'essentiel de notre offre sur la page [traiteur mariage à Lyon](/traiteur-mariage-lyon) et les réponses aux questions courantes dans notre [FAQ](/faq).",
    },
    {
      type: "cta",
      title: "Vous préparez votre mariage ?",
      text: "Parlons ensemble de votre projet et du repas que vous souhaitez offrir à vos invités.",
      links: [
        { href: "/contact", label: "Demander un devis" },
        { href: "/traiteur-mariage-lyon", label: "Le traiteur mariage" },
      ],
    },
  ],
};
