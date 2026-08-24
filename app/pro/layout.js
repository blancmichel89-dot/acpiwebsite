import Link from "next/link";

/**
 * === À FAIRE EN PHASE 2 ===
 * Ce layout n'est pas encore protégé par authentification. Il faudra :
 *  1. Activer Identity Platform / Google Sign-In dans le projet Cloud
 *  2. Vérifier ici la session de Nicolas avant de rendre le contenu
 *  3. Rediriger vers une page de connexion si non authentifié
 */
export default function ProLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 220, borderRight: "1px solid var(--line)", padding: "22px 14px" }}>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>NICOBAT</div>
        <div style={{ fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", marginBottom: 20 }}>
          Espace pro
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Link href="/pro/documents">Devis &amp; Factures</Link>
          <Link href="/pro/clients">Clients</Link>
          <Link href="/pro/settings">Paramètres</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "28px 32px" }}>{children}</main>
    </div>
  );
}
