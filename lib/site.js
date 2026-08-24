export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://nicobat.netlify.app").replace(/\/$/, "");
export const SITE_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Nicobat";
export const CONTACT_EMAIL = "nicobat89@hotmail.com";
export const CONTACT_PHONE = "07 83 72 59 99";
export const CONTACT_PHONE_HREF = "+33783725999";

export const LOCALITY = "Chamvres";
export const REGION = "Yonne, Bourgogne-Franche-Comté";

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
];

export const TRUST_POINTS = [
  "Devis gratuit et sans engagement",
  "Artisan local, un seul interlocuteur du début à la fin",
  "Chantier propre, délais tenus",
  "Conseils sur les matériaux et les finitions",
];
