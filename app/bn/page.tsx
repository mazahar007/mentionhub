import Link from "next/link";
import { PLATFORMS } from "@/lib/store";

export default function HomeBN() {
  return (<>
    <a className="skip" href="#main">মূল কনটেন্টে যান</a>
    <header className="pro-header"><div className="wrap"><Link className="logo" href="/bn">Mention<span>Hub</span></Link><nav className="pro-nav"><Link href="#features">ফিচার</Link><Link href="#platforms">প্ল্যাটফর্ম</Link><Link href="/bn/pricing">প্রাইসিং</Link><Link href="#faq">প্রশ্ন</Link><Link className="btn" href="/">English</Link><Link className="btn btn-primary" href="/app">ড্যাশবোর্ড খুলুন</Link></nav></div></header>
    <main id="main">
      <section className="pro-hero"><div className="wrap"><div className="hero-grid"><div>
        <div className="pro-eyebrow">ক্রিয়েটরদের জন্য মেনশন ম্যানেজমেন্ট</div>
        <h1>প্রতিটা মেনশন, একটাই প্রফেশনাল ইনবক্সে।</h1>
        <p className="lead">Facebook, Instagram আর YouTube-এর মেনশন, কমেন্ট আর ট্যাগ — সাজানো, উত্তর দেওয়া আর ট্র্যাক করা এখন এক জায়গায়। দ্রুত রিপ্লাই দিতে চান, কিন্তু অ্যাকাউন্টের ঝুঁকি নিতে চান না — তাদের জন্যই বানানো।</p>
        <div className="hero-ctas"><Link className="btn btn-primary" href="/app">ডেমো ড্যাশবোর্ড দেখুন</Link><Link className="btn" href="/bn/pricing">প্রাইসিং দেখুন</Link><Link className="btn" href="/connect">অ্যাকাউন্ট কানেক্ট করুন</Link></div>
        <div className="pro-trust"><span>ফ্রিতে ১৫ বার প্রোফাইল চেক</span><span>কার্ড লাগে না</span><span>English + বাংলা</span><span>শুধু অপ্ট-ইন — কোনো স্প্যাম নয়</span></div>
      </div>
      <div className="pro-panel" aria-label="ইনবক্স প্রিভিউ">
        <div className="pro-panel-head"><span>ইউনিফাইড ইনবক্স — প্রিভিউ</span><span className="badge live">ডেমো</span></div>
        <div className="pro-panel-row"><span className="dot" style={{background:"#1877f2"}}/><div><b>Rahim Uddin</b> <span>· Facebook</span><br/><span>“@americancarsaga এই Corvette ZL-1 ভিডিওটা অসাধারণ!”</span></div></div>
        <div className="pro-panel-row"><span className="dot" style={{background:"#e1306c"}}/><div><b>Sara Ahmed</b> <span>· Instagram</span><br/><span>স্টোরিতে মেনশন করেছেন — Camaro থাম্বনেইলটা 🔥</span></div></div>
        <div className="pro-panel-row"><span className="dot" style={{background:"#ff0000"}}/><div><b>Classic Car Garage</b> <span>· YouTube</span><br/><span>“69 built ফিগারের রিসার্চটা দারুণ — সাবস্ক্রাইব করলাম!”</span></div></div>
      </div></div>
      <div className="pro-stats" aria-label="এক নজরে">
        <div className="pro-stat"><b>৩</b><span>লাইভ প্ল্যাটফর্ম — Facebook, Instagram, YouTube</span></div>
        <div className="pro-stat"><b>৮</b><span>সার্ভিস — ইনবক্স থেকে অটো-রিপ্লাই</span></div>
        <div className="pro-stat"><b>১৫</b><span>ফ্রি প্রোফাইল চেক</span></div>
        <div className="pro-stat"><b>৳০</b><span>শুরু করতে — Free প্ল্যান, কার্ড লাগে না</span></div>
      </div></div></section>

      <section className="pro-section" id="features"><div className="wrap"><div className="pro-kicker">কেন MentionHub</div><h2>শুধু রিপোর্ট নয়, রিপ্লাইয়ের জন্য বানানো।</h2><p className="lead">বড় লিসেনিং টুলগুলো শুধু মেনশন দেখায়। MentionHub সেখানে উত্তর দিতে সাহায্য করে — নিরাপদে, এক জায়গায়।</p>
        <div className="grid grid-3" style={{marginTop:24}}>
          <div className="pro-card"><h3>এক ট্যাপে রিপ্লাই</h3><p>টেমপ্লেটে {"{name}"} নিজে থেকে বসে যায়। তিনটা অ্যাপে কপি-পেস্ট লাগে না।</p></div>
          <div className="pro-card"><h3>ঝুঁকি ছাড়া ট্যাগ</h3><p>শুধু অপ্ট-ইন ফ্যান, প্রতি পোস্টে সর্বোচ্চ ৫টা ট্যাগ। Page স্প্যাম ফ্ল্যাগ থেকে নিরাপদ থাকে।</p></div>
          <div className="pro-card"><h3>কোনো মেনশন মিস নয়</h3><p>Watch Keyword আপনার ব্র্যান্ডের নাম Facebook-এ আসলেই ধরে ফেলে।</p></div>
          <div className="pro-card"><h3>যেকোনো পাবলিক প্রোফাইল চেক</h3><p>পোস্ট সংখ্যা, পোস্টের ধরন আর সাম্প্রতিক অ্যাক্টিভিটি — Facebook, LinkedIn, YouTube, X, Instagram, Pinterest, Reddit — ফ্রিতে ১৫ বার।</p></div>
          <div className="pro-card"><h3>সেফটি রুলস বিল্ট-ইন</h3><p>ডেইলি লিমিট, ৬০ সেকেন্ড ডিলে, Quiet Hours (রাত ১২টা–সকাল ৭টা)। অটো-রিপ্লাই ডিফল্ট OFF।</p></div>
          <div className="pro-card"><h3>English + বাংলা</h3><p>পুরো বাংলা ল্যান্ডিং আর প্রাইসিং, সাথে বাইলিংগুয়াল ড্যাশবোর্ড। বাংলাদেশি ক্রিয়েটর আর গ্লোবাল অডিয়েন্স — দুজনের জন্যই।</p></div>
        </div></div></section>

      <section className="pro-section" id="platforms"><div className="wrap"><div className="pro-kicker">প্ল্যাটফর্ম</div><h2>সবচেয়ে দরকারি তিনটা দিয়ে শুরু।</h2><p className="lead">বাকিগুলো আসবে শুধু তখনই, যখন তাদের API নিরাপদ ও অফিসিয়ালভাবে ব্যবহার করা যাবে।</p>
        <div className="grid grid-3" style={{marginTop:24}}>{PLATFORMS.map((p) => (<div className="pro-card" key={p.id}><div style={{display:"flex",justifyContent:"space-between",gap:8}}><h3>{p.label}</h3><span className={`badge ${p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"live":""}`}>{p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"v1-এ লাইভ":"শীঘ্রই আসছে"}</span></div><p>{p.v1}</p></div>))}</div></div></section>

      <section className="pro-section"><div className="wrap"><div className="pro-kicker">কীভাবে কাজ করে</div><h2>নিরাপদ উপায়ে, তিন ধাপে।</h2>
        <div className="grid grid-3" style={{marginTop:24}}>
          <div className="pro-card"><span className="pro-num">০১</span><h3 style={{marginTop:10}}>শুধু নিজেরটা কানেক্ট করুন</h3><p>শুধু নিজের Page আর চ্যানেল, অফিসিয়াল Meta / Google লগইন দিয়ে। কোনো পাসওয়ার্ড সেভ করা হয় না।</p></div>
          <div className="pro-card"><span className="pro-num">০২</span><h3 style={{marginTop:10}}>সবকিছু এক ইনবক্সে</h3><p>মেনশন আর কমেন্ট প্ল্যাটফর্ম, স্ট্যাটাস আর কীওয়ার্ড দিয়ে ফিল্টার করে দেখুন। কোনো মেনশন আর হারাবে না।</p></div>
          <div className="pro-card"><span className="pro-num">০৩</span><h3 style={{marginTop:10}}>দ্রুত রিপ্লাই, নিরাপদে</h3><p>{"{name}"} টেমপ্লেট দিয়ে যারা ইতিমধ্যে এনগেজ করেছে তাদের রিপ্লাই দিন। ডেইলি লিমিট, ডিলে আর Quiet Hours স্প্যাম ফ্ল্যাগ ঠেকায়।</p></div>
        </div>
        <div className="pro-note" style={{marginTop:20}}><strong>মনে রাখবেন:</strong> এই টুল কখনো র‍্যান্ডম মানুষকে বাল্ক ট্যাগ করে না, অপরিচিতদের ডেটা স্ক্র্যাপ করে না। অটো-রিপ্লাই ডিফল্ট OFF, আর শুধু অপ্ট-ইন লিস্টের জন্য কাজ করে। এটাই পেজকে নিরাপদ রাখে।</div></div></section>

      <section className="pro-section" id="pricing"><div className="wrap"><div className="pro-kicker">প্রাইসিং</div><h2>সহজ, সৎ প্রাইসিং।</h2>
        <div className="grid grid-3" style={{marginTop:24}}>
          <div className="pro-card"><h3>Free</h3><div className="pro-price">৳০ / $০</div><p>১টা পেজ • মাসে ১০০টা মেনশন • ৩টা টেমপ্লেট • ম্যানুয়াল রিপ্লাই • ১৫ বার প্রোফাইল চেক</p></div>
          <div className="card popular"><h3>Pro — সবচেয়ে জনপ্রিয়</h3><div className="pro-price-dark">৳৪৯৯ / $৯ / মাস</div><p>৫টা পেজ • মাসে ২,০০০ মেনশন • অটো-রিপ্লাই রুলস • মাসে ১০০ বার প্রোফাইল চেক</p></div>
          <div className="pro-card"><h3>Business</h3><div className="pro-price">৳১,৪৯৯ / $২৯ / মাস</div><p>আনলিমিটেড পেজ • মাসে ১০,০০০ মেনশন • টিম সিট • প্রায়োরিটি সাপোর্ট • আনলিমিটেড প্রোফাইল চেক</p></div>
        </div>
        <p style={{color:"var(--muted)",marginTop:16}}>বাংলাদেশে bKash / Nagad ম্যানুয়াল পেমেন্ট (v1), ইন্টারন্যাশনালে Stripe। <Link href="/bn/pricing">পুরো প্রাইসিং ডিটেইলস, তুলনা টেবিল আর প্রতিটা সার্ভিসে কী কী আছে →</Link></p></div></section>

      <section className="pro-section" id="faq"><div className="wrap"><div className="pro-kicker">সাধারণ প্রশ্ন</div><h2>সাধারণ প্রশ্ন।</h2>
        <div className="grid grid-2" style={{marginTop:24}}>
          <div className="pro-card"><h3>এতে কি আমার Page ব্যান হবে?</h3><p>না — ঠিকভাবে ব্যবহার করলে: শুধু নিজের Page, শুধু যারা এনগেজ করেছে বা অপ্ট-ইন দিয়েছে, লিমিট আর ডিলেসহ। অপরিচিতদের বাল্ক ট্যাগ করাই ব্যানের কারণ, আর সেটা এখানে ডিজাইন দিয়েই ব্লক করা।</p></div>
          <div className="pro-card"><h3>লাইভ রিপ্লাইয়ের জন্য কী লাগবে?</h3><p>Meta App (Facebook + Instagram) আর Google OAuth (YouTube), সাথে App Review। সেটআপ গাইডে ধাপে ধাপে লেখা আছে।</p></div>
          <div className="pro-card"><h3>আমি কি নিজের চ্যানেলের জন্য ব্যবহার করতে পারবো?</h3><p>হ্যাঁ। Mazahar এটা americancarsaga-র জন্য বানিয়েছেন, আর একই অ্যাকাউন্ট দিয়ে নিজের Page চালাতে পারবেন — তারপর Pro অন্য ক্রিয়েটরদের কাছে বিক্রি করতে পারবেন।</p></div>
          <div className="pro-card"><h3>ডেমোতে রিলোড দিলে কী হবে?</h3><p>ডেমো ডেটা মুছে যাবে। আসল ডেটা বাঁচাতে Supabase কানেক্ট করতে হবে — README-তে লেখা আছে।</p></div>
        </div></div></section>
    </main>
    <footer className="pro-footer"><div className="wrap"><span>MentionHub — Next.js + Supabase + Vercel · ডেমো ডেটাসহ</span><span><Link href="/app">ড্যাশবোর্ড</Link> · <Link href="/connect">কানেক্ট</Link> · <Link href="/bn/pricing">প্রাইসিং</Link> · <Link href="/">English version</Link></span></div></footer>
  </>);
}
