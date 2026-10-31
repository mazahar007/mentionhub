import { NextResponse } from "next/server";
import { mem } from "@/lib/store";
export async function GET() { return NextResponse.json({ rules: mem.rules }); }
export async function PATCH(req: Request) {
  const b = await req.json().catch(() => ({}));
  const r = mem.rules.find((x) => x.id === b.id);
  if (!r) return NextResponse.json({ error: "Rule not found" }, { status: 404 });
  if (typeof b.enabled === "boolean") r.enabled = b.enabled;
  return NextResponse.json({ rule: r });
}
