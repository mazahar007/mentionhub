import Link from "next/link";
import { PLATFORMS } from "@/lib/store";

export default function Home() {
  return (<>
    <a className="skip" href="#main">Skip to content</a>
    <header><div className="wrap"><Link className="logo" href="/">Mention<span>Hub</span></Link><nav aria-label="Main" style={{display:"flex",gap:10}}><Link className="btn" href="/bn">বাংলা</Link><Link className="btn" href="/login">Log in</Link><Link className="btn btn-primary" href="/app">Open dashboard</Link></nav></div></header>
    <main id="main" className="wrap">
      <section className="hero hero-stunning"><div className="hero-grid"><div>
        <span className="pill">ALL-PLATFORM MENTION MANAGER • V3 DESIGN</span>
        <h1>Every mention.<br/><span className="grad-text">One inbox.</span><br/>No spam.</h1>
        <p className="lead">Facebook, Instagram and YouTube mentions in one place. Reply in one tap with templates, see who mentioned you, and grow reach — without tagging strangers.</p>
        <div className="hero-ctas"><Link className="btn btn-dark" href="/app">Try the demo dashboard →</Link><Link className="btn" href="/pricing">Pricing details →</Link></div>
        <p className="hero-note">No login or API key needed for the demo. Real accounts connect later with official Meta / Google login only.</p>
      </div>
      <div className="mock mock-stunning" aria-label="Inbox preview">
        <div className="mock-head"><span>Unified inbox — preview</span><span className="badge live">● Live demo</span></div>
        <div className="mock-row"><span className="dot" style={{background:"#1877f2"}}/><div><b>Rahim Uddin</b> <span style={{color:"var(--muted)"}}>· Facebook</span><br/><span style={{color:"var(--muted)"}}>“@americancarsaga এই Corvette ZL-1 ভিডিওটা অসাধারণ!”</span></div></div>
        <div className="mock-row"><span className="dot" style={{background:"#e1306c"}}/><div><b>Sara Ahmed</b> <span style={{color:"var(--muted)"}}>· Instagram</span><br/><span style={{color:"var(--muted)"}}>Mentioned you in a story — that Camaro thumbnail 🔥</span></div></div>
        <div className="mock-row"><span className="dot" style={{background:"#ff0000"}}/><div><b>Classic Car Garage</b> <span style={{color:"var(--muted)"}}>· YouTube</span><br/><span style={{color:"var(--muted)"}}>“Great research on the 69 built figure — subscribed!”</span></div></div>
      </div></div>
      <div className="stat-strip" aria-label="At a glance">
        <div className="stat"><b>3</b><span>Live platforms<br/>Facebook • Instagram • YouTube</span></div>
        <div className="stat"><b>8</b><span>Services<br/>Inbox to auto-reply</span></div>
        <div className="stat"><b>2</b><span>Languages<br/>English • বাংলা</span></div>
        <div className="stat"><b>৳0</b><span>To start<br/>Free plan, no card</span></div>
      </div></section>

      <section aria-labelledby="features"><div className="eyebrow">Why creators choose it</div><h2 id="features">Built for replies, not just reports.</h2><p className="lead">Enterprise listening tools show you mentions. MentionHub helps you answer them — safely, in one place.</p>
        <div className="grid grid-3" style={{marginTop:20}}>
          <div className="card lift feature"><h3>Reply in one tap</h3><p>Templates fill in {"{name}"} automatically. No copy-paste across three apps.</p></div>
          <div className="card lift feature"><h3>Tag without risk</h3><p>Only opt-in fans, max 5 tags per post. Your Page stays safe from spam flags.</p></div>
          <div className="card lift feature"><h3>Never miss a mention</h3><p>Watch keywords catch your brand name the moment it appears on Facebook.</p></div>
        </div></section>

      <section aria-labelledby="platforms"><h2 id="platforms">Platforms</h2><p className="lead">Start with the three that matter most for creators. The rest come only when their APIs allow safe, official access.</p>
        <div className="grid grid-3" style={{marginTop:20}}>{PLATFORMS.map((p) => (<div className="card" key={p.id}><div style={{display:"flex",justifyContent:"space-between",gap:8}}><h3>{p.label}</h3><span className={`badge ${p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"live":""}`}>{p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"Live in v1":"Coming soon"}</span></div><p>{p.v1}</p></div>))}</div>
      </section>

      <section aria-labelledby="how"><h2 id="how">How it works — the safe way</h2>
        <div className="grid grid-3" style={{marginTop:20}}>
          <div className="card lift"><span className="pill">1</span><h3 style={{marginTop:12}}>Connect what you own</h3><p>Only your own Pages and channels, with official login. No passwords are ever stored.</p></div>
          <div className="card lift"><span className="pill">2</span><h3 style={{marginTop:12}}>Everything in one inbox</h3><p>Mentions and comments, filtered by platform, status and keyword. Nothing gets lost across apps.</p></div>
          <div className="card lift"><span className="pill">3</span><h3 style={{marginTop:12}}>Reply fast, stay safe</h3><p>Templates like {"{name}"} for people who already engaged with you. Daily limits, delays and quiet hours stop spam flags.</p></div>
        </div>
        <div className="card" style={{marginTop:16,background:"var(--orange-soft)"}}><strong>Please note:</strong> this tool never bulk-tags random people and never scrapes strangers. Auto-reply is off by default and only targets your opt-in list. That is what keeps Pages safe.</div>
      </section>

      <section id="pricing" aria-labelledby="pricing-h"><h2 id="pricing-h">Simple pricing</h2>
        <div className="grid grid-3" style={{marginTop:20}}>
          <div className="card"><h3>Free</h3><p><b style={{color:"var(--ink)",fontSize:22}}>৳0 / $0</b><br/>1 page • 100 mentions / month • 3 templates • Manual reply</p></div>
          <div className="card popular"><h3>Pro ⭐ Most popular</h3><p><b style={{color:"#fff",fontSize:22}}>৳499 / $9 / month</b><br/>5 pages • 2,000 mentions / month • Auto-reply rules • Analytics</p></div>
          <div className="card"><h3>Business</h3><p><b style={{color:"var(--ink)",fontSize:22}}>৳1,499 / $29 / month</b><br/>Unlimited pages • 10,000 mentions / month • Team seats • Priority support</p></div>
        </div>
        <p style={{color:"var(--muted)"}}>Bangladesh: bKash / Nagad manual payment in v1. International: Stripe. Automatic billing is the next step after launch. <Link href="/pricing">Full pricing details, comparison table & what each service includes →</Link></p>
      </section>

      <section aria-labelledby="faq"><h2 id="faq">Common questions</h2>
        <div className="grid grid-2" style={{marginTop:20}}>
          <div className="card"><h3>Will this get my Page banned?</h3><p>No — if you use it as designed: only your own Pages, only people who engaged or opted in, with limits and delays. Bulk-tagging strangers is blocked by design.</p></div>
          <div className="card"><h3>Do I need Facebook / Google approval?</h3><p>For live replies, yes: a Meta App (Facebook + Instagram) and a Google OAuth client (YouTube), plus App Review. The setup guide walks through it step by step.</p></div>
          <div className="card"><h3>Can I use it for my own channel?</h3><p>Yes. Mazahar built it for americancarsaga first, and the same account can manage your Pages — then sell Pro to other creators.</p></div>
          <div className="card"><h3>What happens on reload in the demo?</h3><p>Demo data resets. Real data only persists after Supabase is connected — see the README.</p></div>
        </div>
      </section>
    </main>
    <footer><div className="wrap">MentionHub v2 • Next.js + Supabase + Vercel • Demo data included • <Link href="/app">Dashboard</Link> • <Link href="/api/health">Health check</Link></div></footer>
  </>);
}
