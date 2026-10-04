import Image from "next/image";
import Link from "next/link";
import FaqJsonLd from "@/components/FaqJsonLd";
import { CheckIcon } from "@/components/Icons";
import {
  BATHROOM_FAQ, LOCALITY, REALISATIONS, SERVICE_AREA, SITE_NAME, SITE_URL,
} from "@/lib/site";

const TITLE = "Rénovation de salle de bain à Chamvres et dans l'Yonne";
const DESCRIPTION =
  "Rénovation complète de salle de bain par Nicobat à Chamvres et dans l'Yonne : douche à l'italienne, faïence, plomberie de finition. Devis gratuit.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/renovation-salle-de-bain" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const INCLUDED = [
  "Dépose complète de l'ancienne salle de bain",
  "Plomberie de finition (douche, baignoire, vasque)",
  "Pose de douche à l'italienne ou receveur extra-plat",
  "Faïence et revêtements muraux sur-mesure",
  "Meuble vasque et miroir",
  "Finitions, joints et dernières retouches",
];

const BATHROOM_PHOTOS = REALISATIONS.filter((r) => r.tag === "Salle de bain");

export default function SalleDeBainPage() {
  return (
    <main>
      <section className="hero" style={{ paddingBottom: 56 }}>
        <div className="wrap hero-grid">
          <div>
            <Link href="/" className="breadcrumb">← Accueil</Link>
            <div className="eyebrow" style={{ marginTop: 16 }}>{LOCALITY} · Yonne</div>
            <h1>Rénovation de salle de bain</h1>
            <p className="hero-sub">
              {SITE_NAME} rénove votre salle de bain à {LOCALITY} et dans les
              communes voisines de l&apos;Yonne : douche à l&apos;italienne,
              faïence, plomberie de finition — jusque dans les configurations
              les plus contraintes (combles, sous toiture).
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary">Demander un devis gratuit</Link>
              <Link href="/realisations" className="btn btn-outline">Voir les réalisations</Link>
            </div>
          </div>

          <div className="hero-visual">
            <Image
              src="/images/realisations/salle-de-bain-1.jpg"
              alt="Rénovation de salle de bain sous combles par Nicobat"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
            <div className="hero-visual-caption">
              Douche à l&apos;italienne sous combles
              <span>{LOCALITY}, Yonne</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Ce qui est compris</div>
            <h2>De la dépose aux finitions</h2>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {INCLUDED.map((item) => (
              <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15, fontWeight: 600 }}>
                <CheckIcon style={{ color: "var(--ok)", marginTop: 2, flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Réalisations</div>
            <h2>Salles de bain rénovées par Nicobat</h2>
          </div>
          <div className="grid grid-3">
            {BATHROOM_PHOTOS.map((p) => (
              <article className="gallery-item" key={p.src}>
                <div className="gallery-thumb">
                  <span className="gallery-tag">{p.tag}</span>
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="gallery-body">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Zone d&apos;intervention</div>
            <h2>{LOCALITY} et les communes alentour</h2>
            <p>
              Nicobat intervient pour vos chantiers de salle de bain à{" "}
              {LOCALITY} et dans les communes voisines de l&apos;Yonne.
            </p>
          </div>
          <div className="chip-row">
            {SERVICE_AREA.map((city) => (
              <span className="chip" key={city}>{city}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="faq">
        <div className="wrap">
          <FaqJsonLd items={BATHROOM_FAQ} />
          <div className="section-head">
            <div className="eyebrow">Questions fréquentes</div>
            <h2>Rénovation de salle de bain</h2>
          </div>
          <div className="faq-list">
            {BATHROOM_FAQ.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Un projet de salle de bain en tête ?</h2>
              <p>Décrivez-le en quelques lignes, Nicolas vous recontacte pour établir un devis gratuit.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">Demander un devis</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
