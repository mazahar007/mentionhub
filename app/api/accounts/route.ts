import { NextResponse } from "next/server";
import { mem, PLATFORMS } from "@/lib/store";
export async function GET() {
  const meta = !!process.env.META_APP_ID;
  const google = !!process.env.GOOGLE_CLIENT_ID;
  return NextResponse.json({ accounts: mem.accounts, platforms: PLATFORMS, oauth_configured: { meta: meta, google: google }, connect_urls: { facebook: "/api/auth/facebook", instagram: "/api/auth/facebook", youtube: "/api/auth/google" }, note: meta || google ? "OAuth env vars are set — Connect buttons now do the real login." : "Demo mode: no OAuth env vars set. Connect buttons redirect to /connect with setup steps." });
}
