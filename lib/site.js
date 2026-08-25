export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://nicobat.netlify.app").replace(/\/$/, "");
export const SITE_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Nicobat";
export const CONTACT_EMAIL = "nicobat89@hotmail.com";
export const CONTACT_PHONE = "07 83 72 59 99";
export const CONTACT_PHONE_HREF = "+33783725999";

export const OWNER_NAME = "Nicolas Cenier";
export const STREET_ADDRESS = "1 rue de Cezy";
export const POSTAL_CODE = "89300";
export const LOCALITY = "Chamvres";
export const REGION = "Yonne, Bourgogne-Franche-Comté";
export const FULL_ADDRESS = `${STREET_ADDRESS}, ${POSTAL_CODE} ${LOCALITY}`;
export const SIRET = "901 992 123 00033";

// Coordonnées de la commune de Chamvres (précision niveau ville, pour le
// référencement local et les recherches "autour de moi").
export const GEO = { latitude: 47.9569, longitude: 3.36111 };

// Communes proches de Chamvres où Nicobat intervient.
export const SERVICE_AREA = [
  "Chamvres",
  "Joigny",
  "Auxerre",
  "Sens",
  "Pont-sur-Yonne",
  "Cézy",
  "Épineau-les-Voves",
  "Champvallon",
  "Bassou",
  "Villevallier",
  "Villecien",
];

export const SERVICES = [
  {
    slug: "pose-de-cuisine",
    icon: "kitchen",
    title: "Pose de cuisine sur-mesure",
    short: "Dépose de l'ancienne cuisine, installation des meubles, plan de travail et électroménager, raccordements finis.",
  },
  {
    slug: "renovation-interieure",
    icon: "renovation",
    title: "Rénovation intérieure complète",
    short: "Cloisons, sols, plafonds, peinture et finitions — de la pièce unique à la maison entière.",
  },
  {
    slug: "salle-de-bain",
    icon: "bathroom",
    title: "Rénovation de salle de bain",
    short: "Dépose, faïence, receveur ou baignoire, plomberie de finition, jusqu'à la dernière retouche.",
  },
  {
    slug: "combles",
    icon: "attic",
    title: "Aménagement de combles",
    short: "Isolation, cloisons, sols et finitions pour transformer vos combles en pièce à vivre.",
  },
  {
    slug: "isolation",
    icon: "insulation",
    title: "Isolation & finitions",
    short: "Isolation thermique et phonique, plâtrerie, préparation des supports avant peinture.",
  },
  {
    slug: "peinture",
    icon: "paint",
    title: "Peinture & revêtements",
    short: "Peinture intérieure, revêtements muraux et de sol pour un rendu net et durable.",
  },
  {
    slug: "fenetres-et-portes",
    icon: "window",
    title: "Remplacement de fenêtres et portes",
    short: "Dépose et pose de fenêtres et portes, avec une spécialisation dans l'installation de fenêtres de toit Velux.",
  },
];

export const REALISATIONS = [
  {
    src: "/images/realisations/cuisine-1.jpg",
    title: "Rénovation de cuisine",
    tag: "Cuisine",
    desc: "Plan de travail effet marbre, crédence assortie et hotte noire encastrée sous les meubles hauts.",
  },
  {
    src: "/images/realisations/cuisine-2.jpg",
    title: "Pose de cuisine sur-mesure",
    tag: "Cuisine",
    desc: "Meubles vert sauge avec four et micro-ondes encastrés, plan de travail assorti aux murs en faux marbre.",
  },
  {
    src: "/images/realisations/salle-de-bain-1.jpg",
    title: "Salle de bain sous combles",
    tag: "Salle de bain",
    desc: "Douche à l'italienne avec pare-douche vitré épousant la pente du toit, sous une fenêtre de toit Velux.",
  },
  {
    src: "/images/realisations/salle-de-bain-2.jpg",
    title: "Salle de bain sous poutres apparentes",
    tag: "Salle de bain",
    desc: "Rénovation complète dans un ancien volume à charpente bois : douche, meuble vasque suspendu et miroir sur-mesure.",
  },
  {
    src: "/images/realisations/salle-de-bain-3.jpg",
    title: "Douche à l'italienne",
    tag: "Salle de bain",
    desc: "Faïence bicolore (blanc et bleu canard), colonne de douche avec douchette et receveur extra-plat.",
  },
  {
    src: "/images/realisations/fenetres-velux-1.jpg",
    title: "Pose d'une fenêtre de toit Velux",
    tag: "Fenêtres & Velux",
    desc: "Installation d'un Velux en charpente apparente, avant doublage et isolation des combles.",
  },
  {
    src: "/images/realisations/combles-1.jpg",
    title: "Aménagement de combles",
    tag: "Combles",
    desc: "Habillage en lambris bois sous pente, avec fenêtre de toit intégrée pour l'apport de lumière naturelle.",
  },
  {
    src: "/images/realisations/renovation-1.jpg",
    title: "Rénovation intérieure",
    tag: "Rénovation",
    desc: "Chambre entièrement reprise : sol en lames PVC imitation bois posé, murs et radiateur repeints.",
  },
];

export const TRUST_POINTS = [
  "Devis gratuit et sans engagement",
  "Artisan assuré, garantie décennale",
  "Un seul interlocuteur du début à la fin",
  "Chantier propre, délais tenus",
];

export const FAQ_ITEMS = [
  {
    question: "Le devis est-il vraiment gratuit ?",
    answer:
      "Oui. Nicolas se déplace pour évaluer votre projet et vous remet un devis détaillé, sans frais et sans engagement de votre part.",
  },
  {
    question: "Êtes-vous assuré pour les travaux ?",
    answer:
      `${OWNER_NAME} exerce sous le statut ${SITE_NAME} (SIRET ${SIRET}), couvert par une assurance professionnelle et une garantie décennale.`,
  },
  {
    question: "Dans quelles communes intervenez-vous ?",
    answer:
      `Nicobat intervient à ${LOCALITY} et dans les communes voisines de l'Yonne : ${SERVICE_AREA.slice(1).join(", ")}. Contactez-nous si votre commune n'est pas listée, la zone peut s'étendre selon le chantier.`,
  },
  {
    question: "Prenez-vous en charge la pose de cuisine seule ?",
    answer:
      "Oui. Nicobat prend en charge la pose complète de votre cuisine — dépose de l'ancienne, installation des meubles, du plan de travail et de l'électroménager — quel que soit le fournisseur auprès duquel vous l'avez achetée.",
  },
  {
    question: "Un acompte est-il demandé avant de commencer ?",
    answer:
      "Les modalités (acompte éventuel, échéancier) sont précisées sur le devis avant le début du chantier, en toute transparence.",
  },
  {
    question: "Travaillez-vous avec les particuliers et les professionnels ?",
    answer:
      "Oui, Nicobat intervient aussi bien pour des particuliers que pour des professionnels sur leurs projets de rénovation et d'aménagement intérieur.",
  },
];
