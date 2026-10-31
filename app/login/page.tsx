"use client";
import { useState } from "react";
import Link from "next/link";
export default function Login() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (<main className="wrap"><section style={{maxWidth:480,margin:"40px auto"}}><h1>Log in</h1>
    <p className="lead" style={{fontSize:16}}>v1 demo login — no password is sent anywhere. Production login uses Supabase Auth (email + Google). See README.</p>
    {!done ? (<form onSubmit={(e)=>{e.preventDefault();localStorage.setItem("mh_user",email||"demo@mentionhub.app");setDone(true);}}><label>Email</label><input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com"/><button className="btn btn-primary" type="submit">Continue to dashboard</button></form>)
    : (<div className="card"><p>Logged in as <b>{email || "demo@mentionhub.app"}</b> (demo).</p><Link className="btn btn-dark" href="/app">Open dashboard →</Link></div>)}
  </section></main>);
}
