import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, FULL_ADDRESS, LOCALITY, OWNER_NAME, REGION, SITE_NAME, SERVICES, SERVICE_AREA } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: 14 }}>
              <span className="logo-mark">N</span>
              {SITE_NAME}
            </Link>
            <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6, maxWidth: 320, marginTop: 14 }}>
              {OWNER_NAME} — artisan spécialisé en rénovation intérieure et
              pose de cuisine, basé à {LOCALITY} ({REGION}). Devis gratuit,
              chantier soigné.
            </p>
            <p style={{ marginTop: 16, fontSize: 14.5, color: "var(--ink-2)" }}>{FULL_ADDRESS}</p>
            <p style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
              <a href={`tel:${CONTACT_PHONE_HREF}`} style={{ display: "inline-block", padding: "6px 0", fontSize: 14.5, fontWeight: 700, color: "var(--chalk-2)", textDecoration: "none" }}>
                {CONTACT_PHONE}
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ display: "inline-block", padding: "6px 0", fontSize: 14.5, fontWeight: 700, color: "var(--chalk-2)", textDecoration: "none" }}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <div>
            <h3 className="footer-heading">Prestations</h3>
            <div className="footer-links">
              {SERVICES.slice(0, 5).map((s) => (
                <Link key={s.slug} href={s.href || `/#${s.slug}`}>{s.title}</Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Zone d&apos;intervention</h3>
            <p style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.8 }}>
              {SERVICE_AREA.join(" · ")}
            </p>
            <div className="footer-links" style={{ marginTop: 16 }}>
              <Link href="/realisations">Réalisations</Link>
              <Link href="/contact">Demander un devis</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {SITE_NAME} — Rénovation intérieure &amp; pose de cuisine.</span>
          <div style={{ display: "flex", gap: 18 }}>
            <Link href="/mentions-legales" style={{ textDecoration: "none" }}>Mentions légales</Link>
            <Link href="/pro" style={{ textDecoration: "none" }}>Espace professionnel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
