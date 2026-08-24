import { google } from "googleapis";

/**
 * === À FINALISER EN PHASE 2 ===
 *
 * Étapes préalables dans Google Cloud Console :
 *  1. Activer "Gmail API" (APIs & Services > Bibliothèque)
 *  2. Configurer l'écran de consentement OAuth (nom app "Nicobat", logo, scope
 *     https://www.googleapis.com/auth/gmail.send)
 *  3. Créer un identifiant OAuth "Application Web" -> récupérer client_id / client_secret
 *  4. Faire une seule fois le flux d'autorisation avec le compte Gmail de
 *     Nicolas pour obtenir un refresh_token, à stocker dans GMAIL_REFRESH_TOKEN
 *
 * Une fois ces 4 variables renseignées dans .env, sendDocumentEmail()
 * fonctionnera sans rien changer au reste de l'application.
 */

function getOAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );
  client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
  return client;
}

function buildRawMessage({ to, subject, text, attachment }) {
  const boundary = "nicobat_boundary";
  const headers = [
    `From: ${process.env.GMAIL_SENDER_ADDRESS}`,
    `To: ${to}`,
    `Subject: =?utf-8?B?${Buffer.from(subject).toString("base64")}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    text,
  ];

  if (attachment) {
    headers.push(
      `--${boundary}`,
      `Content-Type: ${attachment.mimeType}; name="${attachment.filename}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${attachment.filename}"`,
      "",
      attachment.base64Content
    );
  }
  headers.push(`--${boundary}--`);

  return Buffer.from(headers.join("\r\n"))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Envoie un devis/facture par email depuis le compte Gmail de Nicolas.
 * `attachment` est optionnel : { filename, mimeType, base64Content } (le PDF).
 */
export async function sendDocumentEmail({ to, subject, text, attachment }) {
  const auth = getOAuthClient();
  const gmail = google.gmail({ version: "v1", auth });
  const raw = buildRawMessage({ to, subject, text, attachment });

  return gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
}
