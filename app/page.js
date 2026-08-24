import Image from "next/image";
import Link from "next/link";
import {
  KitchenIcon, RenovationIcon, BathroomIcon, AtticIcon, InsulationIcon, PaintIcon, WindowIcon, CheckIcon,
} from "@/components/Icons";
import { LOCALITY, SERVICE_AREA, SERVICES, TRUST_POINTS } from "@/lib/site";

const ICONS = {
  kitchen: KitchenIcon,
  renovation: RenovationIcon,
  bathroom: BathroomIcon,
  attic: AtticIcon,
  insulation: InsulationIcon,
  paint: PaintIcon,
  window: WindowIcon,
};

const STEPS = [
  { title: "Prise de contact", desc: "Vous décrivez votre projet via le formulaire ou par email, avec vos idées et contraintes." },
  { title: "Visite & devis gratuit", desc: "Nicolas se déplace pour évaluer le chantier et vous remet un devis détaillé, sans engagement." },
  { title: "Réalisation soignée", desc: "Le chantier est mené avec des délais tenus et un nettoyage quotidien du poste de travail." },
  { title: "Réception & suivi", desc: "Vérification ensemble du résultat final, et disponibilité en cas de question après travaux." },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">{LOCALITY} · Yonne</div>
            <h1>
              Rénovation intérieure &amp; pose de cuisine, réalisées avec soin.
            </h1>
            <p className="hero-sub">
              Nicobat accompagne vos projets de rénovation à {LOCALITY} et
              dans les environs — de la première visite à la dernière
              finition, avec un devis clair avant chaque chantier.
            </p>

            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary">Demander un devis gratuit</Link>
              <Link href="/realisations" className="btn btn-outline">Voir les réalisations</Link>
            </div>

            <div className="hero-trust">
              {TRUST_POINTS.map((t) => (
                <div className="hero-trust-item" key={t}>
                  <CheckIcon style={{ color: "var(--ok)" }} />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <Image
              src="/images/realisations/cuisine-1.jpg"
              alt="Cuisine rénovée par Nicobat"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
            <div className="hero-visual-caption">
              Rénovation de cuisine
              <span>{LOCALITY}, Yonne</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Prestations</div>
            <h2>Un artisan, toutes les étapes de votre rénovation</h2>
            <p>
              Rénovation intérieure complète ou pose de cuisine sur-mesure :
              chaque chantier est cadré par un devis détaillé et suivi du
              début à la réception.
            </p>
          </div>

          <div className="grid grid-3">
            {SERVICES.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <article className="card service-card" id={s.slug} key={s.slug}>
                  <div className="icon-badge"><Icon /></div>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 48, alignItems: "start" }}>
            <div>
              <div className="eyebrow">Pourquoi Nicobat</div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 30px)", marginTop: 10 }}>
                Un interlocuteur unique, du premier échange à la réception du chantier
              </h2>
              <p style={{ color: "var(--ink-2)", marginTop: 14, lineHeight: 1.65 }}>
                Pas d&apos;intermédiaire ni de sous-traitance en cascade : c&apos;est
                Nicolas qui évalue votre projet, chiffre le devis et réalise
                les travaux. Vous savez toujours qui contacter.
              </p>
              <ul style={{ listStyle: "none", margin: "26px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {TRUST_POINTS.map((t) => (
                  <li key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15, fontWeight: 600 }}>
                    <CheckIcon style={{ color: "var(--ok)", marginTop: 2, flexShrink: 0 }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="steps">
              {STEPS.map((s, i) => (
                <div className="step" key={s.title}>
                  <div className="step-num" aria-hidden="true" />
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Zone d&apos;intervention</div>
            <h2>{LOCALITY} et les communes alentour</h2>
            <p>
              Nicobat intervient à {LOCALITY} et dans les communes voisines
              de l&apos;Yonne pour vos chantiers de rénovation intérieure et
              de pose de cuisine.
            </p>
          </div>
          <div className="chip-row">
            {SERVICE_AREA.map((city) => (
              <span className="chip" key={city}>{city}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Un projet de rénovation ou de cuisine en tête ?</h2>
              <p>Décrivez-le en quelques lignes, Nicolas vous recontacte pour établir un devis gratuit.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary">Demander un devis</Link>
              <Link href="/realisations" className="btn btn-outline-light">Voir les réalisations</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
