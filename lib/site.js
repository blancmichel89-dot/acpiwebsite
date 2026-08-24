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

// Communes proches de Chamvres où Nicobat intervient.
export const SERVICE_AREA = [
  "Chamvres",
  "Joigny",
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
    desc: "Plan de travail effet marbre, hotte design",
  },
  {
    src: "/images/realisations/cuisine-2.jpg",
    title: "Pose de cuisine sur-mesure",
    tag: "Cuisine",
    desc: "Meubles vert sauge, finitions sur-mesure",
  },
  {
    src: "/images/realisations/salle-de-bain-1.jpg",
    title: "Salle de bain sous combles",
    tag: "Salle de bain",
    desc: "Douche à l'italienne, faïence sur-mesure",
  },
  {
    src: "/images/realisations/salle-de-bain-2.jpg",
    title: "Salle de bain accessible",
    tag: "Salle de bain",
    desc: "Douche de plain-pied sous poutres apparentes",
  },
  {
    src: "/images/realisations/salle-de-bain-3.jpg",
    title: "Douche à l'italienne",
    tag: "Salle de bain",
    desc: "Faïence bicolore, receveur extra-plat",
  },
  {
    src: "/images/realisations/fenetres-velux-1.jpg",
    title: "Pose d'une fenêtre de toit Velux",
    tag: "Fenêtres & Velux",
    desc: "Installation en charpente apparente",
  },
  {
    src: "/images/realisations/combles-1.jpg",
    title: "Aménagement de combles",
    tag: "Combles",
    desc: "Habillage bois et isolation",
  },
  {
    src: "/images/realisations/renovation-1.jpg",
    title: "Rénovation intérieure",
    tag: "Rénovation",
    desc: "Sol et peinture refaits à neuf",
  },
];

export const TRUST_POINTS = [
  "Devis gratuit et sans engagement",
  "Artisan local, un seul interlocuteur du début à la fin",
  "Chantier propre, délais tenus",
  "Conseils sur les matériaux et les finitions",
];
