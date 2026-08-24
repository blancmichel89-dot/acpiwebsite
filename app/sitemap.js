import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  const routes = ["", "/realisations", "/contact"];
  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
