import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>
      <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "var(--ink-3)" }}>
        Chamvres · Yonne
      </div>
      <h1 style={{ fontSize: 42, lineHeight: 1.1, margin: "10px 0 18px" }}>
        Rénovation intérieure &amp; pose de cuisine, réalisées avec soin.
      </h1>
      <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 560 }}>
        Nicobat accompagne vos projets de rénovation — de la conception à la pose,
        avec un devis clair avant chaque chantier.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
        <Link
          href="/contact"
          style={{ padding: "12px 20px", background: "var(--chalk)", color: "var(--chalk-ink)", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}
        >
          Demander un devis
        </Link>
        <Link
          href="/realisations"
          style={{ padding: "12px 20px", border: "1px solid var(--line)", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}
        >
          Voir les réalisations
        </Link>
      </div>

      <footer style={{ marginTop: 80, paddingTop: 20, borderTop: "1px solid var(--line)", fontSize: 13, color: "var(--ink-3)" }}>
        Nicobat — <Link href="/pro">Espace professionnel</Link>
      </footer>
    </main>
  );
}
