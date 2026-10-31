import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/store";

// Meta OAuth start — Facebook + Instagram (Instagram connects through the same Meta login).
export async function GET(req: Request) {
  const base = baseUrl(req);
  const appId = process.env.META_APP_ID;
  if (!appId || !process.env.META_APP_SECRET) {
    return NextResponse.redirect(`${base}/connect?error=meta_not_configured`);
  }
  const redirectUri = `${base}/api/auth/facebook/callback`;
  const scope = [
    "pages_show_list", "pages_read_engagement", "pages_read_user_content",
    "pages_manage_posts", "instagram_basic", "instagram_manage_comments",
  ].join(",");
  const url = new URL("https://www.facebook.com/v21.0/dialog/oauth");
  url.searchParams.set("client_id", appId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope);
  url.searchParams.set("response_type", "code");
  return NextResponse.redirect(url.toString());
}
