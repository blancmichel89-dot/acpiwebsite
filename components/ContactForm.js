"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...form }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  }

  const mailtoHref = () => {
    const subject = `Demande de devis — ${form.name || "Site internet"}`;
    const body = [
      `Nom : ${form.name}`,
      `Email : ${form.email}`,
      `Téléphone : ${form.phone}`,
      "",
      form.message,
    ].join("\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (status === "sent") {
    return (
      <div className="card" style={{ textAlign: "center", padding: "48px 26px" }}>
        <h3 style={{ fontSize: 20, marginBottom: 10 }}>Demande envoyée !</h3>
        <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6 }}>
          Merci {form.name || ""}, Nicolas a bien reçu votre demande et vous
          recontacte rapidement pour établir votre devis.
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      className="card"
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      {/* Required so Netlify's bot detects this form at build time */}
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ display: "none" }}>
        <label>
          Ne pas remplir : <input name="bot-field" onChange={() => {}} />
        </label>
      </p>

      <div className="field">
        <label htmlFor="name">Nom</label>
        <input id="name" name="name" required placeholder="Votre nom" spellCheck="true" lang="fr" value={form.name} onChange={set("name")} />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" required type="email" placeholder="vous@exemple.fr" value={form.email} onChange={set("email")} />
      </div>
      <div className="field">
        <label htmlFor="phone">Téléphone (optionnel)</label>
        <input id="phone" name="phone" placeholder="06 12 34 56 78" value={form.phone} onChange={set("phone")} />
      </div>
      <div className="field">
        <label htmlFor="message">Votre projet</label>
        <textarea id="message" name="message" required placeholder="Décrivez votre projet : type de travaux, surface, délai souhaité..." rows={5} spellCheck="true" lang="fr" value={form.message} onChange={set("message")} />
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={status === "sending"}>
        {status === "sending" ? "Envoi en cours..." : "Envoyer la demande"}
      </button>

      {status === "error" && (
        <p style={{ fontSize: 13, color: "var(--brick)", margin: 0 }}>
          L&apos;envoi a échoué. Vous pouvez{" "}
          <a href={mailtoHref()} style={{ color: "var(--brick)", fontWeight: 700 }}>
            envoyer votre demande par email
          </a>{" "}
          à la place, ou appeler directement.
        </p>
      )}
      <p style={{ fontSize: 12.5, color: "var(--ink-3)", margin: 0 }}>
        Votre demande est transmise directement à {CONTACT_EMAIL}.
      </p>
    </form>
  );
}
