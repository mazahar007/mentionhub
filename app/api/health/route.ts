import { NextResponse } from "next/server";
import { supabaseReady, mem } from "@/lib/store";
export async function GET() {
  const supabase = await supabaseReady();
  return NextResponse.json({ ok: true, supabase, demo_mode: !supabase, mentions: mem.mentions.length, templates: mem.templates.length, contacts: mem.contacts.length, version: "mention-manager v1" });
}
