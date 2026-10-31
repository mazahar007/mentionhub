"use client";
import { useState } from "react";
import Link from "next/link";

type Plan = { name: string; tagline: string; monthlyBDT: string; monthlyUSD: string; yearlyBDT: string; yearlyUSD: string; cta: string; popular?: boolean; features: string[] };

const plans: Plan[] = [
  { name: "Free", tagline: "Try it on one Page, no card needed.", monthlyBDT: "৳0", monthlyUSD: "$0", yearlyBDT: "৳0", yearlyUSD: "$0", cta: "Start free", features: ["1 connected Page / channel", "100 mentions / month in the inbox", "Facebook, Instagram, YouTube inbox (demo data)", "Platform, status & keyword filters + search", "3 reply templates with {name}", "Opt-in list up to 50 contacts", "Manual reply (one by one)", "Basic counts: total / new / replied", "Community support (in-app help)", "Social Profile Checker: 15 free checks (7 platforms)"] },
  { name: "Pro", tagline: "For serious creators & small pages.", monthlyBDT: "৳499", monthlyUSD: "$9", yearlyBDT: "৳4,990", yearlyUSD: "$90", cta: "Choose Pro", popular: true, features: ["Up to 5 connected Pages / channels", "2,000 mentions / month", "Everything in Free, plus:", "Facebook Tag composer — post & comment tagging", "Tag safety: max 5 tags / post, 10 tag posts / day", "Mention monitor + watch keywords (unlimited)", "Auto-reply engine (opt-in / keyword only, max 10 / run)", "Unlimited reply templates", "Opt-in list up to 1,000 contacts", "Safety rules: daily limit, 60s delay, quiet hours", "Priority email support", "Social Profile Checker: 100 checks / month"] },
  { name: "Business", tagline: "For agencies, brands & teams.", monthlyBDT: "৳1,499", monthlyUSD: "$29", yearlyBDT: "৳14,990", yearlyUSD: "$290", cta: "Choose Business", features: ["Unlimited connected Pages / channels", "10,000 mentions / month", "Everything in Pro, plus:", "3 team seats (shared inbox, same rules)", "Opt-in list unlimited", "Higher auto-reply limits (per-run & daily, on request)", "Monthly performance summary", "Onboarding call (30 min, one time)", "Priority support with 1-business-day reply", "Social Profile Checker: unlimited checks"] },
];

const compare: { feature: string; free: string; pro: string; business: string }[] = [
  { feature: "Connected Pages / channels", free: "1", pro: "5", business: "Unlimited" },
  { feature: "Mentions / month", free: "100", pro: "2,000", business: "10,000" },
  { feature: "Unified inbox + filters + search", free: "✓", pro: "✓", business: "✓" },
  { feature: "Reply templates", free: "3", pro: "Unlimited", business: "Unlimited" },
  { feature: "Opt-in contacts", free: "50", pro: "1,000", business: "Unlimited" },
  { feature: "Facebook Tag composer", free: "—", pro: "✓", business: "✓" },
  { feature: "Mention monitor + watch keywords", free: "—", pro: "✓", business: "✓" },
  { feature: "Auto-reply engine", free: "—", pro: "✓", business: "✓" },
  { feature: "Safety rules (limit / delay / quiet hours)", free: "Basic", pro: "✓", business: "✓" },
  { feature: "Team seats", free: "—", pro: "—", business: "3" },
  { feature: "Support", free: "Community", pro: "Priority email", business: "Priority, 1-day reply" },
];

const services = [
  { title: "1. Unified Inbox", what: "Facebook, Instagram and YouTube mentions and comments in one screen, instead of opening three apps.", includes: ["Platform filter (Facebook / Instagram / YouTube)", "Status filter (New / Replied / Ignored)", "Keyword search across author + text", "One-tap Reply, Ignore, Reopen on every mention"], not: ["Threads, TikTok and X are shown as Coming soon — their APIs do not allow safe official access yet."] },
  { title: "2. Facebook Tag Composer", what: "Write a post or comment and tag people from your opt-in list, with a live preview before you queue it.", includes: ["Post + comment composer", "Opt-in Facebook contacts only, with checkboxes", "Live preview with @handles", "Queue list of every tag job with its status"], not: ["No bulk tagging, no strangers, no scraped lists. Max 5 tags per post and 10 tag posts per day — enforced in the app."] },
  { title: "3. Mention Monitor", what: "Watch for your brand name and keywords on Facebook, so a mention never sits unseen for days.", includes: ["Facebook mention list, newest first", "Watch keywords you add yourself (e.g. your Page name)", "Keyword match highlighted by the engine", "Monitor log of what was checked"], not: ["This is not social listening across the whole internet — it monitors mentions that reach your connected Pages / channels."] },
  { title: "4. Auto-Reply Engine", what: "Replies automatically, but only to the right people and only when you switch it on.", includes: ["OFF by default — you turn rule r1 on", "Only opt-in authors or keyword matches", "First template is used, with {name} filled in", "Max 10 replies per run, with a full log"], not: ["No auto-reply to strangers, no spam bursts, no replies during quiet hours (12am–7am Asia/Dhaka)."] },
  { title: "5. Reply Templates", what: "Save the replies you use again and again, in English and Bangla.", includes: ["Create, edit and delete templates", "{name}, {handle} and {platform} variables", "One-tap use from any mention card", "Bangla + English templates included"], not: ["Templates do not send themselves — you (or the auto-reply engine, when ON) choose when to use them."] },
  { title: "6. Opt-in Contact List", what: "The safety backbone of the whole product: the only people who can ever be tagged or auto-replied to.", includes: ["Add a contact only with confirmed consent", "Facebook / Instagram / YouTube contacts", "Remove a contact any time (stops all future tags/replies)"], not: ["Buying, scraping or importing a stranger list is not supported, on purpose."] },
  { title: "7. Safety & Compliance Rules", what: "The rules that keep your Page from being flagged as spam.", includes: ["Daily reply limit (Free/Pro/Business tiers)", "60-second delay between replies", "Quiet hours 12am–7am Asia/Dhaka", "Auto-reply OFF by default"], not: ["These rules do not override Facebook / Instagram / YouTube policies — final approval for live posting still comes from Meta / Google App Review."] },
  { title: "8. Accounts & Connections", what: "Connect only what you own, with official login. No passwords are stored in MentionHub.", includes: ["Facebook Page via Meta login (needs Meta App + App Review)", "Instagram Business via the same Meta login", "YouTube channel via Google OAuth (YouTube Data API v3)"], not: ["Live posting is not active until those connections + reviews are complete. Until then, jobs and replies are saved as drafts in the dashboard."] },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (<>
    <header className="pro-header"><div className="wrap"><Link className="logo" href="/">Mention<span>Hub</span></Link><nav className="pro-nav" aria-label="Main"><Link href="/">Home</Link><Link href="/#capabilities">Capabilities</Link><Link href="/connect">Connect</Link><Link className="btn" href="/bn/pricing">বাংলা</Link><Link className="btn btn-primary" href="/app">Open dashboard</Link></nav><details className="menu-mobile"><summary aria-label="Open menu">Menu ☰</summary><div className="menu-panel"><Link href="/">Home</Link><Link href="/#capabilities">Capabilities</Link><Link href="/#platforms">Platforms</Link><Link href="/connect">Connect accounts</Link><Link href="/bn/pricing">বাংলা</Link><Link href="/app">Open dashboard →</Link></div></details></div></header>
    <main className="wrap">
      <section className="hero" style={{paddingBottom:16}}>
        <span className="pill">PRICING • NO HIDDEN FEES</span>
        <h1>Pricing that grows<br/>with your Page.</h1>
        <p className="lead">Start free. Upgrade only when mentions grow. Cancel any time — no lock-in, no card needed for Free.</p>
        <div style={{display:"flex",gap:8,marginTop:22}} role="group" aria-label="Billing period">
          <button className={`btn ${!yearly?"btn-dark":""}`} onClick={()=>setYearly(false)}>Monthly</button>
          <button className={`btn ${yearly?"btn-dark":""}`} onClick={()=>setYearly(true)}>Yearly — pay for 10 months, get 12</button>
        </div>
        <p style={{color:"var(--muted)",fontSize:14,marginTop:10}}>{yearly ? "Yearly price shown is per year, not per month." : "Monthly price, billed monthly. Switch to Yearly to save 2 months."}</p>
      </section>

      <section style={{paddingTop:16}}>
        <div className="grid grid-3">{plans.map((p) => (<div className={`card ${p.popular?"popular":""}`} key={p.name} style={{display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",justifyContent:"space-between",gap:8}}><h3>{p.name}</h3>{p.popular && <span className="badge live">Most popular</span>}</div>
          <p>{p.tagline}</p>
          <p style={{marginTop:16}}><b style={{fontSize:34,color:p.popular?"#fff":"var(--ink)"}}>{yearly?p.yearlyBDT:p.monthlyBDT}</b> <span style={{color:p.popular?"rgba(255,255,255,.7)":"var(--muted)"}}>/ {yearly?"year":"month"}</span><br/><span style={{color:p.popular?"rgba(255,255,255,.7)":"var(--muted)"}}>or {yearly?p.yearlyUSD:p.monthlyUSD} {yearly?"/ year":"/ month"} (international)</span></p>
          <ul style={{paddingLeft:20,flex:1}}>{p.features.map((f)=>(<li key={f} style={{margin:"8px 0"}}>{f}</li>))}</ul>
          <Link className={`btn ${p.popular?"btn-primary":""}`} href="/app" style={{marginTop:16}}>{p.cta} →</Link>
        </div>))}</div>
      </section>

      <section>
        <h2>Compare plans, line by line</h2>
        <div style={{overflowX:"auto",marginTop:16}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:640,background:"var(--surface)",border:"1px solid var(--line)",borderRadius:16,overflow:"hidden"}}>
          <thead><tr><th style={{textAlign:"left",padding:14,borderBottom:"1px solid var(--line)"}}>Feature</th><th style={{padding:14,borderBottom:"1px solid var(--line)"}}>Free</th><th style={{padding:14,borderBottom:"1px solid var(--line)"}}>Pro</th><th style={{padding:14,borderBottom:"1px solid var(--line)"}}>Business</th></tr></thead>
          <tbody>{compare.map((r)=>(<tr key={r.feature}><td style={{padding:12,borderBottom:"1px solid var(--line)"}}>{r.feature}</td><td style={{padding:12,textAlign:"center",borderBottom:"1px solid var(--line)"}}>{r.free}</td><td style={{padding:12,textAlign:"center",borderBottom:"1px solid var(--line)"}}>{r.pro}</td><td style={{padding:12,textAlign:"center",borderBottom:"1px solid var(--line)"}}>{r.business}</td></tr>))}</tbody>
        </table></div>
      </section>

      <section>
        <h2>What each service includes — specifically</h2>
        <p className="lead">No vague “all features” claims. Here is exactly what is inside each service, and what is deliberately not included.</p>
        <div className="grid grid-2" style={{marginTop:20}}>{services.map((s)=>(<div className="card" key={s.title}><h3>{s.title}</h3><p>{s.what}</p><p style={{marginTop:14}}><b style={{color:"var(--ink)"}}>Includes:</b></p><ul style={{paddingLeft:20}}>{s.includes.map((x)=>(<li key={x} style={{margin:"6px 0"}}>{x}</li>))}</ul><p><b style={{color:"var(--ink)"}}>Not included / limits:</b> {s.not.join(" ")}</p></div>))}</div>
      </section>

      <section>
        <h2>Payment & questions</h2>
        <div className="grid grid-2" style={{marginTop:20}}>
          <div className="card"><h3>How do I pay?</h3><p>Bangladesh: bKash / Nagad (manual payment + admin activation in v1). International: Stripe card payment. Yearly plans are one payment per year.</p></div>
          <div className="card"><h3>Can I cancel any time?</h3><p>Yes. Cancel any time and you keep the plan until the end of the paid period. Free stays free forever.</p></div>
          <div className="card"><h3>What if I go over my mention limit?</h3><p>New mentions keep arriving in the inbox, but auto-reply and tag jobs pause until the next month or until you upgrade. Nothing is deleted.</p></div>
          <div className="card"><h3>Is the demo really free?</h3><p>Yes. The live demo at mention-manager-ghorowa.vercel.app needs no card. Plan limits and billing are enforced when billing launches — the demo is open until then.</p></div>
          <div className="card"><h3>Will this get my Page banned?</h3><p>Not if used as designed: opt-in contacts only, limits, delays and quiet hours. Bulk-tagging strangers is blocked by design, because that is what gets Pages flagged.</p></div>
          <div className="card"><h3>When does live Facebook posting start?</h3><p>After Meta App + Page permissions + App Review are complete. Until then, tag jobs and replies are saved as drafts in the dashboard.</p></div>
        </div>
        <div style={{marginTop:20}}><Link className="btn btn-dark" href="/app">Try the demo dashboard →</Link> <Link className="btn" href="/">← Back to home</Link></div>
      </section>
    </main>
    <footer><div className="wrap">MentionHub pricing • Prices in BDT for Bangladesh, USD internationally • <Link href="/app">Dashboard</Link></div></footer>
  </>);
}
