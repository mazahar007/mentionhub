# MentionHub — Backend Design (Profile Checker সহ)

## ১. বর্তমান আর্কিটেকচার (v1, লাইভ)
- **Frontend + Backend একটাই অ্যাপ:** Next.js 15.5.28 (App Router), Vercel-এ সার্ভারলেস।
- **কোনো আলাদা সার্ভার নেই।** প্রতিটা API রুট একটা সার্ভারলেস ফাংশন:
  `/api/health`, `/api/mentions`, `/api/templates`, `/api/contacts`, `/api/accounts`, `/api/rules`,
  `/api/tag-queue`, `/api/monitor`, `/api/profile-check` (নতুন)।
- **ডেটা এখন in-memory:** `lib/store.ts`-এর `mem` অবজেক্ট। রিডিপ্লয়/রিস্টার্ট হলে মুছে যায়।
  এটা শুধু ডেমো মোড। প্রোডাকশনে Supabase-এ যাবে (নিচে দেখুন)।
- **ডেপ্লয়:** GitHub রিপো নেই (App রিপো বানাতে পারে না, 403)। তাই সরাসরি Vercel আপলোড।
  প্রজেক্ট: `mention-manager` (prj_ankUsWXO1MGTIjlo61oopUe41p54), লিংক: https://mention-manager-ghorowa.vercel.app
  SSO/Deployment Protection OFF রাখতে হবে, নইলে পাবলিক 302 পাবে।

## ২. Profile Checker — ডেটা ফ্লো
```
User (Dashboard → Profile Check ট্যাব)
  → POST /api/profile-check { platform, handle, consent, demo? }
  → ১) platform যাচাই (৭টি: facebook, linkedin, youtube, x, instagram, pinterest, reddit)
  → ২) consent=true না হলে 400 — পাবলিক প্রোফাইল + বৈধ উদ্দেশ্য ছাড়া চেক হবে না
  → ৩) demo=true হলে SAMPLE রিপোর্ট, কোটা খরচ হয় না
  → ৪) লাইভ অ্যাডাপ্টার চেষ্টা (নিচের টেবিল)
  → ৫) লাইভ ডেটা পেলে: কোটা চেক → সফল হলে history-তে সেভ + কাউন্ট
  → ৬) লাইভ না পেলে: restricted রেসপন্স, কোনো ডেটা নেই, কোটা খরচ হয় না
```

## ৩. ফ্রি কোটা নিয়ম (বর্তমান সিদ্ধান্ত, পরে বদলানো যাবে)
- **ফ্রি = ১৫ বার।** ১৫টি ভিন্ন প্রোফাইল, অথবা একজন ব্যক্তির ১৫টি অ্যাকাউন্ট, অথবা যেকোনো মিক্স — কাউন্টার শুধু চেক গোনে, মানুষ গোনে না।
- **কাউন্টেড চেক =** এমন লুকআপ যেটা ডেটা ফেরত দিয়েছে। ডেমো + restricted (ডেটা নেই) কাউন্ট হয় না।
- **কনফিগ এক জায়গায়:** `lib/store.ts`-এ `FREE_PROFILE_CHECKS = 15`। এই সংখ্যা বদলালেই লিমিট বদলে যাবে — কোডের অন্য জায়গায় হাত দিতে হবে না।
- **প্রস্তাবিত পেইড লিমিট (এখনো এনফোর্স হয়নি, v1.1):** Pro = ১০০ চেক/মাস, Business = আনলিমিটেড।
- **ডেমো সীমাবদ্ধতা:** এখন লগইন নেই, তাই কাউন্টার সার্ভার মেমরিতে গ্লোবাল। প্রোডাকশনে এটা প্রতি-ইউজার হবে (নিচে)।

## ৪. প্ল্যাটফর্ম অ্যাডাপ্টার (সত্যিটা পরিষ্কার করে)
| প্ল্যাটফর্ম | লাইভ উপায় | এখনকার অবস্থা |
|---|---|---|
| YouTube | YouTube Data API v3, `YOUTUBE_API_KEY` | কী বসালে লাইভ: চ্যানেল নাম, সাবস্ক্রাইবার, মোট ভিডিও, সাম্প্রতিক ভিডিও |
| Reddit | Reddit OAuth app, `REDDIT_CLIENT_ID/SECRET` | কী বসালে লাইভ: পাবলিক পোস্ট, টাইপ, কর্মা। কী ছাড়া পাবলিক JSON 403 (বট-ব্লক) |
| Facebook | Meta Graph API — শুধু নিজের Page | পার্সোনাল প্রোফাইল সার্চ অফিশিয়াল API-তে নেই |
| Instagram | Meta Graph API — শুধু নিজের Business অ্যাকাউন্ট | অন্যের প্রোফাইল সার্চ নেই |
| LinkedIn | পার্টনারশিপ API | পাবলিক সার্চ সীমিত |
| X | পেইড API টিয়ার | ফ্রিতে ইউজার লুকআপ নেই |
| Pinterest | অ্যাপ্রুভড API app | সীমিত |

**কোনো স্ক্র্যাপিং/বট-অটোমেশন নেই।** যেটা অফিশিয়াল API দেয় না, সেটা "restricted" দেখিয়ে প্রোফাইল URL দিয়ে দেওয়া হয় — ব্যবহারকারী নিজে প্ল্যাটফর্মে গিয়ে দেখতে পারবে। ভুয়া ডেটা কখনো আসল রিপোর্ট হিসেবে দেখানো হয় না; ডেমো সবসময় SAMPLE লেখা থাকে।

## ৫. প্রোডাকশন ব্যাকেন্ড (Supabase-এ যাওয়ার পর) — ডিজাইন
টেবিল (সব RLS সহ, ইউজার শুধু নিজের রো দেখবে):
- `profiles` (Supabase Auth user): id, email, plan (free/pro/business), created_at
- `profile_checks`: id, user_id, platform, handle, display_name, followers, total_posts, post_types (jsonb), recent (jsonb), source, counted, created_at
- `quota_usage`: user_id, month (YYYY-MM), counted_checks — মাস শেষে রিসেট; ফ্রি প্ল্যানে মাস নয়, মোট ১৫ (বর্তমান নিয়ম) — প্ল্যান বদলালে এই টেবিলের নিয়ম বদলাবে
- `subscriptions`: user_id, plan, status, provider (bkash_manual / stripe), expires_at

API নিয়ম (প্রোডাকশনে):
- প্রতিটা POST-এ: Auth টোকেন যাচাই → কোটা চেক (ট্রানজ্যাকশনে) → অ্যাডাপ্টার → সেভ → কাউন্টার বাড়ানো। একই রিকোয়েস্ট দুবার গুনবে না (idempotency key: user+platform+handle+দিন)।
- রেট লিমিট: প্রতি ইউজার মিনিটে ১০ রিকোয়েস্ট, প্রতি IP-তে আলাদা লিমিট।
- ক্যাশ: একই প্রোফাইল ২৪ ঘণ্টায় আবার চেক করলে ক্যাশ থেকে দিলে API কোটা বাঁচে — কিন্তু কাউন্টেড চেক হিসেবে ধরা হবে কিনা, সেটা তখন সিদ্ধান্ত নিতে হবে।
- লগ: শুধু পাবলিক সারাংশ সেভ হবে — প্রাইভেট মেসেজ, ফ্রেন্ড লিস্ট, লোকেশন, সংবেদনশীল বৈশিষ্ট্য কখনো সেভ/অনুমান করা হবে না।

## ৬. কোড আপডেট — আপনার কি করতে হবে?
**এই আপডেটের জন্য: কিছুই না।** আমি কোড বদলে Vercel-এ আবার ডিপ্লয় করে দেবো, লিংক একই থাকবে
(https://mention-manager-ghorowa.vercel.app)। আপনি শুধু Chrome-এ খুলে রিফ্রেশ করবেন —
Messenger-এর ভেতরের ব্রাউজারে পুরনো ক্যাশ দেখাতে পারে।
**ভবিষ্যতের আপডেটের জন্য:** দুটি পথ —
  (a) আমাকে বলবেন "আপডেট করো" — আমি একইভাবে ডিপ্লয় করে দেবো (এখনকার পথ, কোনো কাজ নেই);
  (b) অটো-ডিপ্লয় চাইলে: আপনি নিজে GitHub-এ `mazahar007/mention-manager` রিপো বানিয়ে App-কে অ্যাক্সেস দিলে,
      Vercel-এ লিংক করে দেবো — তারপর থেকে GitHub-এ পুশ করলেই আপনাআপনি লাইভ হবে।
**লাইভ YouTube/Reddit চেক চাইলে শুধু তখন:** Vercel Dashboard → Project → Settings → Environment Variables-এ
`YOUTUBE_API_KEY` (আর Reddit-এর জন্য `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`) বসিয়ে Redeploy করতে হবে।
এই কীগুলো ছাড়াও চেকার UI, ডেমো, কোটা, হিস্ট্রি — সব কাজ করবে।
