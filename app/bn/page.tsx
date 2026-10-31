import Link from "next/link";
import { PLATFORMS } from "@/lib/store";

export default function HomeBN() {
  return (<>
    <a className="skip" href="#main">মূল কনটেন্টে যান</a>
    <header><div className="wrap"><Link className="logo" href="/bn">Mention<span>Hub</span></Link><nav style={{display:"flex",gap:10}}><Link className="btn" href="/">English</Link><Link className="btn" href="/login">লগইন</Link><Link className="btn btn-primary" href="/app">ড্যাশবোর্ড খুলুন</Link></nav></div></header>
    <main id="main" className="wrap">
      <section className="hero hero-stunning"><div className="hero-grid"><div>
        <span className="pill">সব প্ল্যাটফর্মের মেনশন ম্যানেজার • V3 ডিজাইন</span>
        <h1>প্রতিটা মেনশন।<br/><span className="grad-text">একটাই ইনবক্স।</span><br/>কোনো স্প্যাম নয়।</h1>
        <p className="lead">Facebook, Instagram আর YouTube-এর মেনশন এখন এক জায়গায়। টেমপ্লেট দিয়ে এক ট্যাপে রিপ্লাই দিন, কে মেনশন করলো দেখুন, আর অপরিচিত কাউকে ট্যাগ না করেই রিচ বাড়ান।</p>
        <div className="hero-ctas"><Link className="btn btn-dark" href="/app">ডেমো ড্যাশবোর্ড দেখুন →</Link><Link className="btn" href="/bn/pricing">প্রাইসিং দেখুন →</Link></div>
        <p className="hero-note">ডেমোর জন্য কোনো লগইন বা API কী লাগে না। আসল অ্যাকাউন্ট পরে শুধু অফিসিয়াল Meta / Google লগইন দিয়ে কানেক্ট হবে।</p>
      </div>
      <div className="mock mock-stunning" aria-label="ইনবক্স প্রিভিউ">
        <div className="mock-head"><span>ইউনিফাইড ইনবক্স — প্রিভিউ</span><span className="badge live">● লাইভ ডেমো</span></div>
        <div className="mock-row"><span className="dot" style={{background:"#1877f2"}}/><div><b>Rahim Uddin</b> <span style={{color:"var(--muted)"}}>· Facebook</span><br/><span style={{color:"var(--muted)"}}>“@americancarsaga এই Corvette ZL-1 ভিডিওটা অসাধারণ!”</span></div></div>
        <div className="mock-row"><span className="dot" style={{background:"#e1306c"}}/><div><b>Sara Ahmed</b> <span style={{color:"var(--muted)"}}>· Instagram</span><br/><span style={{color:"var(--muted)"}}>স্টোরিতে মেনশন করেছেন — Camaro থাম্বনেইলটা 🔥</span></div></div>
        <div className="mock-row"><span className="dot" style={{background:"#ff0000"}}/><div><b>Classic Car Garage</b> <span style={{color:"var(--muted)"}}>· YouTube</span><br/><span style={{color:"var(--muted)"}}>“69 built ফিগারের রিসার্চটা দারুণ — সাবস্ক্রাইব করলাম!”</span></div></div>
      </div></div>
      <div className="stat-strip" aria-label="এক নজরে">
        <div className="stat"><b>৩</b><span>লাইভ প্ল্যাটফর্ম<br/>Facebook • Instagram • YouTube</span></div>
        <div className="stat"><b>৮</b><span>সার্ভিস<br/>ইনবক্স থেকে অটো-রিপ্লাই</span></div>
        <div className="stat"><b>২</b><span>ভাষা<br/>English • বাংলা</span></div>
        <div className="stat"><b>৳০</b><span>শুরু করতে<br/>Free প্ল্যান, কার্ড লাগে না</span></div>
      </div></section>

      <section><div className="eyebrow">কেন ক্রিয়েটররা বেছে নেবে</div><h2>শুধু রিপোর্ট নয়, রিপ্লাইয়ের জন্য বানানো।</h2><p className="lead">বড় লিসেনিং টুলগুলো শুধু মেনশন দেখায়। MentionHub সেখানে উত্তর দিতে সাহায্য করে — নিরাপদে, এক জায়গায়।</p>
        <div className="grid grid-3" style={{marginTop:20}}>
          <div className="card lift feature"><h3>এক ট্যাপে রিপ্লাই</h3><p>টেমপ্লেটে {"{name}"} নিজে থেকে বসে যায়। তিনটা অ্যাপে কপি-পেস্ট লাগে না।</p></div>
          <div className="card lift feature"><h3>ঝুঁকি ছাড়া ট্যাগ</h3><p>শুধু অপ্ট-ইন ফ্যান, প্রতি পোস্টে সর্বোচ্চ ৫টা ট্যাগ। Page স্প্যাম ফ্ল্যাগ থেকে নিরাপদ থাকে।</p></div>
          <div className="card lift feature"><h3>কোনো মেনশন মিস নয়</h3><p>Watch Keyword আপনার ব্র্যান্ডের নাম Facebook-এ আসলেই ধরে ফেলে।</p></div>
        </div></section>

      <section><h2>প্ল্যাটফর্ম</h2><p className="lead">ক্রিয়েটরদের জন্য সবচেয়ে দরকারি তিনটা দিয়ে শুরু। বাকিগুলো আসবে শুধু তখনই, যখন তাদের API নিরাপদ ও অফিসিয়ালভাবে ব্যবহার করা যাবে।</p>
        <div className="grid grid-3" style={{marginTop:20}}>{PLATFORMS.map((p) => (<div className="card" key={p.id}><div style={{display:"flex",justifyContent:"space-between",gap:8}}><h3>{p.label}</h3><span className={`badge ${p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"live":""}`}>{p.id==="facebook"||p.id==="instagram"||p.id==="youtube"?"v1-এ লাইভ":"শীঘ্রই আসছে"}</span></div><p>{p.v1}</p></div>))}</div>
      </section>

      <section><h2>কীভাবে কাজ করে — নিরাপদ উপায়ে</h2>
        <div className="grid grid-3" style={{marginTop:20}}>
          <div className="card"><span className="pill">১</span><h3 style={{marginTop:12}}>শুধু নিজেরটা কানেক্ট করুন</h3><p>শুধু নিজের Page আর চ্যানেল, অফিসিয়াল লগইন দিয়ে। কোনো পাসওয়ার্ড সেভ করা হয় না।</p></div>
          <div className="card"><span className="pill">২</span><h3 style={{marginTop:12}}>সবকিছু এক ইনবক্সে</h3><p>মেনশন আর কমেন্ট প্ল্যাটফর্ম, স্ট্যাটাস আর কীওয়ার্ড দিয়ে ফিল্টার করে দেখুন। কোনো মেনশন আর হারাবে না।</p></div>
          <div className="card"><span className="pill">৩</span><h3 style={{marginTop:12}}>দ্রুত রিপ্লাই, নিরাপদে</h3><p>{"{name}"} টেমপ্লেট দিয়ে যারা ইতিমধ্যে এনগেজ করেছে তাদের রিপ্লাই দিন। ডেইলি লিমিট, ডিলে আর Quiet Hours স্প্যাম ফ্ল্যাগ ঠেকায়।</p></div>
        </div>
        <div className="card" style={{marginTop:16,background:"var(--orange-soft)"}}><strong>মনে রাখবেন:</strong> এই টুল কখনো র‍্যান্ডম মানুষকে বাল্ক ট্যাগ করে না, অপরিচিতদের ডেটা স্ক্র্যাপ করে না। অটো-রিপ্লাই ডিফল্ট OFF, আর শুধু অপ্ট-ইন লিস্টের জন্য কাজ করে। এটাই পেজকে নিরাপদ রাখে।</div>
      </section>

      <section id="pricing"><h2>সহজ প্রাইসিং</h2>
        <div className="grid grid-3" style={{marginTop:20}}>
          <div className="card"><h3>Free</h3><p><b style={{color:"var(--ink)",fontSize:22}}>৳০ / $০</b><br/>১টা পেজ • মাসে ১০০টা মেনশন • ৩টা টেমপ্লেট • ম্যানুয়াল রিপ্লাই</p></div>
          <div className="card popular"><h3>Pro ⭐ সবচেয়ে জনপ্রিয়</h3><p><b style={{color:"#fff",fontSize:22}}>৳৪৯৯ / $৯ / মাস</b><br/>৫টা পেজ • মাসে ২,০০০ মেনশন • অটো-রিপ্লাই রুলস • অ্যানালিটিকস</p></div>
          <div className="card"><h3>Business</h3><p><b style={{color:"var(--ink)",fontSize:22}}>৳১,৪৯৯ / $২৯ / মাস</b><br/>আনলিমিটেড পেজ • মাসে ১০,০০০ মেনশন • টিম সিট • প্রায়োরিটি সাপোর্ট</p></div>
        </div>
        <p style={{color:"var(--muted)"}}>বাংলাদেশে bKash / Nagad ম্যানুয়াল পেমেন্ট (v1), ইন্টারন্যাশনালে Stripe। অটো-বিলিং পরের ধাপ। <Link href="/bn/pricing">পুরো প্রাইসিং ডিটেইলস, তুলনা টেবিল আর প্রতিটা সার্ভিসে কী কী আছে →</Link></p>
      </section>

      <section><h2>সাধারণ প্রশ্ন</h2>
        <div className="grid grid-2" style={{marginTop:20}}>
          <div className="card"><h3>এতে কি আমার Page ব্যান হবে?</h3><p>না — ঠিকভাবে ব্যবহার করলে: শুধু নিজের Page, শুধু যারা এনগেজ করেছে বা অপ্ট-ইন দিয়েছে, লিমিট আর ডিলেসহ। অপরিচিতদের বাল্ক ট্যাগ করাই ব্যানের কারণ, আর সেটা এখানে ডিজাইন দিয়েই ব্লক করা।</p></div>
          <div className="card"><h3>লাইভ রিপ্লাইয়ের জন্য কী লাগবে?</h3><p>Meta App (Facebook + Instagram) আর Google OAuth (YouTube), সাথে App Review। সেটআপ গাইডে ধাপে ধাপে লেখা আছে।</p></div>
          <div className="card"><h3>আমি কি নিজের চ্যানেলের জন্য ব্যবহার করতে পারবো?</h3><p>হ্যাঁ। Mazahar এটা americancarsaga-র জন্য বানিয়েছেন, আর একই অ্যাকাউন্ট দিয়ে নিজের Page চালাতে পারবেন — তারপর Pro অন্য ক্রিয়েটরদের কাছে বিক্রি করতে পারবেন।</p></div>
          <div className="card"><h3>ডেমোতে রিলোড দিলে কী হবে?</h3><p>ডেমো ডেটা মুছে যাবে। আসল ডেটা বাঁচাতে Supabase কানেক্ট করতে হবে — README-তে লেখা আছে।</p></div>
        </div>
      </section>
    </main>
    <footer><div className="wrap">MentionHub v2 • Next.js + Supabase + Vercel • ডেমো ডেটাসহ • <Link href="/app">ড্যাশবোর্ড</Link> • <Link href="/bn/pricing">প্রাইসিং</Link> • <Link href="/">English version</Link></div></footer>
  </>);
}
