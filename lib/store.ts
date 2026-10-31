import { createClient } from "@supabase/supabase-js";

export type Platform = "facebook" | "instagram" | "youtube" | "threads" | "tiktok" | "x";
export type MentionStatus = "new" | "replied" | "ignored";

export interface Mention {
  id: string;
  platform: Platform;
  author: string;
  author_handle: string;
  text: string;
  post_url: string;
  created_at: string;
  status: MentionStatus;
  reply_text?: string | null;
}

export interface Template { id: string; name: string; body: string; platform: string; }
export interface Contact { id: string; name: string; handle: string; platform: Platform; consent: boolean; }
export interface Account { id: string; platform: Platform; label: string; status: "connected" | "not_connected" | "coming_soon"; note: string; }
export interface Rule { id: string; name: string; enabled: boolean; detail: string; }
export interface TagJob { id: string; kind: "post" | "comment"; text: string; tagged: string[]; status: "queued" | "ready"; created_at: string; }
export interface WatchKeyword { id: string; keyword: string; platform: string; }
export interface AutoReplyLog { id: string; mention_id: string; author: string; template: string; reply: string; at: string; }
// Social Profile Checker — FREE LIMIT IS CONFIGURABLE HERE ONLY.
// Free = 15 counted checks (changed 2026-10-31 from the earlier 5).
// A counted check = one platform lookup that returns data. Demo examples and
// restricted-platform lookups (no data returned) do NOT consume the quota.
// In production this must move to per-user counts in Supabase Auth;
// demo mode counts globally in server memory, so treat it as a demo limit.
export const FREE_PROFILE_CHECKS = 15;
export interface ProfileCheck {
  id: string; platform: string; handle: string; display_name: string | null;
  followers: number | null; total_posts: number | null;
  post_types: Record<string, number>; recent: { title: string; date: string | null; type: string }[];
  summary: string; source: "live" | "demo" | "restricted"; counted: boolean; at: string;
}

export const PLATFORMS: { id: Platform; label: string; color: string; v1: string }[] = [
  { id: "facebook", label: "Facebook", color: "#1877f2", v1: "Live in v1 — Page comments & mentions via Meta Graph API" },
  { id: "instagram", label: "Instagram", color: "#e1306c", v1: "Live in v1 — Business account mentions & comments via Meta Graph API" },
  { id: "youtube", label: "YouTube", color: "#ff0000", v1: "Live in v1 — Video comments via YouTube Data API v3" },
  { id: "threads", label: "Threads", color: "#000000", v1: "Coming soon — Threads API mention access is limited" },
  { id: "tiktok", label: "TikTok", color: "#111111", v1: "Coming soon — needs TikTok Business / Content Posting API approval" },
  { id: "x", label: "X (Twitter)", color: "#000000", v1: "Coming soon — needs X API paid tier" },
];

const seedMentions: Mention[] = [
  { id: "m1", platform: "facebook", author: "Rahim Uddin", author_handle: "@rahim.uddin", text: "@americancarsaga এই Corvette ZL-1 ভিডিওটা অসাধারণ! পরেরটা কবে আসছে?", post_url: "https://facebook.com", created_at: "2026-10-29T05:10:00Z", status: "new" },
  { id: "m2", platform: "instagram", author: "Sara Ahmed", author_handle: "@sara.drives", text: "Mentioned you in a story: that Camaro ZL1 thumbnail is 🔥", post_url: "https://instagram.com", created_at: "2026-10-29T04:40:00Z", status: "new" },
  { id: "m3", platform: "youtube", author: "Classic Car Garage", author_handle: "@classicgarage", text: "@americancarsaga great research on the 69 built figure — subscribed!", post_url: "https://youtube.com", created_at: "2026-10-28T18:20:00Z", status: "replied", reply_text: "Thank you so much, {name}! More Lost Legends coming soon." },
  { id: "m4", platform: "facebook", author: "Karim Hossain", author_handle: "@karim.h", text: "আপনার পেজের ভিডিওগুলো নিয়মিত দেখি, ধন্যবাদ!", post_url: "https://facebook.com", created_at: "2026-10-28T12:05:00Z", status: "ignored" },
];

const seedTemplates: Template[] = [
  { id: "t1", name: "Thank you", body: "Thank you so much, {name}! 🙏 Glad you liked it — more coming soon.", platform: "all" },
  { id: "t2", name: "New video alert", body: "Hi {name}! New video is out — hope you enjoy it. Let me know what you think!", platform: "all" },
  { id: "t3", name: "Bangla thanks", body: "ধন্যবাদ {name}! আপনার সাপোর্টের জন্য কৃতজ্ঞ। পরের ভিডিওতে দেখা হবে।", platform: "all" },
];

const seedContacts: Contact[] = [
  { id: "c1", name: "Rahim Uddin", handle: "@rahim.uddin", platform: "facebook", consent: true },
  { id: "c2", name: "Sara Ahmed", handle: "@sara.drives", platform: "instagram", consent: true },
];

const seedAccounts: Account[] = [
  { id: "a1", platform: "facebook", label: "americancarsaga Page", status: "not_connected", note: "Connect with Meta login — needs a Meta App + Page permission review." },
  { id: "a2", platform: "instagram", label: "Instagram Business", status: "not_connected", note: "Connects through the same Meta login as Facebook." },
  { id: "a3", platform: "youtube", label: "YouTube channel", status: "not_connected", note: "Connect with Google OAuth — YouTube Data API v3." },
  { id: "a4", platform: "threads", label: "Threads", status: "coming_soon", note: "API access is limited; manual inbox import in v1." },
  { id: "a5", platform: "tiktok", label: "TikTok", status: "coming_soon", note: "Needs business API approval." },
  { id: "a6", platform: "x", label: "X", status: "coming_soon", note: "Needs X API paid tier." },
];

const seedRules: Rule[] = [
  { id: "r1", name: "Auto-reply to new mentions (opt-in authors only)", enabled: false, detail: "Only replies to authors on your opt-in list. Off by default — turn on per platform." },
  { id: "r2", name: "Daily safety limit: 50 replies / day", enabled: true, detail: "Hard cap to avoid spam flags. Pro can raise it to 200, Business to 500." },
  { id: "r3", name: "Delay between replies: 60 seconds", enabled: true, detail: "Prevents burst posting that platforms flag as automation." },
  { id: "r4", name: "Quiet hours: 12am–7am Asia/Dhaka", enabled: true, detail: "No auto-replies during quiet hours; mentions queue for morning." },
];

// In-memory demo store (serverless memory, like Jonotar Kotha pre-Supabase).
// Supabase-first when env vars exist, otherwise this seed is used.
const g = globalThis as unknown as Record<string, unknown>;
if (!g.__mention_store) {
  g.__mention_store = {
    mentions: [...seedMentions],
    templates: [...seedTemplates],
    contacts: [...seedContacts],
    accounts: [...seedAccounts],
    rules: [...seedRules],
    tagJobs: [] as TagJob[],
    watchKeywords: [{ id: "w1", keyword: "americancarsaga", platform: "facebook" }, { id: "w2", keyword: "ZL-1", platform: "all" }] as WatchKeyword[],
    autoReplyLog: [] as AutoReplyLog[],
    profileChecks: [] as ProfileCheck[],
  };
}
export const mem = g.__mention_store as {
  mentions: Mention[]; templates: Template[]; contacts: Contact[];
  accounts: Account[]; rules: Rule[];
  tagJobs: TagJob[]; watchKeywords: WatchKeyword[]; autoReplyLog: AutoReplyLog[];
  profileChecks: ProfileCheck[];
};
// Backfill for stores created before these fields existed.
if (!mem.tagJobs) mem.tagJobs = [];
if (!mem.watchKeywords) mem.watchKeywords = [{ id: "w1", keyword: "americancarsaga", platform: "facebook" }];
if (!mem.autoReplyLog) mem.autoReplyLog = [];
if (!mem.profileChecks) mem.profileChecks = [];

export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function supabaseReady(): Promise<boolean> {
  const sb = supabaseServer();
  if (!sb) return false;
  try {
    const { error } = await sb.from("mentions").select("id").limit(1);
    return !error;
  } catch { return false; }
}

export function renderTemplate(body: string, m: Mention): string {
  return body.replaceAll("{name}", m.author).replaceAll("{platform}", m.platform).replaceAll("{handle}", m.author_handle);
}
