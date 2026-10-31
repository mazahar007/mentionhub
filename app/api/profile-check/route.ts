import { NextResponse } from "next/server";
import { mem, FREE_PROFILE_CHECKS, type ProfileCheck } from "@/lib/store";

const PLATFORMS: Record<string, { label: string; profile_url: (h: string) => string; live: string; restricted: string }> = {
  facebook: { label: "Facebook", profile_url: (h) => `https://facebook.com/${h}`, live: "Page lookup only via Meta Graph API (needs Meta App + Page access). Personal profiles cannot be searched via the official API.", restricted: "Facebook does not allow searching arbitrary personal profiles via its official API. Only public Pages you manage / have access to can be looked up." },
  linkedin: { label: "LinkedIn", profile_url: (h) => `https://linkedin.com/in/${h}`, live: "LinkedIn public-profile search needs a LinkedIn partnership / approved API access.", restricted: "LinkedIn restricts public profile search via API. Open the profile URL on LinkedIn itself to view public activity." },
  youtube: { label: "YouTube", profile_url: (h) => `https://youtube.com/@${h}`, live: "Live via YouTube Data API v3 when YOUTUBE_API_KEY is set.", restricted: "Set YOUTUBE_API_KEY (Google Cloud, free quota) to enable live channel lookup." },
  x: { label: "X (Twitter)", profile_url: (h) => `https://x.com/${h}`, live: "X public user lookup needs the X API paid tier.", restricted: "X restricts user lookup to its paid API tier. Open the profile URL on X itself to view public posts." },
  instagram: { label: "Instagram", profile_url: (h) => `https://instagram.com/${h}`, live: "Instagram lookup is limited to your own Business accounts via Meta Graph API.", restricted: "Instagram does not allow searching arbitrary profiles via its official API. Open the profile URL on Instagram itself." },
  pinterest: { label: "Pinterest", profile_url: (h) => `https://pinterest.com/${h}`, live: "Pinterest lookup needs an approved Pinterest API app.", restricted: "Pinterest restricts profile lookup via API. Open the profile URL on Pinterest itself." },
  reddit: { label: "Reddit", profile_url: (h) => `https://reddit.com/user/${h}`, live: "Live via Reddit OAuth app when REDDIT_CLIENT_ID/SECRET are set; public JSON is bot-blocked (403) without OAuth.", restricted: "Set REDDIT_CLIENT_ID + REDDIT_CLIENT_SECRET (free Reddit app) to enable live public-user lookup. Public JSON without OAuth is blocked." },
};

function cleanHandle(raw: string): string {
  let h = raw.trim().replace(/^https?:\/\//, "").replace(/^www\./, "");
  h = h.split("/").filter(Boolean).pop() || "";
  return h.replace(/^@/, "").trim();
}

export async function GET() {
  const used = mem.profileChecks.filter((c) => c.counted).length;
  return NextResponse.json({
    free_limit: FREE_PROFILE_CHECKS, used, remaining: Math.max(0, FREE_PROFILE_CHECKS - used),
    history: mem.profileChecks,
    platforms: Object.entries(PLATFORMS).map(([id, p]) => ({ id, label: p.label, live: p.live })),
    rule: "Free = 15 counted checks. One counted check = one platform lookup that returns data. 15 different profiles, or one person's 15 accounts, or any mix — the counter does not care how you group them. Demo examples and restricted lookups (no data) do not use quota. This limit is configurable in lib/store.ts (FREE_PROFILE_CHECKS) and can change later.",
    privacy: "Public data only. No private messages, friends lists, locations, or sensitive traits are collected or inferred. Do not use this to harass, stalk, or target a minor.",
  });
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const platform = String(b.platform || "").toLowerCase();
  const meta = PLATFORMS[platform];
  if (!meta) return NextResponse.json({ error: "Platform must be one of: facebook, linkedin, youtube, x, instagram, pinterest, reddit" }, { status: 400 });
  if (b.consent !== true) return NextResponse.json({ error: "Please confirm: this is a public profile checked for a legitimate purpose (own audit / public creator / public-data research only)." }, { status: 400 });
  const handle = cleanHandle(String(b.handle || ""));
  if (!handle) return NextResponse.json({ error: "Handle or profile URL is required" }, { status: 400 });

  // Demo example — clearly labelled, never counts, never pretends to be a real lookup.
  if (b.demo === true || handle.toLowerCase() === "demo") {
    const demo: ProfileCheck = {
      id: "demo-" + Date.now(), platform, handle: "americancarsaga (SAMPLE)", display_name: "americancarsaga — SAMPLE ONLY",
      followers: 12400, total_posts: 86,
      post_types: { video: 62, short: 18, community_post: 6 },
      recent: [
        { title: "Only 2 Built. One Sold for $3.14 Million. (1969 Corvette ZL-1)", date: "2026-10-24", type: "video" },
        { title: "1969 Camaro ZL1 — Only 69 Built", date: "2026-10-28", type: "video" },
        { title: "1970 Sport Fury GT — Only 4 Left?", date: "2026-10-21", type: "video" },
      ],
      summary: "SAMPLE report only. A real report shows: display name, follower/subscriber count (where public), total public posts, breakdown by post type, and recent public post titles with dates — so you can see frequency and what kind of content they post. It does not show private data.",
      source: "demo", counted: false, at: new Date().toISOString(),
    };
    return NextResponse.json({ check: demo, counted: false, profile_url: meta.profile_url(handle) });
  }

  const used = mem.profileChecks.filter((c) => c.counted).length;

  // --- Live attempts (only where an official API path exists) ---
  let live: ProfileCheck | null = null;

  if (platform === "youtube" && process.env.YOUTUBE_API_KEY) {
    try {
      const key = process.env.YOUTUBE_API_KEY;
      const chRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${encodeURIComponent(handle)}&key=${key}`);
      const ch = await chRes.json();
      const item = ch.items?.[0];
      if (item) {
        const vidRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${item.id}&order=date&maxResults=10&type=video&key=${key}`);
        const vids = await vidRes.json();
        const recent = (vids.items || []).map((v: { snippet: { title: string; publishedAt: string } }) => ({ title: v.snippet.title, date: (v.snippet.publishedAt || "").slice(0, 10) || null, type: "video" }));
        live = { id: "pc" + Date.now(), platform, handle, display_name: item.snippet.title, followers: Number(item.statistics.subscriberCount) || null, total_posts: Number(item.statistics.videoCount) || null, post_types: { video: recent.length }, recent, summary: `Public YouTube channel. Subscribers and video count are public statistics. Recent videos show posting frequency and topics.`, source: "live", counted: true, at: new Date().toISOString() };
      }
    } catch { /* fall through to restricted */ }
  }

  if (platform === "reddit" && process.env.REDDIT_CLIENT_ID && process.env.REDDIT_CLIENT_SECRET) {
    try {
      const basic = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString("base64");
      const tok = await fetch("https://www.reddit.com/api/v1/access_token", { method: "POST", headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "MentionHub/1.0" }, body: "grant_type=client_credentials" }).then((r) => r.json());
      if (tok.access_token) {
        const about = await fetch(`https://oauth.reddit.com/user/${encodeURIComponent(handle)}/about`, { headers: { Authorization: `Bearer ${tok.access_token}`, "User-Agent": "MentionHub/1.0" } }).then((r) => r.json());
        const sub = await fetch(`https://oauth.reddit.com/user/${encodeURIComponent(handle)}/submitted?limit=10`, { headers: { Authorization: `Bearer ${tok.access_token}`, "User-Agent": "MentionHub/1.0" } }).then((r) => r.json());
        const posts = sub.data?.children || [];
        const types: Record<string, number> = {};
        const recent = posts.map((p: { data: { title: string; created_utc: number; post_hint?: string; is_self?: boolean } }) => {
          const t = p.data.is_self ? "text" : (p.data.post_hint || "link");
          types[t] = (types[t] || 0) + 1;
          return { title: p.data.title, date: p.data.created_utc ? new Date(p.data.created_utc * 1000).toISOString().slice(0, 10) : null, type: t };
        });
        live = { id: "pc" + Date.now(), platform, handle, display_name: about.data?.name || handle, followers: about.data?.link_karma != null ? about.data.link_karma + (about.data.comment_karma || 0) : null, total_posts: null, post_types: types, recent, summary: "Public Reddit user: karma is public, recent public posts/comments show activity type and frequency. No private data is fetched.", source: "live", counted: true, at: new Date().toISOString() };
      }
    } catch { /* fall through */ }
  }

  if (live) {
    if (used >= FREE_PROFILE_CHECKS) {
      return NextResponse.json({ error: `Free limit reached: ${FREE_PROFILE_CHECKS} counted checks used. Upgrade to Pro for more checks, or wait for the limit to change.`, used, free_limit: FREE_PROFILE_CHECKS }, { status: 402 });
    }
    mem.profileChecks.unshift(live);
    return NextResponse.json({ check: live, counted: true, remaining: FREE_PROFILE_CHECKS - used - 1, profile_url: meta.profile_url(handle) });
  }

  // Restricted / not configured — returns NO data, does NOT consume quota.
  return NextResponse.json({
    check: null, counted: false, remaining: FREE_PROFILE_CHECKS - used,
    restricted: true, platform, handle, profile_url: meta.profile_url(handle),
    reason: meta.restricted, live_path: meta.live,
    note: "This lookup did not use your free quota, because no data was returned. Connect the API listed above to enable live lookup for this platform.",
  });
}
