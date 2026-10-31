"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Mention = { id: string; platform: string; author: string; author_handle: string; text: string; status: string; reply_text?: string | null };
type Template = { id: string; name: string; body: string; platform: string };
type Contact = { id: string; name: string; handle: string; platform: string; consent: boolean };
type Account = { id: string; platform: string; label: string; status: string; note: string };
type Rule = { id: string; name: string; enabled: boolean; detail: string };
type TagJob = { id: string; kind: string; text: string; tagged: string[]; status: string; created_at: string };
type WatchKeyword = { id: string; keyword: string; platform: string };
type AutoLog = { id: string; author: string; template: string; reply: string; at: string };
type ProfileCheck = { id: string; platform: string; handle: string; display_name: string | null; followers: number | null; total_posts: number | null; post_types: Record<string, number>; recent: { title: string; date: string | null; type: string }[]; summary: string; source: string; counted: boolean; at: string };

export default function Dashboard() {
  const [tab, setTab] = useState("inbox");
  const [lang, setLang] = useState<"en" | "bn">("en");
  const L = lang === "bn"
    ? { title: "মেনশন ইনবক্স", lead: "ডেমো ডেটাসহ। v1-এ রিপ্লাই এখানেই সেভ হবে — লাইভে পাঠাতে আসল অ্যাকাউন্ট কানেক্ট করতে হবে (Accounts ট্যাব)।", shown: "দেখানো মেনশন", waiting: "রিপ্লাইয়ের অপেক্ষায়", replied: "রিপ্লাই দেওয়া", tabs: { inbox: "ইনবক্স", "fb-tag": "Facebook Tag", monitor: "মনিটর", profile: "প্রোফাইল চেক", templates: "টেমপ্লেট", optin: "অপ্ট-ইন লিস্ট", accounts: "অ্যাকাউন্ট", rules: "রুলস" } as Record<string, string> }
    : { title: "Mention inbox", lead: "Demo data included. Replies are saved here in v1 — connect a real account to send them live (Accounts tab).", shown: "Shown mentions", waiting: "Waiting for reply", replied: "Replied", tabs: { inbox: "Inbox", "fb-tag": "Facebook Tag", monitor: "Monitor", profile: "Profile Check", templates: "Templates", optin: "Opt-in list", accounts: "Accounts", rules: "Rules" } as Record<string, string> };
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [platform, setPlatform] = useState("all");
  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");
  const [replyId, setReplyId] = useState("");
  const [replyText, setReplyText] = useState("");
  const [msg, setMsg] = useState("");
  const [tName, setTName] = useState(""); const [tBody, setTBody] = useState("");
  const [cName, setCName] = useState(""); const [cHandle, setCHandle] = useState(""); const [cPlatform, setCPlatform] = useState("facebook");
  const [tagJobs, setTagJobs] = useState<TagJob[]>([]);
  const [fbOptIn, setFbOptIn] = useState<Contact[]>([]);
  const [tagKind, setTagKind] = useState("post"); const [tagText, setTagText] = useState(""); const [tagIds, setTagIds] = useState<string[]>([]);
  const [mon, setMon] = useState<{ auto_reply_enabled: boolean; facebook_mentions: Mention[]; watch_keywords: WatchKeyword[]; log: AutoLog[] } | null>(null);
  const [newKeyword, setNewKeyword] = useState("");
  const [pcPlatform, setPcPlatform] = useState("youtube"); const [pcHandle, setPcHandle] = useState(""); const [pcConsent, setPcConsent] = useState(false);
  const [pcResult, setPcResult] = useState<{ check: ProfileCheck | null; counted?: boolean; remaining?: number; restricted?: boolean; reason?: string; live_path?: string; profile_url?: string; error?: string } | null>(null);
  const [pcMeta, setPcMeta] = useState<{ free_limit: number; used: number; remaining: number; history: ProfileCheck[] } | null>(null);

  async function load() {
    const m = await fetch(`/api/mentions?platform=${platform}&status=${status}&q=${encodeURIComponent(q)}`).then((r) => r.json());
    setMentions(m.mentions || []);
    setTemplates((await fetch("/api/templates").then((r) => r.json())).templates || []);
    setContacts((await fetch("/api/contacts").then((r) => r.json())).contacts || []);
    setAccounts((await fetch("/api/accounts").then((r) => r.json())).accounts || []);
    setRules((await fetch("/api/rules").then((r) => r.json())).rules || []);
    const tq = await fetch("/api/tag-queue").then((r) => r.json()); setTagJobs(tq.jobs || []); setFbOptIn(tq.fb_opt_in || []);
    setMon(await fetch("/api/monitor").then((r) => r.json()));
    setPcMeta(await fetch("/api/profile-check").then((r) => r.json()));
  }
  useEffect(() => { load(); }, [platform, status]); // eslint-disable-line react-hooks/exhaustive-deps

  async function act(id: string, action: string, extra: Record<string, string> = {}) {
    const r = await fetch("/api/mentions", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, action, ...extra }) }).then((x) => x.json());
    setMsg(r.note || (r.mention ? `Updated: ${r.mention.status}` : "Done"));
    setReplyId(""); setReplyText(""); load();
  }

  const counts = { total: mentions.length, replied: mentions.filter((m) => m.status === "replied").length, fresh: mentions.filter((m) => m.status === "new").length };

  return (<>
    <header><div className="wrap"><Link className="logo" href="/">Mention<span>Hub</span></Link><div style={{display:"flex",gap:8}}><button className="btn" onClick={()=>setLang(lang==="en"?"bn":"en")}>{lang==="en"?"বাংলা":"English"}</button><Link className="btn" href="/">← Landing</Link></div></div></header>
    <main className="wrap">
      <section style={{paddingTop:32}}>
        <h1 style={{fontSize:38}}>{L.title}</h1>
        <p className="lead" style={{fontSize:16}}>{L.lead}</p>
        <div className="grid grid-3">
          <div className="card"><b style={{fontSize:28}}>{counts.total}</b><p>{L.shown}</p></div>
          <div className="card"><b style={{fontSize:28}}>{counts.fresh}</b><p>{L.waiting}</p></div>
          <div className="card"><b style={{fontSize:28}}>{counts.replied}</b><p>{L.replied}</p></div>
        </div>
        {msg && <div className="card" style={{marginTop:16,background:"#e6f4f2"}}>{msg}</div>}
        <div className="tabs">{["inbox","fb-tag","monitor","profile","templates","optin","accounts","rules"].map((t) => (<button key={t} className={tab===t?"active":""} onClick={()=>setTab(t)}>{L.tabs[t] || t}</button>))}</div>

        {tab==="inbox" && (<>
          <div className="grid grid-3">
            <div><label>Platform</label><select value={platform} onChange={(e)=>setPlatform(e.target.value)}><option value="all">All</option><option value="facebook">Facebook</option><option value="instagram">Instagram</option><option value="youtube">YouTube</option></select></div>
            <div><label>Status</label><select value={status} onChange={(e)=>setStatus(e.target.value)}><option value="all">All</option><option value="new">New</option><option value="replied">Replied</option><option value="ignored">Ignored</option></select></div>
            <div><label>Search</label><input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search author or text…"/><button className="btn" onClick={load}>Search</button></div>
          </div>
          <div className="grid" style={{marginTop:16}}>{mentions.map((m) => (<div className="card" key={m.id}>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}><b>{m.author} <span style={{color:"#5c6672",fontWeight:400}}>{m.author_handle}</span></b><span><span className="badge">{m.platform}</span> <span className="badge">{m.status}</span></span></div>
            <p>{m.text}</p>
            {m.reply_text && <p style={{background:"#f7f7f2",padding:10,borderRadius:10}}>↩ Reply: {m.reply_text}</p>}
            {replyId===m.id ? (<><label>Reply (use {"{name}"} for the author)</label><textarea value={replyText} onChange={(e)=>setReplyText(e.target.value)} placeholder="Thank you, {name}! …" rows={3}/><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button className="btn btn-primary" onClick={()=>act(m.id,"reply",{reply_text:replyText})}>Send reply (demo save)</button>{templates.map((t)=>(<button key={t.id} className="btn" onClick={()=>act(m.id,"reply",{template_id:t.id})}>Use: {t.name}</button>))}<button className="btn" onClick={()=>setReplyId("")}>Cancel</button></div></>)
            : (<div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button className="btn btn-primary" onClick={()=>{setReplyId(m.id);setReplyText("");}}>Reply</button><button className="btn" onClick={()=>act(m.id,"ignore")}>Ignore</button>{m.status!=="new" && <button className="btn" onClick={()=>act(m.id,"reopen")}>Reopen</button>}</div>)}
          </div>))}
          {mentions.length===0 && <p>No mentions match this filter.</p>}</div>
        </>)}

        {tab==="fb-tag" && (<div className="grid grid-2"><div className="card"><h3>Facebook post / comment + auto tag</h3><p>Only opt-in Facebook contacts can be tagged. Max 5 tags per post, max 10 tag posts per day. Jobs are queued drafts — live posting needs Meta OAuth + App Review.</p>
          <label>Type</label><select value={tagKind} onChange={(e)=>setTagKind(e.target.value)}><option value="post">Post</option><option value="comment">Comment</option></select>
          <label>Post / comment text</label><textarea value={tagText} onChange={(e)=>setTagText(e.target.value)} rows={4} placeholder="New video is out! Thanks for watching…"/>
          <label>Tag (opt-in Facebook only, max 5)</label>
          {fbOptIn.length===0 && <p>No opt-in Facebook contacts yet — add one in the Opt-in list tab first.</p>}
          {fbOptIn.map((c)=>(<label key={c.id} style={{display:"flex",gap:8,alignItems:"center",fontWeight:400}}><input type="checkbox" style={{width:20,minHeight:20,margin:0}} checked={tagIds.includes(c.id)} onChange={(e)=>setTagIds(e.target.checked?[...tagIds,c.id]:tagIds.filter((x)=>x!==c.id))}/> {c.name} {c.handle}</label>))}
          <p style={{color:"var(--muted)"}}>Preview: {tagText} {tagIds.map((id)=>fbOptIn.find((c)=>c.id===id)?.handle).filter(Boolean).join(" ")}</p>
          <button className="btn btn-primary" onClick={async()=>{const r=await fetch("/api/tag-queue",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({kind:tagKind,text:tagText,contact_ids:tagIds})}).then((x)=>x.json()); setMsg(r.error||`Queued: ${r.preview||""} (not posted live yet)`); if(!r.error){setTagText("");setTagIds([]);} load();}}>Queue tag post (demo)</button></div>
          <div><h3 style={{margin:"0 0 12px"}}>Tag queue</h3>{tagJobs.map((j)=>(<div className="card" key={j.id} style={{marginBottom:12}}><b>{j.kind}</b> <span className="badge">{j.status}</span><p>{j.text}</p><p style={{fontSize:13}}>Tagged: {j.tagged.join(", ")||"—"}</p></div>))}{tagJobs.length===0 && <p>No tag jobs yet.</p>}</div></div>)}

        {tab==="monitor" && (<div className="grid grid-2"><div className="card"><h3>Mention monitor + auto-reply</h3><p>Auto-reply is {mon?.auto_reply_enabled?"ON":"OFF"} (Rules tab, rule r1). When ON, “Run auto-reply” replies only to Facebook mentions from opt-in authors or matching a watch keyword, max 10 per run, with the first template.</p>
          <button className="btn btn-primary" onClick={async()=>{const r=await fetch("/api/monitor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"run"})}).then((x)=>x.json()); setMsg(r.error||`Auto-reply done: ${r.replied} replied, ${r.skipped} skipped (saved in dashboard, not sent live yet)`); load();}}>Run auto-reply check</button>
          <div style={{marginTop:16}}><label>Watch keyword (Facebook)</label><input value={newKeyword} onChange={(e)=>setNewKeyword(e.target.value)} placeholder="e.g. americancarsaga"/><button className="btn" onClick={async()=>{await fetch("/api/monitor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"add-keyword",keyword:newKeyword,platform:"facebook"})}); setNewKeyword(""); load();}}>Add keyword</button></div>
          <div style={{marginTop:12}}>{(mon?.watch_keywords||[]).map((w)=>(<div key={w.id} style={{display:"flex",justifyContent:"space-between",gap:8,padding:"8px 0",borderBottom:"1px solid var(--line)"}}><span>{w.keyword} <span className="badge">{w.platform}</span></span><button className="btn" onClick={async()=>{await fetch("/api/monitor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"remove-keyword",id:w.id})}); load();}}>Remove</button></div>))}</div></div>
          <div><h3 style={{margin:"0 0 12px"}}>Facebook mentions being monitored</h3>{(mon?.facebook_mentions||[]).map((m)=>(<div className="card" key={m.id} style={{marginBottom:12}}><b>{m.author}</b> <span className="badge">{m.status}</span><p>{m.text}</p>{m.reply_text && <p>↩ {m.reply_text}</p>}</div>))}
          <h3 style={{margin:"16px 0 12px"}}>Auto-reply log</h3>{(mon?.log||[]).map((l)=>(<div className="card" key={l.id} style={{marginBottom:12}}><b>{l.author}</b> <span className="badge">{l.template}</span><p>{l.reply}</p></div>))}{(mon?.log||[]).length===0 && <p>No auto-replies yet.</p>}</div></div>)}

        {tab==="profile" && (<div className="grid grid-2"><div className="card"><h3>Social Profile Checker — free 15 checks</h3><p>One check = one platform lookup that returns data. 15 different profiles, or one person&apos;s 15 accounts, or any mix — the counter counts checks, not people. Demo examples and restricted lookups (no data) do NOT use quota. This limit is configurable and can change later.</p><p><b>Free used: {pcMeta?.used ?? 0} / {pcMeta?.free_limit ?? 15} — remaining: {pcMeta?.remaining ?? 15}</b></p><label>Platform</label><select value={pcPlatform} onChange={(e)=>setPcPlatform(e.target.value)}>{["facebook","linkedin","youtube","x","instagram","pinterest","reddit"].map((p)=>(<option key={p} value={p}>{p}</option>))}</select><label>Handle or profile URL</label><input value={pcHandle} onChange={(e)=>setPcHandle(e.target.value)} placeholder="@americancarsaga or full URL"/><label><input type="checkbox" checked={pcConsent} onChange={(e)=>setPcConsent(e.target.checked)}/> I confirm this is a public profile, checked for a legitimate purpose (own audit / public creator / public-data research only). No private data will be fetched.</label><div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:8}}><button className="btn btn-primary" onClick={async()=>{const r=await fetch("/api/profile-check",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({platform:pcPlatform,handle:pcHandle,consent:pcConsent})});setPcResult(await r.json());const m=await fetch("/api/profile-check").then((x)=>x.json());setPcMeta(m);}}>Check profile</button><button className="btn" onClick={async()=>{const r=await fetch("/api/profile-check",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({platform:pcPlatform,handle:"demo",consent:true,demo:true})});setPcResult(await r.json());}}>Try demo example (no quota)</button></div>{pcResult?.error && <p>{pcResult.error}</p>}{pcResult?.restricted && <p><b>No data for this platform yet.</b> {pcResult.reason} <br/>Live path: {pcResult.live_path} <br/>You can still open the profile yourself: <a href={pcResult.profile_url} target="_blank" rel="noreferrer">{pcResult.profile_url}</a> — this lookup did NOT use your free quota.</p>}</div><div className="card"><h3>Result</h3>{pcResult?.check ? (<><b>{pcResult.check.display_name || pcResult.check.handle}</b> <span className="badge">{pcResult.check.platform} • {pcResult.check.source}{pcResult.check.counted?" • counted":" • not counted"}</span><p>{pcResult.check.summary}</p><p>Followers/subscribers: {pcResult.check.followers ?? "—"} • Total public posts: {pcResult.check.total_posts ?? "—"}</p><p>Post types: {Object.entries(pcResult.check.post_types).map(([k,v])=>`${k}: ${v}`).join(", ") || "—"}</p><ul>{pcResult.check.recent.map((r,i)=>(<li key={i}>{r.date} — {r.type} — {r.title}</li>))}</ul></>) : <p>Run a check, or try the demo example. A real report shows: name, follower/subscriber count (where public), total public posts, breakdown by post type, and recent public posts with dates — so you see how many posts, what kind, and how often.</p>}<h3>Recent counted checks</h3><ul>{(pcMeta?.history || []).map((c)=>(<li key={c.id}>{c.platform} — {c.handle} — {c.source} — {c.at.slice(0,10)}</li>))}</ul></div></div>)}
        {tab==="templates" && (<div className="grid grid-2"><div className="card"><h3>New template</h3><label>Name</label><input value={tName} onChange={(e)=>setTName(e.target.value)} placeholder="e.g. Thank you"/><label>Body — {"{name}"}, {"{handle}"}, {"{platform}"} work</label><textarea value={tBody} onChange={(e)=>setTBody(e.target.value)} rows={4} placeholder="Thank you so much, {name}!"/><button className="btn btn-primary" onClick={async()=>{await fetch("/api/templates",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:tName,body:tBody})});setTName("");setTBody("");load();}}>Save template</button></div>
          <div>{templates.map((t)=>(<div className="card" key={t.id} style={{marginBottom:12}}><b>{t.name}</b><p>{t.body}</p><button className="btn" onClick={async()=>{await fetch(`/api/templates?id=${t.id}`,{method:"DELETE"});load();}}>Delete</button></div>))}</div></div>)}

        {tab==="optin" && (<div className="grid grid-2"><div className="card"><h3>Add with consent only</h3><p>Only add people who agreed to be mentioned. This list is the safety rule of the whole product.</p><label>Name</label><input value={cName} onChange={(e)=>setCName(e.target.value)}/><label>Handle</label><input value={cHandle} onChange={(e)=>setCHandle(e.target.value)} placeholder="@name"/><label>Platform</label><select value={cPlatform} onChange={(e)=>setCPlatform(e.target.value)}><option value="facebook">Facebook</option><option value="instagram">Instagram</option><option value="youtube">YouTube</option></select><button className="btn btn-primary" onClick={async()=>{await fetch("/api/contacts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:cName,handle:cHandle,platform:cPlatform,consent:true})});setCName("");setCHandle("");load();}}>Add (consent confirmed)</button></div>
          <div>{contacts.map((c)=>(<div className="card" key={c.id} style={{marginBottom:12}}><b>{c.name}</b> {c.handle} <span className="badge">{c.platform}</span><p>Consent: {c.consent?"Yes":"No"}</p><button className="btn" onClick={async()=>{await fetch(`/api/contacts?id=${c.id}`,{method:"DELETE"});load();}}>Remove</button></div>))}</div></div>)}

        {tab==="accounts" && (<div className="grid grid-2">{accounts.map((a)=>(<div className="card" key={a.id}><b>{a.label}</b> <span className="badge">{a.platform} • {a.status}</span><p>{a.note}</p>{a.status==="connected" ? <span className="badge">Connected ✓</span> : a.status==="not_connected" ? <a className="btn btn-primary" href={a.platform==="youtube" ? "/api/auth/google" : "/api/auth/facebook"}>Connect with {a.platform==="youtube" ? "Google" : "Meta login"}</a> : <span className="badge">Coming soon</span>}</div>))}<div className="card"><b>Setup guide</b><p>Not configured yet? The Connect buttons will bounce to the setup page until the Meta/Google app IDs are set in Vercel env vars. Full steps (in plain language) are on the Connect page.</p><a className="btn" href="/connect">Open Connect guide</a></div></div>)}

        {tab==="rules" && (<><div className="grid grid-2">{rules.map((r)=>(<div className="card" key={r.id}><b>{r.name}</b><p>{r.detail}</p><button className="btn" onClick={async()=>{await fetch("/api/rules",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:r.id,enabled:!r.enabled})});load();}}>{r.enabled?"Turn off":"Turn on"}</button></div>))}</div>
          <div className="card" style={{marginTop:16}}><h3>Billing (v1)</h3><p>Free plan is active in demo. For real customers: Stripe Checkout for international cards, and bKash/Nagad manual payment + admin approval for Bangladesh — webhook automation is v1.1 (see README).</p></div></>)}
      </section>
    </main>
  </>);
}
