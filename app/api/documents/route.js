export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { emptyDocument, defaultSettings } from "@/lib/models";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // "devis" | "facture" | null (tous)

  let query = db().collection("documents").orderBy("createdAt", "desc");
  const snap = await query.get();
  let docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  if (type) docs = docs.filter((d) => d.type === type);

  return NextResponse.json(docs);
}

export async function POST(req) {
  const body = await req.json(); // { type: "devis" | "facture" }
  const type = body.type === "facture" ? "facture" : "devis";
  const counterField = type === "devis" ? "devisNextNumber" : "factureNextNumber";
  const settingsRef = db().collection("settings").doc("company");
  const docRef = db().collection("documents").doc();

  // Transaction : lit le prochain numéro, l'incrémente, et crée le document
  // dans la même opération, pour éviter deux devis avec le même numéro en
  // cas de créations simultanées.
  const created = await db().runTransaction(async (tx) => {
    const settingsSnap = await tx.get(settingsRef);
    const settings = settingsSnap.exists ? settingsSnap.data() : defaultSettings();
    const number = String(settings[counterField] ?? 1);

    const doc = {
      ...emptyDocument(type),
      number,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    tx.set(settingsRef, { [counterField]: Number(number) + 1 }, { merge: true });
    tx.set(docRef, doc);
    return { id: docRef.id, ...doc };
  });

  return NextResponse.json(created);
}

