import Link from "next/link";
import { PLATFORMS } from "@/lib/store";

export default function Home() {
  return (<>
    <a className="skip" href="#main">Skip to content</a>
    <header className="pro-header"><div className="wrap"><Link className="logo" href="/">Mention<span>Hub</span></Link><nav className="pro-nav" aria-label="Main"><Link href="#features">Features</Link><Link href="#platforms">Platforms</Link><Link href="/pricing">Pricing</Link><Link href="#faq">FAQ</Link><Link className="btn" href="/bn">বাংলা</Link><Link className="btn btn-primary" href="/app">Open dashboard</Link></nav></div></header>
    <main id="main">
      <section className="pro-hero"><div className="wrap"><div className="hero-grid"><div>
        <div className="pro-eyebrow">Mention management for creators</div>
        <h1>Every mention, in one professional inbox.</h1>
        <p className="lead">Facebook, Instagram and YouTube mentions, comments and tags — organized, answered and tracked in one place. Built for creators and small Pages that want to reply fast without risking their account.</p>
        <div className="hero-ctas"><Link className="btn btn-primary" href="/app">Try the demo dashboard</Link><Link className="btn" href="/pricing">See pricing</Link><Link className="btn" href="/connect">Connect accounts</Link></div>
        <div className="pro-trust"><span>Free 15 profile checks</span><span>No card required</span><span>English + বাংলা</span><span>Opt-in only — no spam</span></div>
      </div>
      <div className="pro-panel" aria-label="Inbox preview">
        <div className="pro-panel-head"><span>Unified inbox — preview</span><span className="badge live">Demo</span></div>
        <div className="pro-panel-row"><span className="dot" style={{background:"#1877f2"}}/><div><b>Rahim Uddin</b> <span>· Facebook</span><br/><span>“@americancarsaga এই Corvette ZL-1 ভিডিওটা অসাধারণ!”</span></div></div>
        <div className="pro-panel-row"><span className="dot" style={{background:"#e1306c"}}/><div><b>Sara Ahmed</b> <span>· Instagram</span><br/><span>Mentioned you in a story — that Camaro thumbnail 🔥</span></div></div>
        <div className="pro-panel-row"><span className="dot" style={{background:"#ff0000"}}/><div><b>Classic Car Garage</b> <span>· YouTube</span><br/><span>“Great research on the 69 built figure — subscribed!”</span></div></div>
      </div></div>
      <div className="pro-stats" aria-label="At a glance">
        <div className="pro-stat"><b>3</b><span>Live platforms — Facebook, Instagram, YouTube</span></div>
        <div className="pro-stat"><b>8</b><span>Services — from inbox to auto-reply</span></div>
        <div className="pro-stat"><b>15</b><span>Free profile checks</span></div>
        <div className="pro-stat"><b>৳0</b><span>To start — free plan, no card</span></div>
      </div></div></section>

      <section className="pro-section" id="features"><div className="wrap"><div className="pro-kicker">Why MentionHub</div><h2>Built for replies, not just reports.</h2><p className="lead">Enterprise listening tools show you mentions. MentionHub helps you answer them — safely, in one place.</p>
        <div className="grid grid-3" style={{marginTop:24}}>
          <div className="pro-card"><h3>Reply in one tap</h3><p>Templates fill in {"{name}"} automatically. No copy-paste across three apps.</p></div>
          <div className="pro-card"><h3>Tag without risk</h3><p>Only opt-in fans, max 5 tags per post. Your Page stays safe from spam flags.</p></div>
          <div className="pro-card"><h3>Never miss a mention</h3><p>Watch keywords catch your brand name the moment it appears on Facebook.</p></div>
          <div className="pro-card"><h3>Check any public profile</h3><p>Post count, post types and recent activity for Facebook, LinkedIn, YouTube, X, Instagram, Pinterest and Reddit — 15 free checks.</p></div>
          <div className="pro-card"><h3>Safety rules, built in</h3><p>Daily limits, 60-second delays and quiet hours (12am–7am Dhaka). Auto-reply is off by default.</p></div>
          <div className="pro-card"><h3>English + বাংলা</h3><p>Full Bengali landing and pricing, with a bilingual dashboard. Built for Bangladeshi creators and global audiences.</p></div>
        </div></div></section>

      <section className="pro-section" id="platforms"><div className="wrap"><div className="pro-kicker">Platforms</div><h2>Start with the three that matter most.</h2><p className="lead">The rest come only when their APIs allow safe, official access.</p>
        <div className="grid grid-3" style={{marginTop:24}}>{PLATFORMS.map((p) => (<div className="pro-card" key={p.id}><div style={{display:"flex",justifyContent:"space-between",gap:8}}><h3>{p.label}</h3><span className={`badge ${p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"live":""}`}>{p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"Live in v1":"Coming soon"}</span></div><p>{p.v1}</p></div>))}</div></div></section>

      <section className="pro-section"><div className="wrap"><div className="pro-kicker">How it works</div><h2>The safe way, in three steps.</h2>
        <div className="grid grid-3" style={{marginTop:24}}>
          <div className="pro-card"><span className="pro-num">01</span><h3 style={{marginTop:10}}>Connect what you own</h3><p>Only your own Pages and channels, with official Meta / Google login. No passwords are ever stored.</p></div>
          <div className="pro-card"><span className="pro-num">02</span><h3 style={{marginTop:10}}>Everything in one inbox</h3><p>Mentions and comments, filtered by platform, status and keyword. Nothing gets lost across apps.</p></div>
          <div className="pro-card"><span className="pro-num">03</span><h3 style={{marginTop:10}}>Reply fast, stay safe</h3><p>Templates for people who already engaged with you. Limits and quiet hours stop spam flags.</p></div>
        </div>
        <div className="pro-note" style={{marginTop:20}}><strong>Please note:</strong> this tool never bulk-tags random people and never scrapes strangers. Auto-reply is off by default and only targets your opt-in list. That is what keeps Pages safe.</div></div></section>

      <section className="pro-section" id="pricing"><div className="wrap"><div className="pro-kicker">Pricing</div><h2>Simple, honest pricing.</h2>
        <div className="grid grid-3" style={{marginTop:24}}>
          <div className="pro-card"><h3>Free</h3><div className="pro-price">৳0 / $0</div><p>1 page · 100 mentions / month · 3 templates · Manual reply · 15 profile checks</p></div>
          <div className="card popular"><h3>Pro — Most popular</h3><div className="pro-price-dark">৳499 / $9 / month</div><p>5 pages · 2,000 mentions / month · Auto-reply rules · 100 profile checks / month</p></div>
          <div className="pro-card"><h3>Business</h3><div className="pro-price">৳1,499 / $29 / month</div><p>Unlimited pages · 10,000 mentions / month · Team seats · Priority support · Unlimited profile checks</p></div>
        </div>
        <p style={{color:"var(--muted)",marginTop:16}}>Bangladesh: bKash / Nagad manual payment in v1. International: Stripe. <Link href="/pricing">Full pricing details, comparison table &amp; what each service includes →</Link></p></div></section>

      <section className="pro-section" id="faq"><div className="wrap"><div className="pro-kicker">FAQ</div><h2>Common questions.</h2>
        <div className="grid grid-2" style={{marginTop:24}}>
          <div className="pro-card"><h3>Will this get my Page banned?</h3><p>No — if you use it as designed: only your own Pages, only people who engaged or opted in, with limits and delays. Bulk-tagging strangers is blocked by design.</p></div>
          <div className="pro-card"><h3>Do I need Facebook / Google approval?</h3><p>For live replies, yes: a Meta App (Facebook + Instagram) and a Google OAuth client (YouTube), plus App Review. The setup guide walks through it step by step.</p></div>
          <div className="pro-card"><h3>Can I use it for my own channel?</h3><p>Yes. Mazahar built it for americancarsaga first, and the same account can manage your Pages — then sell Pro to other creators.</p></div>
          <div className="pro-card"><h3>What happens on reload in the demo?</h3><p>Demo data resets. Real data only persists after Supabase is connected — see the README.</p></div>
        </div></div></section>
    </main>
    <footer className="pro-footer"><div className="wrap"><span>MentionHub — Next.js + Supabase + Vercel · Demo data included</span><span><Link href="/app">Dashboard</Link> · <Link href="/connect">Connect</Link> · <Link href="/pricing">Pricing</Link> · <Link href="/api/health">Health check</Link></span></div></footer>
  </>);
}
