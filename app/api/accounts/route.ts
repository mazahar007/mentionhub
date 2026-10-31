import { NextResponse } from "next/server";
import { mem, PLATFORMS } from "@/lib/store";
export async function GET() {
  const meta = !!process.env.META_APP_ID;
  const google = !!process.env.GOOGLE_CLIENT_ID;
  return NextResponse.json({ accounts: mem.accounts, platforms: PLATFORMS, oauth_configured: { meta: meta, google: google }, note: meta || google ? "OAuth env vars are set — wire the callback routes before going live." : "Demo mode: no OAuth env vars set. See README-SETUP-BN.md." });
}
