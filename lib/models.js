/**
 * Modèle de données Firestore.
 *
 * Collections :
 *
 *  clients/{clientId}
 *    - name: string
 *    - email: string
 *    - phone: string
 *    - address: string
 *    - createdAt: timestamp
 *
 *  documents/{docId}           (devis ET factures dans la même collection,
 *                                distingués par le champ `type`)
 *    - type: "devis" | "facture"
 *    - number: string            ex: "DEV-2026-004"
 *    - clientId: string          référence vers clients/{clientId}
 *    - date: string (YYYY-MM-DD)
 *    - status: "brouillon" | "envoye" | "accepte" | "refuse" | "facture" | "paye"
 *    - tva: number                ex: 10
 *    - lines: Array<{ desc, qty, unit, price }>
 *    - acompte: { active, mode: "percent"|"montant", value, recu, dateRecu }
 *    - note: string
 *    - history: Array<{ at: timestamp, label: string }>
 *    - createdAt / updatedAt: timestamp
 *
 * Convention de numérotation : compteur séquentiel simple par type, stocké
 * dans settings/company (devisNextNumber / factureNextNumber) — voir
 * app/pro/settings pour l'ajuster et app/api/documents/route.js pour
 * l'incrémentation.
 */

export const STATUS = {
  brouillon: { label: "Brouillon" },
  envoye: { label: "Envoyé" },
  accepte: { label: "Accepté" },
  refuse: { label: "Refusé" },
  facture: { label: "Facturé" },
  paye: { label: "Payé" },
};

export const emptyLine = () => ({ desc: "", qty: 1, unit: "u", price: 0 });

export const emptyDocument = (type = "devis") => ({
  type,
  number: "",
  clientId: "",
  date: new Date().toISOString().slice(0, 10),
  status: "brouillon",
  tva: 10,
  lines: [emptyLine()],
  note: "",
  acompte: { active: false, mode: "percent", value: 30, recu: false, dateRecu: null },
  history: [{ at: Date.now(), label: "Créé" }],
});

/**
 * Paramètres entreprise — un seul document Firestore (settings/company).
 * devisNextNumber / factureNextNumber pilotent la numérotation séquentielle :
 * on les incrémente à chaque création pour continuer la série déjà utilisée
 * par Nicolas en dehors de l'application (ex: reprendre à 192 après le
 * "Devis 191" déjà émis).
 */
export const defaultSettings = () => ({
  name: "Nicobat",
  address: "",
  postalCity: "",
  city: "",
  phone: "",
  email: "",
  siret: "",
  tvaNumber: "",
  devisNextNumber: 1,
  factureNextNumber: 1,
});
