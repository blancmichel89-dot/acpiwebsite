"use client";

import { useEffect, useState } from "react";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [draft, setDraft] = useState({ name: "", civility: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setClients(await fetch("/api/clients").then((r) => r.json()));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function add() {
    if (!draft.name.trim()) return;
    await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    setDraft({ name: "", civility: "", email: "", phone: "", address: "" });
    load();
  }

  const inputStyle = { padding: "8px 10px", border: "1px solid var(--line)", borderRadius: 7, fontSize: 13 };

  return (
    <div>
      <h1 style={{ fontSize: 26, marginBottom: 18 }}>Clients</h1>

      <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr 1fr 1fr auto", gap: 8, marginBottom: 18, background: "var(--paper-2)", padding: 14, borderRadius: 10, border: "1px solid var(--line)" }}>
        <select style={inputStyle} value={draft.civility} onChange={(e) => setDraft({ ...draft, civility: e.target.value })}>
          <option value="">—</option>
          <option value="M.">M.</option>
          <option value="Mme">Mme</option>
        </select>
        <input style={inputStyle} placeholder="Nom / société" spellCheck="true" lang="fr" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        <input style={inputStyle} placeholder="Email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
        <input style={inputStyle} placeholder="Téléphone" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
        <input style={inputStyle} placeholder="Adresse" spellCheck="true" lang="fr" value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} />
        <button onClick={add} style={{ padding: "9px 14px", background: "var(--chalk)", color: "var(--chalk-ink)", border: "none", borderRadius: 8, fontWeight: 700 }}>
          Ajouter
        </button>
      </div>

      {loading ? (
        <p style={{ color: "var(--ink-3)" }}>Chargement…</p>
      ) : clients.length === 0 ? (
        <p style={{ color: "var(--ink-3)" }}>Aucun client enregistré.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {clients.map((c) => (
            <div key={c.id} style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr 1fr 1fr", gap: 8, padding: "10px 14px", border: "1px solid var(--line)", borderRadius: 9 }}>
              <span style={{ color: "var(--ink-3)" }}>{c.civility || "—"}</span>
              <strong>{c.name}</strong>
              <span>{c.email || "—"}</span>
              <span>{c.phone || "—"}</span>
              <span>{c.address || "—"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
