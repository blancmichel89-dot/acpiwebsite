export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET(_req, { params }) {
  const snap = await db().collection("documents").doc(params.id).get();
  if (!snap.exists) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json({ id: snap.id, ...snap.data() });
}

export async function PATCH(req, { params }) {
  const patch = await req.json();
  const ref = db().collection("documents").doc(params.id);

  // Si un changement de statut ou d'acompte est fourni, on trace l'historique
  const updates = { ...patch, updatedAt: Date.now() };
  if (patch.historyEntry) {
    const snap = await ref.get();
    const current = snap.data();
    updates.history = [...(current.history || []), { at: Date.now(), label: patch.historyEntry }];
    delete updates.historyEntry;
  }

  await ref.update(updates);
  const updated = await ref.get();
  return NextResponse.json({ id: updated.id, ...updated.data() });
}

export async function DELETE(_req, { params }) {
  await db().collection("documents").doc(params.id).delete();
  return NextResponse.json({ ok: true });
}
