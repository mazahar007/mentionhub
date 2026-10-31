import { NextResponse } from "next/server";
import { mem, connectedAccounts, baseUrl } from "@/lib/store";

export async function GET(req: Request) {
  const base = baseUrl(req);
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const err = url.searchParams.get("error");
  if (err || !code) return NextResponse.redirect(`${base}/connect?error=${encodeURIComponent(err || "no_code")}`);
  const redirectUri = `${base}/api/auth/facebook/callback`;
  try {
    const tok = await fetch(`https://graph.facebook.com/v21.0/oauth/access_token?client_id=${process.env.META_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${process.env.META_APP_SECRET}&code=${encodeURIComponent(code)}`).then((r) => r.json());
    if (!tok.access_token) return NextResponse.redirect(`${base}/connect?error=token_failed`);
    const me = await fetch(`https://graph.facebook.com/v21.0/me?fields=name&access_token=${tok.access_token}`).then((r) => r.json());
    const pages = await fetch(`https://graph.facebook.com/v21.0/me/accounts?fields=name,id,instagram_business_account{id,username}&access_token=${tok.access_token}`).then((r) => r.json());
    const list = pages.data || [];
    // Mark seed accounts connected; store each Page + IG business account as a connected account (token NOT stored in the returned list, only in memory record count).
    for (const p of list) {
      connectedAccounts.push({ id: "meta-" + p.id, provider: "meta", platform: "facebook", label: p.name, external_id: p.id, connected_at: new Date().toISOString(), scopes: ["pages_read_engagement", "pages_manage_posts"] });
      if (p.instagram_business_account) {
        connectedAccounts.push({ id: "ig-" + p.instagram_business_account.id, provider: "meta", platform: "instagram", label: "@" + p.instagram_business_account.username, external_id: p.instagram_business_account.id, connected_at: new Date().toISOString(), scopes: ["instagram_basic", "instagram_manage_comments"] });
      }
    }
    if (list.length === 0) {
      connectedAccounts.push({ id: "meta-user", provider: "meta", platform: "facebook", label: me.name || "Facebook user", external_id: "user", connected_at: new Date().toISOString(), scopes: [] });
    }
    for (const a of mem.accounts) {
      if ((a.platform === "facebook" || a.platform === "instagram") && connectedAccounts.some((c) => c.platform === a.platform)) {
        a.status = "connected"; a.note = "Connected via Meta login. Live mentions/replies need Page permission review for public users; owner + test users work before review.";
      }
    }
    return NextResponse.redirect(`${base}/connect?connected=facebook&pages=${list.length}`);
  } catch {
    return NextResponse.redirect(`${base}/connect?error=callback_failed`);
  }
}
