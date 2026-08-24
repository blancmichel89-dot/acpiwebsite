export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET() {
  const snap = await db().collection("clients").orderBy("createdAt", "desc").get();
  const clients = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json(clients);
}

export async function POST(req) {
  const body = await req.json();
  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Le nom du client est requis." }, { status: 400 });
  }
  const ref = await db().collection("clients").add({
    name: body.name,
    civility: body.civility || "",
    email: body.email || "",
    phone: body.phone || "",
    address: body.address || "",
    createdAt: Date.now(),
  });
  return NextResponse.json({ id: ref.id });
}
