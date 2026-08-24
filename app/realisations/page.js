import Image from "next/image";
import Link from "next/link";
import { LOCALITY, REALISATIONS, SITE_NAME } from "@/lib/site";

export const metadata = {
  title: "Réalisations",
  description:
    "Chantiers de rénovation intérieure et de pose de cuisine réalisés par Nicobat à Chamvres et dans l'Yonne : cuisines, salles de bain, combles, pose de Velux.",
  alternates: { canonical: "/realisations" },
};

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
            D&apos;autres photos viendront compléter cette galerie au fil des chantiers.
          </p>
        </div>

        <div className="grid grid-3">
          {REALISATIONS.map((p) => (
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
