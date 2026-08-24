"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { totals, eur, acompteAmount } from "@/lib/totals";

export default function PrintDocumentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [doc, setDoc] = useState(null);
  const [client, setClient] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    (async () => {
      const d = await fetch(`/api/documents/${id}`).then((r) => r.json());
      const clients = await fetch("/api/clients").then((r) => r.json());
      const s = await fetch("/api/settings").then((r) => r.json());
      setDoc(d);
      setClient(clients.find((c) => c.id === d.clientId) || null);
      setSettings(s);
    })();
  }, [id]);

  if (!doc || !settings) return <p style={{ padding: 24, color: "#888" }}>Chargement…</p>;

  const t = totals(doc);
  const acompte = acompteAmount(doc, t);
  const isDevis = doc.type === "devis";
  const label = isDevis ? "Devis" : "Facture";
  const dateStr = new Date(doc.date).toLocaleDateString("fr-FR");
  const civility = client?.civility || "";
  const salutation = civility === "Mme" ? "Madame," : civility === "M." ? "Monsieur," : "Madame, Monsieur,";
  const acomptePct = doc.acompte?.active && doc.acompte.mode === "percent" ? Number(doc.acompte.value) : null;

  return (
    <div style={{ background: "#fff", color: "#1a1a1a", fontFamily: "'IBM Plex Sans', sans-serif", minHeight: "100vh" }}>
      <div className="no-print" style={{ padding: 14, display: "flex", gap: 10, borderBottom: "1px solid #ddd" }}>
        <button onClick={() => router.push(`/pro/documents/${id}`)} style={{ padding: "10px 14px", border: "1px solid #ccc", borderRadius: 8, background: "#fff" }}>← Retour</button>
        <button onClick={() => window.print()} style={{ padding: "10px 14px", border: "none", borderRadius: 8, background: "#e3a600", color: "#3a2e00", fontWeight: 700 }}>
          Imprimer / Enregistrer en PDF
        </button>
      </div>
      <style>{`@media print { .no-print { display: none !important; } } @page { margin: 18mm; }`}</style>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "44px 36px", fontSize: 13.5, lineHeight: 1.55 }}>
        {/* En-tête entreprise + date */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 30 }}>
          <div>
            <div style={{ fontWeight: 700 }}>{settings.address}</div>
            <div>{settings.postalCity}</div>
            <div>{settings.phone}</div>
            <div>{settings.email}</div>
            <div style={{ marginTop: 4, fontSize: 12, color: "#555" }}>N° Siret {settings.siret}</div>
            <div style={{ fontSize: 12, color: "#555" }}>N° TVA: {settings.tvaNumber}</div>
          </div>
          <div style={{ textAlign: "right" }}>{settings.city || settings.name}, le {dateStr}</div>
        </div>

        {/* Formule d'appel */}
        {client && (
          <div style={{ marginBottom: 20 }}>
            À l'attention de {civility ? `${civility} ` : ""}{client.name}
          </div>
        )}
        <div style={{ marginBottom: 16 }}>{salutation}</div>

        {isDevis ? (
          <>
            <p>
              Pour faire suite à notre dernier entretien, nous vous remercions de votre confiance et c'est avec
              plaisir que nous vous remettons ci-après notre meilleure proposition technique et commerciale.
            </p>
            <p>
              Cette proposition a été établie conformément à nos conditions générales de vente et à la clause
              de réserve de propriété (loi 80,335 du 12,05,1980).
            </p>
          </>
        ) : (
          <p>Suite à la réalisation des travaux convenus, veuillez trouver ci-après le détail de la présente facture.</p>
        )}

        {/* Bloc adresse client + titre document */}
        <div style={{ display: "flex", justifyContent: "space-between", margin: "26px 0 20px" }}>
          <div style={{ fontSize: 12, color: "#555" }}>
            <div>{settings.address}</div>
            <div>{settings.postalCity}</div>
            <div>{settings.phone}</div>
            <div>{settings.email}</div>
          </div>
          {client && (
            <div style={{ textAlign: "right", fontSize: 12 }}>
              <div style={{ fontWeight: 700 }}>{civility ? `${civility} ` : ""}{client.name}</div>
              {client.address && <div>{client.address}</div>}
              {client.phone && <div>{client.phone}</div>}
              {client.email && <div>{client.email}</div>}
            </div>
          )}
        </div>

        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>{label} {doc.number}</div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 6 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1a1a1a" }}>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 12 }}>Désignation des prestations</th>
              <th style={{ textAlign: "center", padding: "6px 4px", fontSize: 12, width: 60 }}>Quantité</th>
              <th style={{ textAlign: "right", padding: "6px 4px", fontSize: 12, width: 100 }}>Prix unitaire</th>
              <th style={{ textAlign: "right", padding: "6px 4px", fontSize: 12, width: 100 }}>Montant</th>
            </tr>
          </thead>
          <tbody>
            {doc.lines.map((l, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "7px 4px" }}>{l.desc || "—"}</td>
                <td style={{ padding: "7px 4px", textAlign: "center" }}>{l.qty}</td>
                <td style={{ padding: "7px 4px", textAlign: "right" }}>{eur(Number(l.price) || 0)}</td>
                <td style={{ padding: "7px 4px", textAlign: "right" }}>{eur((Number(l.qty) || 0) * (Number(l.price) || 0))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
          <div style={{ width: 240, fontSize: 13 }}>
            <Row label="Total HT" value={t.ht} />
            <Row label={`Total TVA ${doc.tva} %`} value={t.tva} />
            <Row label="TOTAL TTC" value={t.ttc} strong />
            {doc.acompte?.active && (
              <>
                <Row label={`Acompte ${doc.acompte.recu ? `versé le ${doc.acompte.dateRecu ? new Date(doc.acompte.dateRecu).toLocaleDateString("fr-FR") : ""}` : "demandé"}`} value={-acompte} />
                <Row label="Solde restant dû" value={t.ttc - acompte} strong />
              </>
            )}
          </div>
        </div>

        {isDevis && <p style={{ fontSize: 12, color: "#555" }}>durée de validité : 30 Jours</p>}

        {isDevis ? (
          <>
            <p style={{ marginTop: 20 }}>
              Nous vous en souhaitons bonne réception, et, dans l'espoir que celle-ci répondra pleinement à
              votre attente, nous vous prions d'agréer, {salutation.replace(",", "")}, l'expression de nos salutations distinguées.
            </p>
            <p style={{ marginTop: 24, fontWeight: 700 }}>A VOTRE SERVICE</p>
          </>
        ) : (
          <p style={{ marginTop: 20 }}>Cordialement,</p>
        )}
        <p style={{ marginTop: 30, fontWeight: 700 }}>{settings.name}</p>

        {/* Mentions légales — texte fixe, identique sur chaque document */}
        <div style={{ marginTop: 50, paddingTop: 20, borderTop: "1px solid #ddd", fontSize: 11, color: "#555" }}>
          <p style={{ fontWeight: 700, color: "#1a1a1a" }}>LIMITE DE FOURNITURE</p>
          <p>
            Tous les travaux de génie civil et de maçonnerie non prévus par le cahier des charges. Alimentation
            électrique, puissance et disjoncteurs pour les petits travaux électriques. Le déchargement des
            camions de livraison sur le site de montage et le stockage du matériel en attente à l'abri des
            intempéries. Analyse de quelque nature qu'elle soit. Tous les éléments non stipulés dans notre offre.
          </p>

          <p style={{ fontWeight: 700, color: "#1a1a1a", marginTop: 14 }}>NOS CONDITIONS COMMERCIALES</p>
          <p>
            Nos prix s'entendent unitaires, nets, toutes taxes, pour du matériel répondant aux normes CE sous
            emballage standard. Ce prix n'inclut pas la fourniture et les démarches relatives à l'obtention des
            documents de conformité auprès d'organismes agréés.
          </p>

          <p style={{ fontWeight: 700, color: "#1a1a1a", marginTop: 14 }}>CONDITIONS DE PAIEMENT</p>
          <p>
            {acomptePct ? `${acomptePct}% du montant T.T.C à la signature. ` : doc.acompte?.active ? `${eur(acompte)} à la signature. ` : ""}
            Solde par chèque ou virement à réception du chantier.
          </p>

          <p style={{ fontWeight: 700, color: "#1a1a1a", marginTop: 14 }}>DÉLAI DE LIVRAISON</p>
          <p>A définir à la commande.</p>

          <p style={{ fontWeight: 700, color: "#1a1a1a", marginTop: 14 }}>TRANSFERT DE PROPRIÉTÉ (loi du 12/03/93)</p>
          <p>
            La société {settings.name?.toUpperCase()} conserve la propriété des biens vendus jusqu'au paiement
            effectif de l'intégralité du prix. Les dispositions ne font pas obstacle au transfert à l'acheteur,
            dès la livraison, des risques de perte et de détérioration des biens vendus ainsi que des dommages
            qu'ils pourraient occasionner.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderTop: strong ? "1.5px solid #1a1a1a" : "none", fontWeight: strong ? 700 : 400 }}>
      <span>{label}</span>
      <span>{eur(value)}</span>
    </div>
  );
}
