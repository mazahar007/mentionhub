import { NextResponse } from "next/server";
import { mem, connectedAccounts, baseUrl } from "@/lib/store";

export async function GET(req: Request) {
  const base = baseUrl(req);
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const err = url.searchParams.get("error");
  if (err || !code) return NextResponse.redirect(`${base}/connect?error=${encodeURIComponent(err || "no_code")}`);
  const redirectUri = `${base}/api/auth/google/callback`;
  try {
    const tok = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code, client_id: process.env.GOOGLE_CLIENT_ID!, client_secret: process.env.GOOGLE_CLIENT_SECRET!, redirect_uri: redirectUri, grant_type: "authorization_code" }),
    }).then((r) => r.json());
    if (!tok.access_token) return NextResponse.redirect(`${base}/connect?error=token_failed`);
    const ch = await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", { headers: { Authorization: `Bearer ${tok.access_token}` } }).then((r) => r.json());
    const item = ch.items?.[0];
    const label = item?.snippet?.title || "YouTube channel";
    connectedAccounts.push({ id: "yt-" + (item?.id || "mine"), provider: "google", platform: "youtube", label, external_id: item?.id || "mine", connected_at: new Date().toISOString(), scopes: ["youtube.readonly", "youtube.force-ssl"] });
    for (const a of mem.accounts) {
      if (a.platform === "youtube") { a.status = "connected"; a.note = `Connected: ${label}. Live comments need the channel owner login; public users need Google verification for sensitive scopes.`; }
    }
    return NextResponse.redirect(`${base}/connect?connected=youtube`);
  } catch {
    return NextResponse.redirect(`${base}/connect?error=callback_failed`);
  }
}
