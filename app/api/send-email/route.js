export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { totals } from "@/lib/totals";
import { eur } from "@/lib/totals";
import { sendDocumentEmail } from "@/lib/gmail";

export async function POST(req) {
  const { documentId, pdfBase64 } = await req.json();

  const docSnap = await db().collection("documents").doc(documentId).get();
  if (!docSnap.exists) {
    return NextResponse.json({ error: "Document introuvable" }, { status: 404 });
  }
  const doc = docSnap.data();

  const clientSnap = await db().collection("clients").doc(doc.clientId).get();
  const client = clientSnap.exists ? clientSnap.data() : null;
  if (!client?.email) {
    return NextResponse.json({ error: "Ce client n'a pas d'adresse email." }, { status: 400 });
  }

  const t = totals(doc);
  const label = doc.type === "devis" ? "Devis" : "Facture";

  try {
    await sendDocumentEmail({
      to: client.email,
      subject: `${label} ${doc.number} — Nicobat`,
      text: [
        `Bonjour ${client.name},`,
        "",
        `Veuillez trouver ci-joint le ${label.toLowerCase()} ${doc.number} d'un montant de ${eur(t.ttc)} TTC.`,
        "",
        "Cordialement,",
        "Nicolas — Nicobat",
      ].join("\n"),
      attachment: pdfBase64
        ? { filename: `${doc.number}.pdf`, mimeType: "application/pdf", base64Content: pdfBase64 }
        : null,
    });
  } catch (err) {
    // Tant que les identifiants Gmail (phase 2) ne sont pas configurés, cette
    // route renverra une erreur explicite plutôt qu'un échec silencieux.
    return NextResponse.json(
      { error: "Envoi Gmail non configuré. Voir lib/gmail.js pour les étapes restantes.", detail: String(err) },
      { status: 500 }
    );
  }

  await db().collection("documents").doc(documentId).update({
    status: "envoye",
    history: [...(doc.history || []), { at: Date.now(), label: "Envoyé par email" }],
  });

  return NextResponse.json({ ok: true });
}
