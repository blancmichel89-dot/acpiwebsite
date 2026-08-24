export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { defaultSettings } from "@/lib/models";

const REF = () => db().collection("settings").doc("company");

export async function GET() {
  const snap = await REF().get();
  if (!snap.exists) {
    const d = defaultSettings();
    await REF().set(d);
    return NextResponse.json(d);
  }
  return NextResponse.json({ ...defaultSettings(), ...snap.data() });
}

export async function PUT(req) {
  const body = await req.json();
  await REF().set(body, { merge: true });
  const snap = await REF().get();
  return NextResponse.json(snap.data());
}
