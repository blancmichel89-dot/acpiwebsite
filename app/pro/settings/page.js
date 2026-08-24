"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then(setSettings);
  }, []);

  async function save() {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSettings(await res.json());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!settings) return <p style={{ color: "var(--ink-3)" }}>Chargement…</p>;

  const inputStyle = { padding: "9px 11px", border: "1px solid var(--line)", borderRadius: 7, fontSize: 13, width: "100%" };
  const set = (k) => (e) => setSettings({ ...settings, [k]: e.target.value });

  return (
    <div style={{ maxWidth: 560 }}>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>Paramètres entreprise</h1>
      <p style={{ color: "var(--ink-3)", fontSize: 13, marginBottom: 24 }}>
        Ces informations apparaissent sur l'en-tête de tous les devis et factures.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Nom de l'entreprise">
          <input style={inputStyle} value={settings.name} onChange={set("name")} />
        </Field>
        <Field label="Adresse">
          <input style={inputStyle} value={settings.address} onChange={set("address")} placeholder="1 rue de Cezy" />
        </Field>
        <Field label="Code postal / Ville">
          <input style={inputStyle} value={settings.postalCity} onChange={set("postalCity")} placeholder="89300 CHAMVRES" />
        </Field>
        <Field label="Ville (pour la date, ex : Chamvres)">
          <input style={inputStyle} value={settings.city} onChange={set("city")} placeholder="Chamvres" />
        </Field>
        <Field label="Téléphone">
          <input style={inputStyle} value={settings.phone} onChange={set("phone")} placeholder="07.83.72.59.99" />
        </Field>
        <Field label="Email">
          <input style={inputStyle} value={settings.email} onChange={set("email")} placeholder="nicobat89@hotmail.com" />
        </Field>
        <Field label="N° SIRET">
          <input style={inputStyle} value={settings.siret} onChange={set("siret")} />
        </Field>
        <Field label="N° TVA intracommunautaire">
          <input style={inputStyle} value={settings.tvaNumber} onChange={set("tvaNumber")} />
        </Field>

        <div style={{ height: 1, background: "var(--line)", margin: "6px 0" }} />

        <p style={{ fontSize: 12, color: "var(--ink-3)", margin: 0 }}>
          Numérotation — prochain numéro qui sera attribué. À ajuster une seule fois
          pour reprendre une série déjà en cours (ex : 192 si le dernier devis papier était le 191).
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Prochain n° de devis">
            <input type="number" style={inputStyle} value={settings.devisNextNumber} onChange={set("devisNextNumber")} />
          </Field>
          <Field label="Prochain n° de facture">
            <input type="number" style={inputStyle} value={settings.factureNextNumber} onChange={set("factureNextNumber")} />
          </Field>
        </div>

        <button
          onClick={save}
          style={{ marginTop: 10, padding: "11px 16px", background: "var(--chalk)", color: "var(--chalk-ink)", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, alignSelf: "flex-start" }}
        >
          {saved ? "Enregistré ✓" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 5 }}>
        {label}
      </span>
      {children}
    </label>
  );
}
