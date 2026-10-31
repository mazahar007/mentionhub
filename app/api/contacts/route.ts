import { NextResponse } from "next/server";
import { mem, type Platform } from "@/lib/store";
export async function GET() { return NextResponse.json({ contacts: mem.contacts, note: "Opt-in list only. Never add people without their consent." }); }
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  if (!b.name || !b.handle) return NextResponse.json({ error: "name and handle required" }, { status: 400 });
  const c = { id: "c" + Date.now(), name: String(b.name), handle: String(b.handle), platform: (b.platform || "facebook") as Platform, consent: b.consent === true };
  mem.contacts.push(c);
  return NextResponse.json({ contact: c }, { status: 201 });
}
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  mem.contacts = mem.contacts.filter((c) => c.id !== searchParams.get("id"));
  return NextResponse.json({ ok: true });
}
