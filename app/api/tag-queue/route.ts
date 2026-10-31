import { NextResponse } from "next/server";
import { mem } from "@/lib/store";

// Facebook tag composer — SAFETY FIRST:
// - Only contacts on the opt-in list, only platform=facebook, max 5 tags per post/comment.
// - Jobs are QUEUED / READY-TO-POST in this app. Live posting to Facebook still
//   needs a Meta App + Page permissions + App Review; the Graph API does not
//   allow tagging arbitrary users, and browser automation to do so risks a ban.
//   Never queue a stranger, and never remove the consent check.
export async function GET() {
  const fbOptIn = mem.contacts.filter((c) => c.platform === "facebook" && c.consent);
  return NextResponse.json({ jobs: mem.tagJobs, fb_opt_in: fbOptIn, limits: { max_tags_per_post: 5, max_jobs_per_day: 10 }, note: "Queued jobs are drafts ready to post after you connect Facebook. Nothing is posted live from demo mode." });
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const text = String(b.text || "").trim();
  const kind: "post" | "comment" = b.kind === "comment" ? "comment" : "post";
  const ids: string[] = Array.isArray(b.contact_ids) ? b.contact_ids.map(String) : [];
  if (!text) return NextResponse.json({ error: "Post / comment text is required" }, { status: 400 });
  if (ids.length === 0) return NextResponse.json({ error: "Select at least one opt-in contact to tag" }, { status: 400 });
  if (ids.length > 5) return NextResponse.json({ error: "Safety limit: max 5 tags per post / comment" }, { status: 400 });
  const tagged: string[] = [];
  for (const id of ids) {
    const c = mem.contacts.find((x) => x.id === id);
    if (!c) return NextResponse.json({ error: `Contact not found: ${id}` }, { status: 400 });
    if (c.platform !== "facebook") return NextResponse.json({ error: `${c.name} is not a Facebook contact` }, { status: 400 });
    if (!c.consent) return NextResponse.json({ error: `${c.name} has not opted in — cannot tag` }, { status: 400 });
    tagged.push(c.handle);
  }
  const today = new Date().toISOString().slice(0, 10);
  const todaysJobs = mem.tagJobs.filter((j) => j.created_at.slice(0, 10) === today);
  if (todaysJobs.length >= 10) return NextResponse.json({ error: "Daily limit reached: max 10 tag posts / day" }, { status: 400 });
  const job = { id: "tag" + Date.now(), kind, text: text + " " + tagged.join(" "), tagged, status: "queued" as const, created_at: new Date().toISOString() };
  mem.tagJobs.unshift(job);
  return NextResponse.json({ job, preview: job.text, live_posted: false }, { status: 201 });
}
