import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString() || "https://dev-os.vercel.app";

  const routes = [
    { url: "/", lastmod: new Date().toISOString(), changefreq: "daily", priority: "1.0" },
    { url: "/rss.xml", lastmod: new Date().toISOString(), changefreq: "daily", priority: "0.5" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
