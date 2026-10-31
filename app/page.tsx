import Link from "next/link";
import { PLATFORMS } from "@/lib/store";

const CAPS: [string, string][] = [
  ["Unified inbox", "Facebook, Instagram and YouTube mentions and comments in one place, filtered by platform, status and keyword."],
  ["Reply templates", "One-tap replies with {name} filled in automatically. No copy-paste across three apps."],
  ["Facebook Tag", "Tag only opt-in fans in posts and comments — max 5 tags per post, max 10 tag posts per day."],
  ["Monitor + watch keywords", "Catch your brand name the moment it appears on Facebook, and queue it for a safe reply."],
  ["Auto-reply, safely", "Off by default. Daily limits, 60-second delays and quiet hours (12am–7am Dhaka) stop spam flags."],
  ["Social Profile Checker", "Post count, post types and recent activity for 7 platforms — 15 free checks."],
  ["Opt-in list", "The safety rule of the whole product: only people who agreed to be mentioned, ever."],
  ["English + বাংলা", "Full Bengali landing and pricing, with a bilingual dashboard for Bangladeshi creators."],
];

export default function Home() {
  return (<div className="olly-bg">
    <a className="skip" href="#main">Skip to content</a>
    <header className="pro-header"><div className="wrap"><Link className="logo" href="/">Mention<span>Hub</span></Link><nav className="pro-nav" aria-label="Main"><Link href="#capabilities">Capabilities</Link><Link href="#platforms">Platforms</Link><Link href="/pricing">Pricing</Link><Link href="#faq">FAQ</Link><Link className="btn" href="/bn">বাংলা</Link><Link className="btn btn-primary" href="/app">Open dashboard</Link></nav></div></header>
    <main id="main">
      <section className="olly-hero"><div className="wrap">
        <div className="pro-eyebrow">Mention management for creators</div>
        <h1><span>Every mention.</span><span>One inbox.</span><span>No spam.</span></h1>
        <p className="olly-sub">From Facebook to YouTube, MentionHub organizes mentions, comments and tags — so creators and small Pages can reply fast, stay compliant, and grow reach without tagging strangers.</p>
        <div className="hero-ctas"><Link className="btn btn-primary" href="/app">Try the demo dashboard</Link><Link className="btn" href="/pricing">See pricing</Link><Link className="btn" href="/connect">Connect accounts</Link></div>
        <div className="pro-panel" style={{marginTop:36}} aria-label="Inbox preview">
          <div className="pro-panel-head"><span>Unified inbox — preview</span><span className="badge live">Demo</span></div>
          <div className="pro-panel-row"><span className="dot" style={{background:"#1877f2"}}/><div><b>Rahim Uddin</b> <span>· Facebook</span><br/><span>“@americancarsaga এই Corvette ZL-1 ভিডিওটা অসাধারণ!”</span></div></div>
          <div className="pro-panel-row"><span className="dot" style={{background:"#e1306c"}}/><div><b>Sara Ahmed</b> <span>· Instagram</span><br/><span>Mentioned you in a story — that Camaro thumbnail 🔥</span></div></div>
          <div className="pro-panel-row"><span className="dot" style={{background:"#ff0000"}}/><div><b>Classic Car Garage</b> <span>· YouTube</span><br/><span>“Great research on the 69 built figure — subscribed!”</span></div></div>
        </div>
      </div></section>

      <section className="olly-section"><div className="wrap"><h2>What matters<br/>to us</h2>
        <div className="olly-value">
          <div><h3>Saving time, where it matters</h3><p>One inbox replaces three apps and endless copy-paste, so you spend time on videos — not on chasing comments.</p></div>
          <div><h3>Reducing complexity</h3><p>Clear filters, one reply flow, one safety rule. Fewer decisions, faster replies, fewer mistakes.</p></div>
          <div><h3>Built for long-term use</h3><p>Opt-in only, with limits and quiet hours. A tool that keeps your Page safe as it grows, not just for one launch week.</p></div>
        </div>
      </div></section>

      <section className="olly-section" id="capabilities"><div className="wrap"><div className="pro-eyebrow">/ Core capabilities</div><h2>Everything a creator<br/>needs to reply.</h2>
        <div className="olly-rows">{CAPS.map(([t, d], i) => (<div className="olly-row" key={t}><span className="num">0{i + 1} /</span><div><h3>{t}</h3><p>{d}</p></div></div>))}</div>
      </div></section>

      <section className="olly-dark"><div className="wrap"><h2>MentionHub,<br/>in numbers.</h2>
        <div className="olly-numbers">
          <div><b>3</b><span>Live platforms — Facebook, Instagram, YouTube</span></div>
          <div><b>8</b><span>Services — from inbox to auto-reply</span></div>
          <div><b>15</b><span>Free profile checks</span></div>
          <div><b>2</b><span>Languages — English + বাংলা</span></div>
        </div>
      </div></section>

      <section className="olly-section" id="platforms"><div className="wrap"><div className="pro-eyebrow">/ Platforms</div><h2>Start with the three<br/>that matter most.</h2>
        <div className="grid grid-3" style={{marginTop:24}}>{PLATFORMS.map((p) => (<div className="pro-card" key={p.id}><div style={{display:"flex",justifyContent:"space-between",gap:8}}><h3>{p.label}</h3><span className={`badge ${p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"live":""}`}>{p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"Live in v1":"Coming soon"}</span></div><p>{p.v1}</p></div>))}</div>
      </div></section>

      <section className="olly-section" id="pricing"><div className="wrap"><div className="pro-eyebrow">/ Pricing</div><h2>Simple, honest<br/>pricing.</h2>
        <div className="grid grid-3" style={{marginTop:24}}>
          <div className="pro-card"><h3>Free</h3><div className="pro-price">৳0 / $0</div><p>1 page · 100 mentions / month · 3 templates · Manual reply · 15 profile checks</p></div>
          <div className="card popular"><h3>Pro — Most popular</h3><div className="pro-price-dark">৳499 / $9 / month</div><p>5 pages · 2,000 mentions / month · Auto-reply rules · 100 profile checks / month</p></div>
          <div className="pro-card"><h3>Business</h3><div className="pro-price">৳1,499 / $29 / month</div><p>Unlimited pages · 10,000 mentions / month · Team seats · Priority support · Unlimited profile checks</p></div>
        </div>
        <p style={{color:"var(--muted)",marginTop:16}}>Bangladesh: bKash / Nagad manual payment in v1. International: Stripe. <Link href="/pricing">Full pricing details, comparison table &amp; what each service includes →</Link></p>
      </div></section>

      <section className="olly-section" id="faq"><div className="wrap"><div className="pro-eyebrow">/ FAQ</div><h2>Common<br/>questions.</h2>
        <div className="grid grid-2" style={{marginTop:24}}>
          <div className="pro-card"><h3>Will this get my Page banned?</h3><p>No — if you use it as designed: only your own Pages, only people who engaged or opted in, with limits and delays. Bulk-tagging strangers is blocked by design.</p></div>
          <div className="pro-card"><h3>Do I need Facebook / Google approval?</h3><p>For live replies, yes: a Meta App (Facebook + Instagram) and a Google OAuth client (YouTube), plus App Review. The setup guide walks through it step by step.</p></div>
          <div className="pro-card"><h3>Can I use it for my own channel?</h3><p>Yes. Mazahar built it for americancarsaga first, and the same account can manage your Pages — then sell Pro to other creators.</p></div>
          <div className="pro-card"><h3>What happens on reload in the demo?</h3><p>Demo data resets. Real data only persists after Supabase is connected — see the README.</p></div>
        </div>
      </div></section>

      <section className="olly-cta"><div className="wrap"><h2>Reply to every mention.<br/>Risk nothing.</h2><div className="hero-ctas"><Link className="btn btn-primary" href="/app">Open the dashboard</Link><Link className="btn" href="/connect">Connect accounts</Link></div></div></section>
    </main>
    <footer className="pro-footer"><div className="wrap"><span>MentionHub — Next.js + Supabase + Vercel · Demo data included</span><span><Link href="/app">Dashboard</Link> · <Link href="/connect">Connect</Link> · <Link href="/pricing">Pricing</Link></span></div></footer>
  </div>);
}
