"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

export default function ContactForm() {
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
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="field">
        <label htmlFor="name">Nom</label>
        <input id="name" required placeholder="Votre nom" spellCheck="true" lang="fr" value={form.name} onChange={set("name")} />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" required type="email" placeholder="vous@exemple.fr" value={form.email} onChange={set("email")} />
      </div>
      <div className="field">
        <label htmlFor="phone">Téléphone (optionnel)</label>
        <input id="phone" placeholder="06 12 34 56 78" value={form.phone} onChange={set("phone")} />
      </div>
      <div className="field">
        <label htmlFor="message">Votre projet</label>
        <textarea id="message" required placeholder="Décrivez votre projet : type de travaux, surface, délai souhaité..." rows={5} spellCheck="true" lang="fr" value={form.message} onChange={set("message")} />
      </div>
      <button type="submit" className="btn btn-primary btn-block">Envoyer la demande</button>
      <p style={{ fontSize: 12.5, color: "var(--ink-3)", margin: 0 }}>
        Ouvre votre messagerie avec le message pré-rempli, à destination de {CONTACT_EMAIL}.
      </p>
    </form>
  );
}
