import { NextResponse } from "next/server";
import { mem, connectedAccounts, baseUrl } from "@/lib/store";

// No secrets are ever returned here — only configured yes/no + labels.
export async function GET(req: Request) {
  const base = baseUrl(req);
  return NextResponse.json({
    redirect_base: base,
    meta: {
      configured: Boolean(process.env.META_APP_ID && process.env.META_APP_SECRET),
      app_id_set: Boolean(process.env.META_APP_ID),
      redirect_uri: `${base}/api/auth/facebook/callback`,
      covers: ["facebook", "instagram"],
      missing: !process.env.META_APP_ID ? ["META_APP_ID"] : !process.env.META_APP_SECRET ? ["META_APP_SECRET"] : [],
    },
    google: {
      configured: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
      client_id_set: Boolean(process.env.GOOGLE_CLIENT_ID),
      redirect_uri: `${base}/api/auth/google/callback`,
      covers: ["youtube"],
      missing: !process.env.GOOGLE_CLIENT_ID ? ["GOOGLE_CLIENT_ID"] : !process.env.GOOGLE_CLIENT_SECRET ? ["GOOGLE_CLIENT_SECRET"] : [],
    },
    connected: connectedAccounts.map((c) => ({ platform: c.platform, label: c.label, connected_at: c.connected_at })),
    accounts: mem.accounts,
    note: "Demo mode: connected tokens live in server memory only and are wiped on redeploy. Production must encrypt + store them per-user in Supabase. Until Meta App Review / Google verification, only the app owner + test users can connect.",
  });
}
