import Link from "next/link";

const PLACEHOLDER_PROJECTS = [
  { title: "Rénovation intérieure", desc: "Photos à venir" },
  { title: "Pose de cuisine sur-mesure", desc: "Photos à venir" },
  { title: "Aménagement combles", desc: "Photos à venir" },
  { title: "Isolation & finitions", desc: "Photos à venir" },
];

export default function RealisationsPage() {
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>
      <Link href="/" style={{ fontSize: 13, color: "var(--ink-3)", textDecoration: "none" }}>← Accueil</Link>
      <h1 style={{ fontSize: 32, margin: "14px 0 10px" }}>Réalisations</h1>
      <p style={{ color: "var(--ink-2)", marginBottom: 30 }}>
        Un aperçu des chantiers de rénovation intérieure et de pose de cuisine réalisés par Nicobat.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {PLACEHOLDER_PROJECTS.map((p, i) => (
          <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", background: "var(--paper-2)" }}>
            <div style={{
              aspectRatio: "4 / 3", display: "flex", alignItems: "center", justifyContent: "center",
              background: "repeating-linear-gradient(45deg, var(--line), var(--line) 10px, transparent 10px, transparent 20px)",
              color: "var(--ink-3)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5,
            }}>
              {p.desc}
            </div>
            <div style={{ padding: "12px 14px", fontWeight: 600, fontSize: 14 }}>{p.title}</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 30, fontSize: 13, color: "var(--ink-3)" }}>
        Galerie en cours de constitution — les photos des chantiers seront ajoutées prochainement.
      </p>
    </main>
  );
}
