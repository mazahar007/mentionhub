"use client";
import { useState } from "react";
import Link from "next/link";

type Plan = { name: string; tagline: string; monthlyBDT: string; monthlyUSD: string; yearlyBDT: string; yearlyUSD: string; cta: string; popular?: boolean; features: string[] };
const plans: Plan[] = [
  { name: "Free", tagline: "একটা Page দিয়ে শুরু করুন, কার্ড লাগবে না।", monthlyBDT: "৳০", monthlyUSD: "$০", yearlyBDT: "৳০", yearlyUSD: "$০", cta: "ফ্রি শুরু করুন", features: ["১টা কানেক্টেড Page / চ্যানেল", "মাসে ১০০টা মেনশন ইনবক্সে", "Facebook, Instagram, YouTube ইনবক্স (ডেমো ডেটা)", "প্ল্যাটফর্ম, স্ট্যাটাস ও কীওয়ার্ড ফিল্টার + সার্চ", "{name} সহ ৩টা রিপ্লাই টেমপ্লেট", "৫০ জন পর্যন্ত অপ্ট-ইন লিস্ট", "ম্যানুয়াল রিপ্লাই (একটা একটা করে)", "বেসিক হিসাব: মোট / নতুন / রিপ্লাই দেওয়া", "কমিউনিটি সাপোর্ট (ইন-অ্যাপ হেল্প)", "সোশ্যাল প্রোফাইল চেকার: ফ্রিতে ১৫ বার (৭ প্ল্যাটফর্ম)"] },
  { name: "Pro", tagline: "সিরিয়াস ক্রিয়েটর আর ছোট পেজের জন্য।", monthlyBDT: "৳৪৯৯", monthlyUSD: "$৯", yearlyBDT: "৳৪,৯৯০", yearlyUSD: "$৯০", cta: "Pro নিন", popular: true, features: ["৫টা পর্যন্ত কানেক্টেড Page / চ্যানেল", "মাসে ২,০০০টা মেনশন", "Free-র সবকিছু, সাথে:", "Facebook Tag কম্পোজার — পোস্ট ও কমেন্টে ট্যাগ", "ট্যাগ সেফটি: প্রতি পোস্টে সর্বোচ্চ ৫টা ট্যাগ, দিনে ১০টা ট্যাগ পোস্ট", "মেনশন মনিটর + আনলিমিটেড Watch Keyword", "অটো-রিপ্লাই ইঞ্জিন (শুধু অপ্ট-ইন / কীওয়ার্ড)", "আনলিমিটেড রিপ্লাই টেমপ্লেট", "১,০০০ জন পর্যন্ত অপ্ট-ইন লিস্ট", "সেফটি রুলস: ডেইলি লিমিট, ৬০ সেকেন্ড ডিলে, Quiet Hours", "প্রায়োরিটি ইমেইল সাপোর্ট", "সোশ্যাল প্রোফাইল চেকার: মাসে ১০০ বার"] },
  { name: "Business", tagline: "এজেন্সি, ব্র্যান্ড আর টিমের জন্য।", monthlyBDT: "৳১,৪৯৯", monthlyUSD: "$২৯", yearlyBDT: "৳১৪,৯৯০", yearlyUSD: "$২৯০", cta: "Business নিন", features: ["আনলিমিটেড কানেক্টেড Page / চ্যানেল", "মাসে ১০,০০০টা মেনশন", "Pro-র সবকিছু, সাথে:", "৩টা টিম সিট (একই ইনবক্স, একই রুলস)", "আনলিমিটেড অপ্ট-ইন লিস্ট", "বেশি অটো-রিপ্লাই লিমিট (অনুরোধে)", "মাসিক পারফরম্যান্স সামারি", "৩০ মিনিটের অনবোর্ডিং কল (একবার)", "১ কর্মদিবসের মধ্যে প্রায়োরিটি সাপোর্ট", "সোশ্যাল প্রোফাইল চেকার: আনলিমিটেড"] },
];
const compare = [
  { feature: "কানেক্টেড Page / চ্যানেল", free: "১", pro: "৫", business: "আনলিমিটেড" },
  { feature: "মাসে মেনশন", free: "১০০", pro: "২,০০০", business: "১০,০০০" },
  { feature: "ইউনিফাইড ইনবক্স + ফিল্টার + সার্চ", free: "✓", pro: "✓", business: "✓" },
  { feature: "রিপ্লাই টেমপ্লেট", free: "৩", pro: "আনলিমিটেড", business: "আনলিমিটেড" },
  { feature: "অপ্ট-ইন কন্ট্যাক্ট", free: "৫০", pro: "১,০০০", business: "আনলিমিটেড" },
  { feature: "Facebook Tag কম্পোজার", free: "—", pro: "✓", business: "✓" },
  { feature: "মেনশন মনিটর + Watch Keyword", free: "—", pro: "✓", business: "✓" },
  { feature: "অটো-রিপ্লাই ইঞ্জিন", free: "—", pro: "✓", business: "✓" },
  { feature: "সেফটি রুলস (লিমিট / ডিলে / Quiet Hours)", free: "বেসিক", pro: "✓", business: "✓" },
  { feature: "টিম সিট", free: "—", pro: "—", business: "৩" },
  { feature: "সাপোর্ট", free: "কমিউনিটি", pro: "প্রায়োরিটি ইমেইল", business: "প্রায়োরিটি, ১ দিনের মধ্যে" },
];
const services = [
  { title: "১. ইউনিফাইড ইনবক্স", what: "Facebook, Instagram আর YouTube-এর মেনশন-কমেন্ট এক স্ক্রিনে, তিনটা অ্যাপ খুলতে হবে না।", includes: ["প্ল্যাটফর্ম ফিল্টার (Facebook / Instagram / YouTube)", "স্ট্যাটাস ফিল্টার (নতুন / রিপ্লাই দেওয়া / ইগনোর করা)", "অথর + টেক্সটে কীওয়ার্ড সার্চ", "প্রতিটা মেনশনে এক ট্যাপে Reply, Ignore, Reopen"], not: "Threads, TikTok, X এখনো Coming soon — এদের API নিরাপদ অফিসিয়াল ব্যবহারের সুযোগ সীমিত।" },
  { title: "২. Facebook Tag কম্পোজার", what: "পোস্ট বা কমেন্ট লিখে অপ্ট-ইন লিস্ট থেকে ট্যাগ করুন, কিউ করার আগে লাইভ প্রিভিউ দেখুন।", includes: ["পোস্ট + কমেন্ট কম্পোজার", "শুধু অপ্ট-ইন Facebook কন্ট্যাক্ট, চেকবক্স দিয়ে বাছাই", "@handle সহ লাইভ প্রিভিউ", "প্রতিটা ট্যাগ জবের স্ট্যাটাসসহ কিউ লিস্ট"], not: "বাল্ক ট্যাগ নয়, অপরিচিত কেউ নয়, স্ক্র্যাপ করা লিস্ট নয়। প্রতি পোস্টে সর্বোচ্চ ৫টা ট্যাগ, দিনে সর্বোচ্চ ১০টা ট্যাগ পোস্ট — অ্যাপেই এনফোর্স করা।" },
  { title: "৩. মেনশন মনিটর", what: "Facebook-এ আপনার ব্র্যান্ডের নাম আর কীওয়ার্ডের মেনশন নজরে রাখুন, যাতে কোনো মেনশন দিনের পর দিন অদেখা না থাকে।", includes: ["Facebook মেনশন নতুন থেকে পুরনো সাজিয়ে", "নিজের Watch Keyword যোগ করা (যেমন Page-এর নাম)", "কীওয়ার্ড মিললে ইঞ্জিন ধরে ফেলা", "কী চেক হলো তার মনিটর লগ"], not: "এটা পুরো ইন্টারনেটের সোশ্যাল লিসেনিং নয় — শুধু আপনার কানেক্টেড Page / চ্যানেলে আসা মেনশন মনিটর করে।" },
  { title: "৪. অটো-রিপ্লাই ইঞ্জিন", what: "নিজে থেকে রিপ্লাই দেবে, কিন্তু শুধু সঠিক মানুষকে, আর শুধু আপনি অন করলে।", includes: ["ডিফল্ট OFF — Rules-এ r1 অন করতে হবে", "শুধু অপ্ট-ইন অথর বা কীওয়ার্ড মিললে", "প্রথম টেমপ্লেট ব্যবহার হবে, {name} অটো বসবে", "এক রানে সর্বোচ্চ ১০টা রিপ্লাই, পুরো লগ থাকবে"], not: "অপরিচিতদের অটো-রিপ্লাই নয়, স্প্যাম বার্স্ট নয়, রাত ১২টা–সকাল ৭টা (Asia/Dhaka) Quiet Hours-এ রিপ্লাই নয়।" },
  { title: "৫. রিপ্লাই টেমপ্লেট", what: "বারবার ব্যবহার করা রিপ্লাইগুলো সেভ রাখুন, বাংলা আর ইংলিশে।", includes: ["টেমপ্লেট বানানো, এডিট, ডিলিট", "{name}, {handle}, {platform} ভেরিয়েবল", "যেকোনো মেনশন কার্ড থেকে এক ট্যাপে ব্যবহার", "বাংলা + ইংলিশ টেমপ্লেট দেওয়া আছে"], not: "টেমপ্লেট নিজে থেকে পাঠায় না — আপনি, অথবা ON থাকলে অটো-রিপ্লাই ইঞ্জিন, ব্যবহারের সময় ঠিক করে।" },
  { title: "৬. অপ্ট-ইন কন্ট্যাক্ট লিস্ট", what: "পুরো প্রোডাক্টের সেফটি ভিত্তি: শুধু এই লিস্টের মানুষকেই কখনো ট্যাগ বা অটো-রিপ্লাই করা যাবে।", includes: ["শুধু কনফার্ম করা অনুমতিসহ কন্ট্যাক্ট যোগ", "Facebook / Instagram / YouTube কন্ট্যাক্ট", "যেকোনো সময় রিমুভ করলে তার ট্যাগ/রিপ্লাই চিরতরে বন্ধ"], not: "কেনা, স্ক্র্যাপ করা বা অপরিচিতদের লিস্ট ইমপোর্ট করা সাপোর্ট করে না — ইচ্ছা করেই।" },
  { title: "৭. সেফটি ও কমপ্লায়েন্স রুলস", what: "যে রুলসগুলো আপনার Page-কে স্প্যাম ফ্ল্যাগ থেকে বাঁচায়।", includes: ["ডেইলি রিপ্লাই লিমিট (প্ল্যান অনুযায়ী)", "রিপ্লাইয়ের মাঝে ৬০ সেকেন্ড ডিলে", "Quiet Hours রাত ১২টা–সকাল ৭টা (Asia/Dhaka)", "অটো-রিপ্লাই ডিফল্ট OFF"], not: "এই রুলস Facebook / Instagram / YouTube-এর পলিসির বদলে নয় — লাইভ পোস্টের চূড়ান্ত অনুমতি Meta / Google App Review থেকে আসে।" },
  { title: "৮. অ্যাকাউন্ট ও কানেকশন", what: "শুধু নিজেরটা কানেক্ট করুন, অফিসিয়াল লগইন দিয়ে। MentionHub-এ কোনো পাসওয়ার্ড সেভ হয় না।", includes: ["Meta লগইন দিয়ে Facebook Page (Meta App + App Review লাগবে)", "একই Meta লগইন দিয়ে Instagram Business", "Google OAuth দিয়ে YouTube চ্যানেল (YouTube Data API v3)"], not: "কানেকশন + রিভিউ শেষ না হওয়া পর্যন্ত লাইভ পোস্ট চালু নয়। ততদিন ট্যাগ জব আর রিপ্লাই ড্যাশবোর্ডে ড্রাফট হিসেবে সেভ হবে।" },
];

export default function PricingBN() {
  const [yearly, setYearly] = useState(false);
  return (<>
    <header className="pro-header"><div className="wrap"><Link className="logo" href="/bn">Mention<span>Hub</span></Link><nav className="pro-nav" aria-label="প্রধান মেনু"><Link href="/bn">হোম</Link><Link href="/bn#capabilities">ক্যাপাবিলিটি</Link><Link href="/connect">কানেক্ট</Link><Link className="btn" href="/pricing">English</Link><Link className="btn btn-primary" href="/app">ড্যাশবোর্ড খুলুন</Link></nav><details className="menu-mobile"><summary aria-label="মেনু খুলুন">মেনু ☰</summary><div className="menu-panel"><Link href="/bn">হোম</Link><Link href="/bn#capabilities">ক্যাপাবিলিটি</Link><Link href="/bn#platforms">প্ল্যাটফর্ম</Link><Link href="/connect">অ্যাকাউন্ট কানেক্ট করুন</Link><Link href="/pricing">English</Link><Link href="/app">ড্যাশবোর্ড খুলুন →</Link></div></details></div></header>
    <main className="wrap">
      <section className="hero" style={{paddingBottom:16}}>
        <span className="pill">প্রাইসিং • কোনো লুকানো ফি নেই</span>
        <h1>আপনার Page-এর সাথে<br/>বাড়বে এমন প্রাইসিং।</h1>
        <p className="lead">ফ্রি দিয়ে শুরু করুন। মেনশন বাড়লেই আপগ্রেড করুন। যেকোনো সময় ক্যানসেল করা যাবে — Free-র জন্য কোনো কার্ড লাগবে না।</p>
        <div style={{display:"flex",gap:8,marginTop:22}}><button className={`btn ${!yearly?"btn-dark":""}`} onClick={()=>setYearly(false)}>মাসিক</button><button className={`btn ${yearly?"btn-dark":""}`} onClick={()=>setYearly(true)}>বাৎসরিক — ১০ মাসের টাকায় ১২ মাস</button></div>
        <p style={{color:"var(--muted)",fontSize:14,marginTop:10}}>{yearly ? "বাৎসরিক দাম বছরে একবার, মাসে নয়।" : "মাসিক দাম, মাসে মাসে বিল হবে। Yearly নিলে ২ মাস সাশ্রয় হবে।"}</p>
      </section>
      <section style={{paddingTop:16}}><div className="grid grid-3">{plans.map((p) => (<div className={`card ${p.popular?"popular":""}`} key={p.name} style={{display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:8}}><h3>{p.name}</h3>{p.popular && <span className="badge live">সবচেয়ে জনপ্রিয়</span>}</div><p>{p.tagline}</p>
        <p style={{marginTop:16}}><b style={{fontSize:34,color:p.popular?"#fff":"var(--ink)"}}>{yearly?p.yearlyBDT:p.monthlyBDT}</b> <span style={{color:p.popular?"rgba(255,255,255,.7)":"var(--muted)"}}>/ {yearly?"বছর":"মাস"}</span><br/><span style={{color:p.popular?"rgba(255,255,255,.7)":"var(--muted)"}}>অথবা {yearly?p.yearlyUSD:p.monthlyUSD} {yearly?"/ বছর":"/ মাস"} (ইন্টারন্যাশনাল)</span></p>
        <ul style={{paddingLeft:20,flex:1}}>{p.features.map((f)=>(<li key={f} style={{margin:"8px 0"}}>{f}</li>))}</ul>
        <Link className={`btn ${p.popular?"btn-primary":""}`} href="/app" style={{marginTop:16}}>{p.cta} →</Link></div>))}</div></section>
      <section><h2>প্ল্যান তুলনা, লাইন বাই লাইন</h2>
        <div style={{overflowX:"auto",marginTop:16}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:640,background:"var(--surface)",border:"1px solid var(--line)",borderRadius:16,overflow:"hidden"}}>
          <thead><tr><th style={{textAlign:"left",padding:14,borderBottom:"1px solid var(--line)"}}>ফিচার</th><th style={{padding:14,borderBottom:"1px solid var(--line)"}}>Free</th><th style={{padding:14,borderBottom:"1px solid var(--line)"}}>Pro</th><th style={{padding:14,borderBottom:"1px solid var(--line)"}}>Business</th></tr></thead>
          <tbody>{compare.map((r)=>(<tr key={r.feature}><td style={{padding:12,borderBottom:"1px solid var(--line)"}}>{r.feature}</td><td style={{padding:12,textAlign:"center",borderBottom:"1px solid var(--line)"}}>{r.free}</td><td style={{padding:12,textAlign:"center",borderBottom:"1px solid var(--line)"}}>{r.pro}</td><td style={{padding:12,textAlign:"center",borderBottom:"1px solid var(--line)"}}>{r.business}</td></tr>))}</tbody>
        </table></div></section>
      <section><h2>প্রতিটা সার্ভিসে আসলে কী আছে — স্পেসিফিকভাবে</h2><p className="lead">অস্পষ্ট “সব ফিচার” দাবি নয়। প্রতিটা সার্ভিসের ভেতরে আসলে কী আছে, আর ইচ্ছা করে কী বাদ দেওয়া হয়েছে — সেটাই এখানে লেখা।</p>
        <div className="grid grid-2" style={{marginTop:20}}>{services.map((s)=>(<div className="card" key={s.title}><h3>{s.title}</h3><p>{s.what}</p><p style={{marginTop:14}}><b style={{color:"var(--ink)"}}>যা আছে:</b></p><ul style={{paddingLeft:20}}>{s.includes.map((x)=>(<li key={x} style={{margin:"6px 0"}}>{x}</li>))}</ul><p><b style={{color:"var(--ink)"}}>যা নেই / লিমিট:</b> {s.not}</p></div>))}</div></section>
      <section><h2>পেমেন্ট ও প্রশ্ন</h2>
        <div className="grid grid-2" style={{marginTop:20}}>
          <div className="card"><h3>কীভাবে পে করবো?</h3><p>বাংলাদেশে bKash / Nagad (v1-এ ম্যানুয়াল পেমেন্ট + অ্যাডমিন অ্যাক্টিভেশন)। ইন্টারন্যাশনালে Stripe কার্ড। বাৎসরিক প্ল্যান বছরে একবার পেমেন্ট।</p></div>
          <div className="card"><h3>যেকোনো সময় ক্যানসেল করা যাবে?</h3><p>হ্যাঁ। ক্যানসেল করলে পেইড পিরিয়ড শেষ হওয়া পর্যন্ত প্ল্যান থাকবে। Free চিরদিন ফ্রি।</p></div>
          <div className="card"><h3>মেনশন লিমিট পার হলে কী হবে?</h3><p>নতুন মেনশন ইনবক্সে আসতেই থাকবে, কিন্তু অটো-রিপ্লাই আর ট্যাগ জব পরের মাস পর্যন্ত বা আপগ্রেড না করা পর্যন্ত থামবে। কিছু ডিলিট হবে না।</p></div>
          <div className="card"><h3>ডেমো কি সত্যিই ফ্রি?</h3><p>হ্যাঁ। লাইভ ডেমোতে কোনো কার্ড লাগে না। বিলিং চালু হলে প্ল্যান লিমিট এনফোর্স হবে — ততদিন ডেমো সবার জন্য খোলা।</p></div>
          <div className="card"><h3>এতে কি Page ব্যান হবে?</h3><p>ঠিকভাবে ব্যবহার করলে না: শুধু অপ্ট-ইন কন্ট্যাক্ট, লিমিট, ডিলে আর Quiet Hours। অপরিচিতদের বাল্ক ট্যাগ করাই ফ্ল্যাগের কারণ, আর সেটা ডিজাইন দিয়েই ব্লক করা।</p></div>
          <div className="card"><h3>লাইভ Facebook পোস্ট কবে চালু হবে?</h3><p>Meta App + Page পারমিশন + App Review শেষ হলে। ততদিন ট্যাগ জব আর রিপ্লাই ড্যাশবোর্ডে ড্রাফট হিসেবে সেভ হবে।</p></div>
        </div>
        <div style={{marginTop:20}}><Link className="btn btn-dark" href="/app">ডেমো ড্যাশবোর্ড দেখুন →</Link> <Link className="btn" href="/bn">← হোমে ফিরুন</Link></div></section>
    </main>
    <footer><div className="wrap">MentionHub প্রাইসিং • বাংলাদেশে BDT, ইন্টারন্যাশনালে USD • <Link href="/app">ড্যাশবোর্ড</Link> • <Link href="/pricing">English version</Link></div></footer>
  </>);
}
