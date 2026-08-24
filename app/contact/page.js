"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    const subject = `Demande de devis — ${form.name || "Site internet"}`;
    const body = [
      `Nom : ${form.name}`,
      `Email : ${form.email}`,
      `Téléphone : ${form.phone}`,
      "",
      form.message,
    ].join("\n");
    // Pas de backend pour l'instant : on ouvre directement le client mail de
    // Nicolas avec le message pré-rempli. Une vraie soumission automatique
    // (enregistrée en base) pourra être branchée plus tard sur cette même page.
    window.location.href = `mailto:nicobat89@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const inputStyle = { padding: "10px 12px", border: "1px solid var(--line)", borderRadius: 8, fontSize: 14 };

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "64px 24px" }}>
      <Link href="/" style={{ fontSize: 13, color: "var(--ink-3)", textDecoration: "none" }}>← Accueil</Link>
      <h1 style={{ fontSize: 32, margin: "14px 0 10px" }}>Demander un devis</h1>
      <p style={{ color: "var(--ink-2)", marginBottom: 24 }}>
        Décrivez votre projet, Nicolas vous recontacte pour établir un devis.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input required style={inputStyle} placeholder="Nom" spellCheck="true" lang="fr" value={form.name} onChange={set("name")} />
        <input required type="email" style={inputStyle} placeholder="Email" value={form.email} onChange={set("email")} />
        <input style={inputStyle} placeholder="Téléphone" value={form.phone} onChange={set("phone")} />
        <textarea required style={inputStyle} placeholder="Décrivez votre projet" rows={5} spellCheck="true" lang="fr" value={form.message} onChange={set("message")} />
        <button type="submit" style={{ padding: "12px 20px", background: "var(--chalk)", color: "var(--chalk-ink)", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14 }}>
          Envoyer la demande
        </button>
        <p style={{ fontSize: 12, color: "var(--ink-3)", margin: 0 }}>
          Ouvre votre messagerie avec le message pré-rempli, à destination de nicobat89@hotmail.com.
        </p>
      </form>
    </main>
  );
}
