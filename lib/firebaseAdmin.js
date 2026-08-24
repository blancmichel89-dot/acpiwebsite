import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Sur Netlify (ou tout hébergeur hors Google Cloud), il n'y a pas
 * d'identifiants automatiques : on doit fournir explicitement une clé de
 * compte de service Firebase, stockée dans la variable d'environnement
 * FIREBASE_SERVICE_ACCOUNT_KEY.
 *
 * Cette clé s'obtient gratuitement (sans carte bancaire) depuis :
 * Console Firebase > Paramètres du projet > Comptes de service >
 * "Générer une nouvelle clé privée" (télécharge un fichier .json).
 *
 * Pour éviter les soucis de sauts de ligne dans la clé privée RSA lors du
 * collage dans Netlify, on accepte soit le JSON brut, soit une version
 * encodée en base64 (recommandé) — voir .env.example.
 */
function getAdminApp() {
  if (getApps().length) return getApps()[0];

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_KEY manquante. Voir .env.example pour l'obtenir depuis la console Firebase."
    );
  }

  const jsonText = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
  const serviceAccount = JSON.parse(jsonText);

  return initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
}

export function db() {
  return getFirestore(getAdminApp());
}
