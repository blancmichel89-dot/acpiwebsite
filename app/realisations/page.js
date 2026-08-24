import Link from "next/link";
import { LOCALITY, SITE_NAME } from "@/lib/site";

export const metadata = {
  title: "Réalisations",
  description:
    "Chantiers de rénovation intérieure et de pose de cuisine réalisés par Nicobat à Chamvres et dans l'Yonne. Galerie photo en cours de constitution.",
  alternates: { canonical: "/realisations" },
};

const PROJECTS = [
  { title: "Pose de cuisine sur-mesure", tag: "Cuisine", desc: "Photos à venir" },
  { title: "Rénovation intérieure complète", tag: "Rénovation", desc: "Photos à venir" },
  { title: "Rénovation de salle de bain", tag: "Salle de bain", desc: "Photos à venir" },
  { title: "Aménagement de combles", tag: "Combles", desc: "Photos à venir" },
  { title: "Isolation & finitions", tag: "Isolation", desc: "Photos à venir" },
  { title: "Peinture & revêtements", tag: "Peinture", desc: "Photos à venir" },
];

export default function RealisationsPage() {
  return (
    <main className="section-tight">
      <div className="wrap">
        <Link href="/" className="breadcrumb">← Accueil</Link>

        <div className="section-head" style={{ marginTop: 16 }}>
          <div className="eyebrow">Portfolio</div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 38px)", marginTop: 8 }}>Réalisations</h1>
          <p>
            Un aperçu des chantiers de rénovation intérieure et de pose de
            cuisine réalisés par {SITE_NAME} à {LOCALITY} et dans les environs.
            La galerie photo est en cours de constitution — chaque chantier
            sera bientôt illustré ici.
          </p>
        </div>

        <div className="grid grid-3">
          {PROJECTS.map((p) => (
            <article className="gallery-item" key={p.title}>
              <div className="gallery-thumb">
                <span className="gallery-tag">{p.tag}</span>
                {p.desc}
              </div>
              <div className="gallery-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-band" style={{ marginTop: 56 }}>
          <div>
            <h2>Votre chantier pourrait être le prochain ici</h2>
            <p>Parlez-nous de votre projet de rénovation ou de pose de cuisine.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Demander un devis</Link>
        </div>
      </div>
    </main>
  );
}
