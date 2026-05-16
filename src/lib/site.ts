/**
 * Canonical site origin for metadataBase, sitemap, and robots.
 * Set NEXT_PUBLIC_SITE_URL in production (no trailing slash), e.g. https://www.example.com
 */
export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }

  return "http://localhost:3001";
}
