"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, CloseIcon, PhoneIcon } from "./Icons";
import { CONTACT_PHONE, CONTACT_PHONE_HREF, SITE_NAME } from "@/lib/site";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/#services", label: "Prestations" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">N</span>
          {SITE_NAME}
        </Link>

        <nav className="nav-links" aria-label="Navigation principale">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>

        <div className="nav-actions">
          <a href={`tel:${CONTACT_PHONE_HREF}`} className="btn btn-outline nav-phone">
            <PhoneIcon />
            {CONTACT_PHONE}
          </a>
          <Link href="/contact" className="btn btn-primary">Demander un devis</Link>
          <button
            type="button"
            className="btn btn-outline nav-toggle"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{ padding: 10 }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Navigation mobile"
          style={{
            position: "absolute",
            top: "var(--header-h)",
            left: 0,
            right: 0,
            background: "var(--paper-3)",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            padding: "10px 24px 20px",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ padding: "12px 4px", fontWeight: 600, borderTop: "1px solid var(--line)" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
