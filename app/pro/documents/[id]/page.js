"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { totals, eur, acompteAmount } from "@/lib/totals";
import { STATUS, emptyLine } from "@/lib/models";

export default function DocumentEditorPage() {
  const { id } = useParams();
  const router = useRouter();
  const [doc, setDoc] = useState(null);
  const [clients, setClients] = useState([]);

  async function load() {
    const [d, c] = await Promise.all([
      fetch(`/api/documents/${id}`).then((r) => r.json()),
      fetch("/api/clients").then((r) => r.json()),
    ]);
    setDoc(d);
    setClients(c);
  }

  useEffect(() => { load(); }, [id]);

  async function patch(body, historyEntry) {
    const res = await fetch(`/api/documents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(historyEntry ? { ...body, historyEntry } : body),
    });
    setDoc(await res.json());
  }

  async function convertToFacture() {
    const res = await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "facture" }),
    });
    const facture = await res.json();
    await fetch(`/api/documents/${facture.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId: doc.clientId, lines: doc.lines, tva: doc.tva, acompte: doc.acompte }),
    });
    await patch({ status: "facture" }, `Transformé en facture`);
    router.push(`/pro/documents/${facture.id}`);
  }

  async function sendEmail() {
    // NOTE : le PDF n'est pas encore joint automatiquement ici — en phase 2,
    // générer le PDF côté serveur (ex: Puppeteer sur Cloud Run) et le passer
    // en base64 dans pdfBase64. Pour l'instant, utiliser "Imprimer / PDF" pour
    // exporter manuellement le document et le joindre.
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId: id }),
    });
    const result = await res.json();
    if (!res.ok) {
      alert(result.error || "Envoi impossible pour le moment.");
      return;
    }
    load();
  }

  if (!doc) return <p style={{ color: "var(--ink-3)" }}>Chargement…</p>;

  const t = totals(doc);
  const inputStyle = { padding: "8px 10px", border: "1px solid var(--line)", borderRadius: 7, fontSize: 13, width: "100%" };

  function setLine(idx, field, value) {
    const lines = doc.lines.map((l, i) => (i === idx ? { ...l, [field]: value } : l));
    patch({ lines });
  }
  function addLine() { patch({ lines: [...doc.lines, emptyLine()] }); }
  function removeLine(idx) { patch({ lines: doc.lines.filter((_, i) => i !== idx) }); }

  return (
    <div>
      <button onClick={() => router.push("/pro/documents")} style={{ background: "none", border: "none", color: "var(--ink-3)", marginBottom: 14, padding: 0 }}>
        ← Retour
      </button>

      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase" }}>{doc.type}</div>
          <h1 className="num" style={{ fontSize: 28, margin: "2px 0 0" }}>{doc.number}</h1>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>{STATUS[doc.status]?.label}</span>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px", gap: 10, marginBottom: 20 }}>
        <select style={inputStyle} value={doc.clientId} onChange={(e) => patch({ clientId: e.target.value })}>
          <option value="">— Client —</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="date" style={inputStyle} value={doc.date} onChange={(e) => patch({ date: e.target.value })} />
        <input type="number" style={inputStyle} value={doc.tva} onChange={(e) => patch({ tva: e.target.value })} placeholder="TVA %" />
      </div>

      <div style={{ border: "1px solid var(--line)", borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
        {doc.lines.map((l, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 70px 90px 110px 110px 32px", gap: 8, padding: "8px 12px", borderTop: i ? "1px solid var(--line)" : "none", alignItems: "center" }}>
            <input style={inputStyle} placeholder="Description" spellCheck="true" lang="fr" value={l.desc} onChange={(e) => setLine(i, "desc", e.target.value)} />
            <input type="number" style={inputStyle} value={l.qty} onChange={(e) => setLine(i, "qty", e.target.value)} />
            <input style={inputStyle} value={l.unit} onChange={(e) => setLine(i, "unit", e.target.value)} />
            <input type="number" style={inputStyle} value={l.price} onChange={(e) => setLine(i, "price", e.target.value)} />
            <span className="num" style={{ textAlign: "right" }}>{eur((Number(l.qty) || 0) * (Number(l.price) || 0))}</span>
            <button onClick={() => removeLine(i)} style={{ background: "none", border: "none", color: "var(--brick)" }}>✕</button>
          </div>
        ))}
        <button onClick={addLine} style={{ width: "100%", padding: "9px 12px", background: "none", border: "none", borderTop: "1px solid var(--line)" }}>+ Ajouter une ligne</button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 22 }}>
        <div style={{ minWidth: 260, padding: 14, border: "1px solid var(--line)", borderRadius: 10 }}>
          <label style={{ display: "flex", gap: 8, fontWeight: 700, fontSize: 13 }}>
            <input type="checkbox" checked={doc.acompte?.active} onChange={(e) => patch({ acompte: { ...doc.acompte, active: e.target.checked } })} />
            Demander un acompte
          </label>
          {doc.acompte?.active && (
            <div style={{ marginTop: 10 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input type="number" style={{ ...inputStyle, width: 80 }} value={doc.acompte.value} onChange={(e) => patch({ acompte: { ...doc.acompte, value: e.target.value } })} />
                <select style={inputStyle} value={doc.acompte.mode} onChange={(e) => patch({ acompte: { ...doc.acompte, mode: e.target.value } })}>
                  <option value="percent">% du TTC</option>
                  <option value="montant">€ fixe</option>
                </select>
              </div>
              <button
                onClick={() => patch(
                  { acompte: { ...doc.acompte, recu: !doc.acompte.recu, dateRecu: !doc.acompte.recu ? new Date().toISOString().slice(0, 10) : null } },
                  !doc.acompte.recu ? "Acompte marqué reçu" : "Acompte marqué non reçu"
                )}
                style={{ marginTop: 10, padding: "7px 12px", borderRadius: 7, fontSize: 12, fontWeight: 700, border: "1px solid var(--line)" }}
              >
                {doc.acompte.recu ? `Reçu le ${doc.acompte.dateRecu}` : "Marquer comme reçu"}
              </button>
            </div>
          )}
        </div>

        <div style={{ width: 240 }}>
          <Row label="Total HT" value={t.ht} />
          <Row label={`TVA (${doc.tva}%)`} value={t.tva} />
          <Row label="Total TTC" value={t.ttc} big />
          {doc.acompte?.active && (
            <>
              <Row label={`Acompte ${doc.acompte.recu ? "reçu" : "demandé"}`} value={-acompteAmount(doc, t)} />
              <Row label="Solde restant dû" value={t.ttc - acompteAmount(doc, t)} big />
            </>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => router.push(`/pro/documents/${id}/print`)} style={btnGhost}>Imprimer / PDF</button>
        <button onClick={sendEmail} style={btnGhost}>Envoyer par email</button>
        {doc.status !== "accepte" && doc.status !== "paye" && (
          <button onClick={() => patch({ status: "accepte" }, "Statut → Accepté")} style={btnGhost}>Marquer accepté</button>
        )}
        {doc.type === "devis" && doc.status !== "facture" && (
          <button onClick={convertToFacture} style={btnPrimary}>Transformer en facture</button>
        )}
        {doc.type === "facture" && doc.status !== "paye" && (
          <button onClick={() => patch({ status: "paye" }, "Statut → Payé")} style={btnPrimary}>Marquer payée</button>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, big }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: big ? "2px solid var(--ink)" : "none" }}>
      <span style={{ fontSize: big ? 14 : 13, fontWeight: big ? 700 : 500 }}>{label}</span>
      <span className="num" style={{ fontSize: big ? 18 : 13, fontWeight: 700 }}>{eur(value)}</span>
    </div>
  );
}

const btnPrimary = { padding: "10px 14px", background: "var(--chalk)", color: "var(--chalk-ink)", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13 };
const btnGhost = { padding: "10px 14px", background: "transparent", border: "1px solid var(--line)", borderRadius: 8, fontWeight: 600, fontSize: 13 };
