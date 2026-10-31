"use client";
import { useEffect, useState } from "react";

export default function ConnectPage() {
  const [st, setSt] = useState<{ meta: { configured: boolean; redirect_uri: string; missing: string[] }; google: { configured: boolean; redirect_uri: string; missing: string[] }; connected: { platform: string; label: string }[] } | null>(null);
  const [q, setQ] = useState("");
  useEffect(() => { setQ(window.location.search); fetch("/api/auth/status").then((r) => r.json()).then(setSt); }, []);
  const params = new URLSearchParams(q);
  const connected = params.get("connected"); const error = params.get("error");
  return (
    <main className="container">
      <a className="skip" href="#main">Skip to content</a>
      <header className="header"><a className="logo" href="/">MentionHub</a><nav><a href="/app">Dashboard</a> <a href="/pricing">Pricing</a></nav></header>
      <section id="main" className="hero">
        <h1>Connect your accounts</h1>
        <p className="lead">Facebook + Instagram connect through one Meta login. YouTube connects through Google. Until the apps are reviewed/verified, only the app owner and test users can connect — that is enough for your own americancarsaga accounts.</p>
        {connected && <p className="badge">Connected: {connected} ✓ — check the Dashboard Accounts tab.</p>}
        {error && <p>Could not connect: {error}. If it says “not_configured”, the app IDs/secrets are not set yet — see step 3 below.</p>}
      </section>
      <section className="grid grid-2">
        <div className="card"><h3>1. Facebook + Instagram</h3><p>Status: {st ? (st.meta.configured ? "Ready — Meta app configured ✓" : "Not configured yet — needs META_APP_ID + META_APP_SECRET") : "…"}</p><p>Redirect URI to paste in the Meta App (Facebook Login → Valid OAuth Redirect URIs):<br/><code>{st?.meta.redirect_uri || "…"}</code></p><a className="btn btn-primary" href="/api/auth/facebook">Connect Facebook + Instagram</a></div>
        <div className="card"><h3>2. YouTube</h3><p>Status: {st ? (st.google.configured ? "Ready — Google app configured ✓" : "Not configured yet — needs GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET") : "…"}</p><p>Redirect URI to paste in Google Cloud (OAuth client → Authorized redirect URIs):<br/><code>{st?.google.redirect_uri || "…"}</code></p><a className="btn btn-primary" href="/api/auth/google">Connect YouTube</a></div>
      </section>
      <section className="card">
        <h3>3. What you (the owner) must create — one time</h3>
        <ol>
          <li><b>Meta App</b> at developers.facebook.com → Create App → add Facebook Login + Instagram Graph products → set the redirect URI above → copy App ID + App Secret.</li>
          <li><b>Google OAuth app</b> at console.cloud.google.com → APIs & Services → Credentials → OAuth client (Web) → add the redirect URI above → enable YouTube Data API v3 → copy Client ID + Secret.</li>
          <li><b>Vercel env vars</b> (Project → Settings → Environment Variables, then Redeploy): META_APP_ID, META_APP_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET. Secrets go only in Vercel — never in chat, never in the repo.</li>
          <li>Come back here and tap Connect. Your own Page/channel connects immediately (owner/test user); public customers need Meta App Review / Google verification later.</li>
        </ol>
        <p><b>Connected now (demo memory):</b> {st?.connected?.length ? st.connected.map((c) => `${c.platform}: ${c.label}`).join(" • ") : "none yet — tokens reset on redeploy in demo mode; production will store them encrypted per-user in Supabase."}</p>
      </section>
    </main>
  );
}
