// Vercel serverless function: devuelve los últimos vídeos del canal de YouTube
// leyendo el feed RSS público (no necesita API key).
export const CHANNEL_ID = "UCmMBAvl3sz_jDUBa77H40dA";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const decode = (s = "") =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const pick = (block, re) => {
  const m = block.match(re);
  return m ? decode(m[1].trim()) : "";
};

export function parseFeed(xml) {
  const entries = xml.split("<entry>").slice(1);
  return entries.map((block) => {
    const id = pick(block, /<yt:videoId>([^<]+)<\/yt:videoId>/);
    const link = pick(block, /<link[^>]+href="([^"]+)"/);
    return {
      id,
      title: pick(block, /<title>([\s\S]*?)<\/title>/),
      published: pick(block, /<published>([^<]+)<\/published>/),
      views: Number(pick(block, /<media:statistics views="(\d+)"/)) || 0,
      description: pick(block, /<media:description>([\s\S]*?)<\/media:description>/),
      isShort: link.includes("/shorts/"),
    };
  });
}

export default async function handler(req, res) {
  try {
    const r = await fetch(FEED_URL);
    if (!r.ok) throw new Error(`YouTube feed ${r.status}`);
    const videos = parseFeed(await r.text());
    // Cache en el CDN de Vercel: 30 min fresco, luego se revalida en segundo plano.
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
    res.status(200).json({ videos });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
