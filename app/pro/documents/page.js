"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { totals, eur } from "@/lib/totals";
import { STATUS } from "@/lib/models";

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [docsRes, clientsRes] = await Promise.all([
      fetch("/api/documents").then((r) => r.json()),
      fetch("/api/clients").then((r) => r.json()),
    ]);
    setDocs(docsRes);
    setClients(clientsRes);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function createDocument(type) {
    const res = await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
    const created = await res.json();
    window.location.href = `/pro/documents/${created.id}`;
  }

  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]));

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, margin: 0 }}>Devis &amp; Factures</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => createDocument("devis")} style={btnPrimary}>+ Nouveau devis</button>
          <button onClick={() => createDocument("facture")} style={btnGhost}>+ Nouvelle facture</button>
        </div>
      </header>

      {loading ? (
        <p style={{ color: "var(--ink-3)" }}>Chargement…</p>
      ) : docs.length === 0 ? (
        <p style={{ color: "var(--ink-3)" }}>Aucun document pour l'instant.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {docs.map((d) => {
            const t = totals(d);
            const c = clientMap[d.clientId];
            return (
              <Link
                key={d.id}
                href={`/pro/documents/${d.id}`}
                style={{
                  display: "grid", gridTemplateColumns: "100px 1fr 140px 110px 100px", gap: 14,
                  padding: "13px 16px", background: "var(--paper-2)", border: "1px solid var(--line)",
                  borderRadius: 10, textDecoration: "none", color: "var(--ink)", alignItems: "center",
                }}
              >
                <span className="num" style={{ fontSize: 12, color: "var(--ink-3)" }}>{d.number}</span>
                <span style={{ fontWeight: 600 }}>{c ? c.name : "Client non défini"}</span>
                <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{d.date}</span>
                <span className="num" style={{ fontWeight: 700, textAlign: "right" }}>{eur(t.ttc)}</span>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{STATUS[d.status]?.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

const btnPrimary = { padding: "9px 14px", background: "var(--chalk)", color: "var(--chalk-ink)", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13 };
const btnGhost = { padding: "9px 14px", background: "transparent", border: "1px solid var(--line)", borderRadius: 8, fontWeight: 600, fontSize: 13 };
