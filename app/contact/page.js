import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { MailIcon, PhoneIcon, PinIcon, CheckIcon } from "@/components/Icons";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, LOCALITY, SERVICE_AREA, SITE_NAME } from "@/lib/site";

export const metadata = {
  title: "Contact — Demander un devis",
  description:
    "Demandez un devis gratuit à Nicobat pour vos travaux de rénovation intérieure ou de pose de cuisine à Chamvres et dans l'Yonne.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="section-tight">
      <div className="wrap">
        <Link href="/" className="breadcrumb">← Accueil</Link>

        <div className="section-head" style={{ marginTop: 16 }}>
          <div className="eyebrow">Contact</div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 38px)", marginTop: 8 }}>Demander un devis</h1>
          <p>
            Décrivez votre projet de rénovation intérieure ou de pose de
            cuisine, {SITE_NAME} vous recontacte pour établir un devis
            gratuit et sans engagement.
          </p>
        </div>

        <div className="contact-grid">
          <ContactForm />

          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div className="contact-info-row">
              <div className="icon-badge"><PhoneIcon /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>Téléphone</div>
                <a href={`tel:${CONTACT_PHONE_HREF}`} style={{ fontSize: 14.5, color: "var(--ink-2)", textDecoration: "none" }}>
                  {CONTACT_PHONE}
                </a>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="icon-badge"><MailIcon /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>Email</div>
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontSize: 14.5, color: "var(--ink-2)", textDecoration: "none" }}>
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="icon-badge"><PinIcon /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>Zone d&apos;intervention</div>
                <p style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6, marginTop: 2 }}>
                  {LOCALITY} et les communes voisines de l&apos;Yonne ({SERVICE_AREA.slice(1, 4).join(", ")}...)
                </p>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="icon-badge"><CheckIcon /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>Réponse rapide</div>
                <p style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6, marginTop: 2 }}>
                  Nicolas vous recontacte pour convenir d&apos;une visite et
                  vous remettre un devis détaillé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
