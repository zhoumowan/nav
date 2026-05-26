import type { APIRoute } from "astro";
import { sites } from "@/data/sites";

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString() || "https://dev-os.vercel.app";

  const items = sites
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 30)
    .map(
      (site) => `
    <item>
      <title>${escapeXml(site.title)}</title>
      <link>${escapeXml(site.url)}</link>
      <guid>${escapeXml(site.url)}</guid>
      <pubDate>${new Date(site.createdAt).toUTCString()}</pubDate>
      <description>${escapeXml(site.description)}</description>
      <category>${escapeXml(site.category)}</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DevOS — Developer Workspace</title>
    <link>${baseUrl}</link>
    <description>The operating system for modern developers. Curated tools, resources, and inspiration.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
