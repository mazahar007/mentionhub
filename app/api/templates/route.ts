import { NextResponse } from "next/server";
import { mem } from "@/lib/store";
export async function GET() { return NextResponse.json({ templates: mem.templates }); }
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  if (!b.name || !b.body) return NextResponse.json({ error: "name and body required" }, { status: 400 });
  const t = { id: "t" + Date.now(), name: String(b.name), body: String(b.body), platform: String(b.platform || "all") };
  mem.templates.push(t);
  return NextResponse.json({ template: t }, { status: 201 });
}
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  mem.templates = mem.templates.filter((t) => t.id !== searchParams.get("id"));
  return NextResponse.json({ ok: true });
}
