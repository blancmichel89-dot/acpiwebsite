import {
  CONTACT_EMAIL, CONTACT_PHONE_HREF, GEO, LOCALITY, OWNER_NAME, POSTAL_CODE,
  SERVICE_AREA, SIRET, SITE_NAME, SITE_URL, STREET_ADDRESS,
} from "@/lib/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    legalName: OWNER_NAME,
    founder: { "@type": "Person", name: OWNER_NAME },
    taxID: SIRET.replace(/\s/g, ""),
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_HREF,
    description:
      "Artisan spécialisé en rénovation intérieure et pose de cuisine, basé à Chamvres dans l'Yonne.",
    address: {
      "@type": "PostalAddress",
      streetAddress: STREET_ADDRESS,
      postalCode: POSTAL_CODE,
      addressLocality: LOCALITY,
      addressRegion: "Bourgogne-Franche-Comté",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    areaServed: SERVICE_AREA.map((name) => ({ "@type": "City", name })),
    knowsAbout: [
      "Rénovation intérieure",
      "Pose de cuisine",
      "Rénovation de salle de bain",
      "Aménagement de combles",
      "Isolation",
      "Remplacement de fenêtres et portes",
      "Pose de fenêtres de toit Velux",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
