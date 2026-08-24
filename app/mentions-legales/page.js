import Link from "next/link";
import {
  CONTACT_EMAIL, CONTACT_PHONE, FULL_ADDRESS, OWNER_NAME, SIRET, SITE_NAME, SITE_URL,
} from "@/lib/site";

export const metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${SITE_NAME}.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main className="section-tight">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <Link href="/" className="breadcrumb">← Accueil</Link>

        <h1 style={{ fontSize: "clamp(26px, 3.6vw, 34px)", margin: "16px 0 32px" }}>Mentions légales</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, color: "var(--ink-2)", fontSize: 15, lineHeight: 1.7 }}>
          <section>
            <h2 style={{ fontSize: 18, color: "var(--ink)", marginBottom: 8 }}>Éditeur du site</h2>
            <p>
              {SITE_NAME} — entreprise individuelle exploitée par {OWNER_NAME}.<br />
              Adresse : {FULL_ADDRESS}<br />
              SIRET : {SIRET}<br />
              Téléphone : {CONTACT_PHONE}<br />
              Email : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, color: "var(--ink)", marginBottom: 8 }}>Directeur de la publication</h2>
            <p>{OWNER_NAME}</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, color: "var(--ink)", marginBottom: 8 }}>Hébergement</h2>
            <p>
              Le site est hébergé par Netlify, Inc. Les informations légales
              relatives à l&apos;hébergeur sont disponibles sur{" "}
              <a href="https://www.netlify.com/legal/" target="_blank" rel="noopener noreferrer">
                netlify.com/legal
              </a>.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, color: "var(--ink)", marginBottom: 8 }}>Données personnelles</h2>
            <p>
              Le formulaire de contact de ce site ouvre votre messagerie
              avec un message pré-rempli à destination de {CONTACT_EMAIL} :
              aucune donnée saisie n&apos;est enregistrée ou transmise à un
              serveur. Le site n&apos;utilise pas de cookies de suivi ni
              d&apos;outils d&apos;analyse d&apos;audience à ce jour.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, color: "var(--ink)", marginBottom: 8 }}>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur {SITE_URL.replace(/^https?:\/\//, "")}{" "}
              (textes, photographies, logo) est la propriété de {OWNER_NAME},
              sauf mention contraire, et ne peut être reproduit sans
              autorisation préalable.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
