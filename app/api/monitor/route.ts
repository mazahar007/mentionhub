import { NextResponse } from "next/server";
import { mem, renderTemplate } from "@/lib/store";

// Mention monitor + auto-reply engine.
// Monitors: Facebook mentions in the inbox + watch keywords.
// Auto-reply: ONLY when rule r1 is ON, ONLY to opt-in authors or keyword matches,
// max 10 per run, using the first template. Quiet-hours / daily-limit rules
// are honoured by the dashboard copy; live sending still needs Meta OAuth.
export async function GET() {
  const autoRule = mem.rules.find((r) => r.id === "r1");
  const fb = mem.mentions.filter((m) => m.platform === "facebook");
  return NextResponse.json({ auto_reply_enabled: !!autoRule?.enabled, facebook_mentions: fb, watch_keywords: mem.watchKeywords, log: mem.autoReplyLog, counts: { facebook_new: fb.filter((m) => m.status === "new").length, facebook_total: fb.length } });
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  if (b.action === "add-keyword") {
    if (!b.keyword) return NextResponse.json({ error: "keyword required" }, { status: 400 });
    const w = { id: "w" + Date.now(), keyword: String(b.keyword), platform: String(b.platform || "facebook") };
    mem.watchKeywords.push(w);
    return NextResponse.json({ keyword: w }, { status: 201 });
  }
  if (b.action === "remove-keyword") {
    mem.watchKeywords = mem.watchKeywords.filter((w) => w.id !== b.id);
    return NextResponse.json({ ok: true });
  }
  if (b.action === "run") {
    const autoRule = mem.rules.find((r) => r.id === "r1");
    if (!autoRule?.enabled) return NextResponse.json({ error: "Auto-reply is OFF. Turn on rule r1 in the Rules tab first." }, { status: 400 });
    const template = mem.templates[0];
    if (!template) return NextResponse.json({ error: "No template found" }, { status: 400 });
    const optInHandles = new Set(mem.contacts.filter((c) => c.consent).map((c) => c.handle.toLowerCase()));
    let replied = 0; let skipped = 0;
    for (const m of mem.mentions) {
      if (replied >= 10) break;
      if (m.platform !== "facebook" || m.status !== "new") { continue; }
      const keywordHit = mem.watchKeywords.some((w) => (w.platform === "facebook" || w.platform === "all") && m.text.toLowerCase().includes(w.keyword.toLowerCase()));
      const optInHit = optInHandles.has(m.author_handle.toLowerCase());
      if (!keywordHit && !optInHit) { skipped++; continue; }
      const reply = renderTemplate(template.body, m);
      m.reply_text = reply; m.status = "replied";
      mem.autoReplyLog.unshift({ id: "ar" + Date.now() + replied, mention_id: m.id, author: m.author, template: template.name, reply, at: new Date().toISOString() });
      replied++;
    }
    return NextResponse.json({ replied, skipped, live_sent: false, note: "Replies saved in dashboard (demo). Connect Facebook via Meta OAuth to send them live." });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
