import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { GEO, LOCALITY, SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Rénovation intérieure & pose de cuisine à Chamvres (Yonne)`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Nicobat, artisan à Chamvres (Yonne), réalise vos projets de rénovation intérieure et de pose de cuisine sur-mesure : devis gratuit, chantier soigné, délais tenus.",
  keywords: [
    "rénovation intérieure",
    "pose de cuisine",
    "artisan rénovation Yonne",
    "cuisiniste Chamvres",
    "rénovation salle de bain",
    "aménagement combles",
    "remplacement fenêtres et portes",
    "pose Velux",
    "Nicobat",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Rénovation intérieure & pose de cuisine`,
    description:
      "Artisan à Chamvres (Yonne) : rénovation intérieure et pose de cuisine sur-mesure, devis gratuit.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Rénovation intérieure & pose de cuisine`,
    description:
      "Artisan à Chamvres (Yonne) : rénovation intérieure et pose de cuisine sur-mesure, devis gratuit.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "Ndb50ETT9K57Z9Nf1F6BHjAiPEn2QRM6dJYCpqiZktA",
  },
  other: {
    "geo.position": `${GEO.latitude};${GEO.longitude}`,
    "geo.placename": LOCALITY,
    "geo.region": "FR-89",
    ICBM: `${GEO.latitude}, ${GEO.longitude}`,
  },
};

export const viewport = {
  themeColor: "#211f1b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <JsonLd />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
