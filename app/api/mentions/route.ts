import { NextResponse } from "next/server";
import { mem, renderTemplate, type MentionStatus } from "@/lib/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const platform = searchParams.get("platform");
  const status = searchParams.get("status");
  const q = (searchParams.get("q") || "").toLowerCase();
  let list = [...mem.mentions];
  if (platform && platform !== "all") list = list.filter((m) => m.platform === platform);
  if (status && status !== "all") list = list.filter((m) => m.status === status);
  if (q) list = list.filter((m) => (m.author + " " + m.text).toLowerCase().includes(q));
  return NextResponse.json({ mentions: list });
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => ({}));
  const m = mem.mentions.find((x) => x.id === body.id);
  if (!m) return NextResponse.json({ error: "Mention not found" }, { status: 404 });
  if (body.action === "reply") {
    const template = mem.templates.find((t) => t.id === body.template_id);
    const raw = body.reply_text || template?.body || "Thank you, {name}!";
    m.reply_text = renderTemplate(raw, m);
    m.status = "replied";
  } else if (body.action === "ignore") {
    m.status = "ignored";
  } else if (body.action === "reopen") {
    m.status = "new";
  } else if (body.status) {
    m.status = body.status as MentionStatus;
  }
  // NOTE v1: this marks the reply in the dashboard. Sending it live to
  // Facebook/Instagram/YouTube happens only after that account is connected
  // (see lib/store.ts + README). Never auto-send to strangers.
  return NextResponse.json({ mention: m, live_sent: false, note: "Saved in dashboard. Connect an account to send live." });
}
