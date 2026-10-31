import Link from "next/link";
import { PLATFORMS } from "@/lib/store";

const CAPS: [string, string][] = [
  ["ইউনিফাইড ইনবক্স", "Facebook, Instagram আর YouTube-এর মেনশন আর কমেন্ট এক জায়গায় — প্ল্যাটফর্ম, স্ট্যাটাস আর কীওয়ার্ড দিয়ে ফিল্টার করে।"],
  ["রিপ্লাই টেমপ্লেট", "এক ট্যাপে রিপ্লাই, {name} নিজে থেকে বসে যায়। তিনটা অ্যাপে কপি-পেস্ট লাগে না।"],
  ["Facebook Tag", "শুধু অপ্ট-ইন ফ্যানদের পোস্ট আর কমেন্টে ট্যাগ — প্রতি পোস্টে সর্বোচ্চ ৫টা, দিনে সর্বোচ্চ ১০টা ট্যাগ পোস্ট।"],
  ["মনিটর + Watch Keyword", "Facebook-এ আপনার ব্র্যান্ডের নাম আসলেই ধরে ফেলে, আর নিরাপদ রিপ্লাইয়ের জন্য কিউতে রাখে।"],
  ["অটো-রিপ্লাই, নিরাপদে", "ডিফল্ট OFF। ডেইলি লিমিট, ৬০ সেকেন্ড ডিলে, Quiet Hours (রাত ১২টা–সকাল ৭টা) স্প্যাম ফ্ল্যাগ ঠেকায়।"],
  ["সোশ্যাল প্রোফাইল চেকার", "৭ প্ল্যাটফর্মে পোস্ট সংখ্যা, পোস্টের ধরন আর সাম্প্রতিক অ্যাক্টিভিটি — ফ্রিতে ১৫ বার।"],
  ["অপ্ট-ইন লিস্ট", "পুরো প্রোডাক্টের সেফটি রুল: যারা সম্মতি দিয়েছে, শুধু তাদেরই মেনশন করা যাবে।"],
  ["English + বাংলা", "পুরো বাংলা ল্যান্ডিং আর প্রাইসিং, সাথে বাইলিংগুয়াল ড্যাশবোর্ড — বাংলাদেশি ক্রিয়েটরদের জন্য।"],
];

export default function HomeBN() {
  return (<div className="olly-bg">
    <a className="skip" href="#main">মূল কনটেন্টে যান</a>
    <header className="pro-header"><div className="wrap"><Link className="logo" href="/bn">Mention<span>Hub</span></Link><nav className="pro-nav" aria-label="প্রধান মেনু"><Link href="#capabilities">ক্যাপাবিলিটি</Link><Link href="#platforms">প্ল্যাটফর্ম</Link><Link href="/bn/pricing">প্রাইসিং</Link><Link href="#faq">প্রশ্ন</Link><Link className="btn" href="/">English</Link><Link className="btn btn-primary" href="/app">ড্যাশবোর্ড খুলুন</Link></nav><details className="menu-mobile"><summary aria-label="মেনু খুলুন">মেনু ☰</summary><div className="menu-panel"><Link href="#capabilities">ক্যাপাবিলিটি</Link><Link href="#platforms">প্ল্যাটফর্ম</Link><Link href="/bn/pricing">প্রাইসিং</Link><Link href="#faq">প্রশ্ন</Link><Link href="/connect">অ্যাকাউন্ট কানেক্ট করুন</Link><Link href="/">English</Link><Link href="/app">ড্যাশবোর্ড খুলুন →</Link></div></details></div></header>
    <main id="main">
      <section className="olly-hero"><div className="wrap">
        <div className="pro-eyebrow">ক্রিয়েটরদের জন্য মেনশন ম্যানেজমেন্ট</div>
        <h1><span>প্রতিটা মেনশন।</span><span>একটাই ইনবক্স।</span><span>কোনো স্প্যাম নয়।</span></h1>
        <p className="olly-sub">Facebook থেকে YouTube — MentionHub মেনশন, কমেন্ট আর ট্যাগ গুছিয়ে দেয়, যাতে ক্রিয়েটর আর ছোট Page-গুলো দ্রুত রিপ্লাই দিতে পারে, অপরিচিত কাউকে ট্যাগ না করে, অ্যাকাউন্টের ঝুঁকি না নিয়ে।</p>
        <div className="hero-ctas"><Link className="btn btn-primary" href="/app">ডেমো ড্যাশবোর্ড দেখুন</Link><Link className="btn" href="/bn/pricing">প্রাইসিং দেখুন</Link><Link className="btn" href="/connect">অ্যাকাউন্ট কানেক্ট করুন</Link></div>
        <div className="pro-panel" style={{marginTop:36}} aria-label="ইনবক্স প্রিভিউ">
          <div className="pro-panel-head"><span>ইউনিফাইড ইনবক্স — প্রিভিউ</span><span className="badge live">ডেমো</span></div>
          <div className="pro-panel-row"><span className="dot" style={{background:"#1877f2"}}/><div><b>Rahim Uddin</b> <span>· Facebook</span><br/><span>“@americancarsaga এই Corvette ZL-1 ভিডিওটা অসাধারণ!”</span></div></div>
          <div className="pro-panel-row"><span className="dot" style={{background:"#e1306c"}}/><div><b>Sara Ahmed</b> <span>· Instagram</span><br/><span>স্টোরিতে মেনশন করেছেন — Camaro থাম্বনেইলটা 🔥</span></div></div>
          <div className="pro-panel-row"><span className="dot" style={{background:"#ff0000"}}/><div><b>Classic Car Garage</b> <span>· YouTube</span><br/><span>“69 built ফিগারের রিসার্চটা দারুণ — সাবস্ক্রাইব করলাম!”</span></div></div>
        </div>
      </div></section>

      <section className="olly-section"><div className="wrap"><h2>আমাদের কাছে<br/>যা গুরুত্বপূর্ণ</h2>
        <div className="olly-value">
          <div><h3>যেখানে দরকার, সেখানে সময় বাঁচানো</h3><p>তিনটা অ্যাপ আর কপি-পেস্টের বদলে একটা ইনবক্স — সময় যাবে ভিডিওতে, কমেন্ট খুঁজতে নয়।</p></div>
          <div><h3>জটিলতা কমানো</h3><p>পরিষ্কার ফিল্টার, একটা রিপ্লাই ফ্লো, একটা সেফটি রুল। সিদ্ধান্ত কম, রিপ্লাই দ্রুত, ভুল কম।</p></div>
          <div><h3>দীর্ঘদিন ব্যবহারের জন্য বানানো</h3><p>শুধু অপ্ট-ইন, লিমিট আর Quiet Hoursসহ। Page বড় হলেও নিরাপদ থাকবে — শুধু এক সপ্তাহের লঞ্চের জন্য নয়।</p></div>
        </div>
      </div></section>

      <section className="olly-section" id="capabilities"><div className="wrap"><div className="pro-eyebrow">/ কোর ক্যাপাবিলিটি</div><h2>রিপ্লাই দিতে<br/>যা যা দরকার।</h2>
        <div className="olly-rows">{CAPS.map(([t, d], i) => (<div className="olly-row" key={t}><span className="num">0{i + 1} /</span><div><h3>{t}</h3><p>{d}</p></div></div>))}</div>
      </div></section>

      <section className="olly-dark"><div className="wrap"><h2>MentionHub,<br/>সংখ্যায়।</h2>
        <div className="olly-numbers">
          <div><b>৩</b><span>লাইভ প্ল্যাটফর্ম — Facebook, Instagram, YouTube</span></div>
          <div><b>৮</b><span>সার্ভিস — ইনবক্স থেকে অটো-রিপ্লাই</span></div>
          <div><b>১৫</b><span>ফ্রি প্রোফাইল চেক</span></div>
          <div><b>২</b><span>ভাষা — English + বাংলা</span></div>
        </div>
      </div></section>

      <section className="olly-section" id="platforms"><div className="wrap"><div className="pro-eyebrow">/ প্ল্যাটফর্ম</div><h2>সবচেয়ে দরকারি<br/>তিনটা দিয়ে শুরু।</h2>
        <div className="grid grid-3" style={{marginTop:24}}>{PLATFORMS.map((p) => (<div className="pro-card" key={p.id}><div style={{display:"flex",justifyContent:"space-between",gap:8}}><h3>{p.label}</h3><span className={`badge ${p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"live":""}`}>{p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"v1-এ লাইভ":"শীঘ্রই আসছে"}</span></div><p>{p.v1}</p></div>))}</div>
      </div></section>

      <section className="olly-section" id="pricing"><div className="wrap"><div className="pro-eyebrow">/ প্রাইসিং</div><h2>সহজ, সৎ<br/>প্রাইসিং।</h2>
        <div className="grid grid-3" style={{marginTop:24}}>
          <div className="pro-card"><h3>Free</h3><div className="pro-price">৳০ / $০</div><p>১টা পেজ • মাসে ১০০টা মেনশন • ৩টা টেমপ্লেট • ম্যানুয়াল রিপ্লাই • ১৫ বার প্রোফাইল চেক</p></div>
          <div className="card popular"><h3>Pro — সবচেয়ে জনপ্রিয়</h3><div className="pro-price-dark">৳৪৯৯ / $৯ / মাস</div><p>৫টা পেজ • মাসে ২,০০০ মেনশন • অটো-রিপ্লাই রুলস • মাসে ১০০ বার প্রোফাইল চেক</p></div>
          <div className="pro-card"><h3>Business</h3><div className="pro-price">৳১,৪৯৯ / $২৯ / মাস</div><p>আনলিমিটেড পেজ • মাসে ১০,০০০ মেনশন • টিম সিট • প্রায়োরিটি সাপোর্ট • আনলিমিটেড প্রোফাইল চেক</p></div>
        </div>
        <p style={{color:"var(--muted)",marginTop:16}}>বাংলাদেশে bKash / Nagad ম্যানুয়াল পেমেন্ট (v1), ইন্টারন্যাশনালে Stripe। <Link href="/bn/pricing">পুরো প্রাইসিং ডিটেইলস, তুলনা টেবিল আর প্রতিটা সার্ভিসে কী কী আছে →</Link></p>
      </div></section>

      <section className="olly-section" id="faq"><div className="wrap"><div className="pro-eyebrow">/ সাধারণ প্রশ্ন</div><h2>সাধারণ<br/>প্রশ্ন।</h2>
        <div className="grid grid-2" style={{marginTop:24}}>
          <div className="pro-card"><h3>এতে কি আমার Page ব্যান হবে?</h3><p>না — ঠিকভাবে ব্যবহার করলে: শুধু নিজের Page, শুধু যারা এনগেজ করেছে বা অপ্ট-ইন দিয়েছে, লিমিট আর ডিলেসহ। অপরিচিতদের বাল্ক ট্যাগ করাই ব্যানের কারণ, আর সেটা এখানে ডিজাইন দিয়েই ব্লক করা।</p></div>
          <div className="pro-card"><h3>লাইভ রিপ্লাইয়ের জন্য কী লাগবে?</h3><p>Meta App (Facebook + Instagram) আর Google OAuth (YouTube), সাথে App Review। সেটআপ গাইডে ধাপে ধাপে লেখা আছে।</p></div>
          <div className="pro-card"><h3>আমি কি নিজের চ্যানেলের জন্য ব্যবহার করতে পারবো?</h3><p>হ্যাঁ। Mazahar এটা americancarsaga-র জন্য বানিয়েছেন, আর একই অ্যাকাউন্ট দিয়ে নিজের Page চালাতে পারবেন — তারপর Pro অন্য ক্রিয়েটরদের কাছে বিক্রি করতে পারবেন।</p></div>
          <div className="pro-card"><h3>ডেমোতে রিলোড দিলে কী হবে?</h3><p>ডেমো ডেটা মুছে যাবে। আসল ডেটা বাঁচাতে Supabase কানেক্ট করতে হবে — README-তে লেখা আছে।</p></div>
        </div>
      </div></section>

      <section className="olly-cta"><div className="wrap"><h2>প্রতিটা মেনশনে রিপ্লাই দিন।<br/>কোনো ঝুঁকি ছাড়াই।</h2><div className="hero-ctas"><Link className="btn btn-primary" href="/app">ড্যাশবোর্ড খুলুন</Link><Link className="btn" href="/connect">অ্যাকাউন্ট কানেক্ট করুন</Link></div></div></section>
    </main>
    <footer className="pro-footer"><div className="wrap"><span>MentionHub — Next.js + Supabase + Vercel · ডেমো ডেটাসহ</span><span><Link href="/app">ড্যাশবোর্ড</Link> · <Link href="/connect">কানেক্ট</Link> · <Link href="/bn/pricing">প্রাইসিং</Link> · <Link href="/">English version</Link></span></div></footer>
  </div>);
}
