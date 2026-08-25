import { SERVICE_AREA, SERVICES, SITE_NAME, SITE_URL } from "@/lib/site";

export default function ServicesJsonLd() {
  const data = SERVICES.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.short,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: SERVICE_AREA.map((name) => ({ "@type": "City", name })),
    url: `${SITE_URL}/#${s.slug}`,
    serviceType: s.title,
    brand: SITE_NAME,
  }));

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
