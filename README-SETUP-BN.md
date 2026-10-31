# MentionHub — সব প্ল্যাটফর্মের মেনশন ম্যানেজার (SaaS v1)

## এটা কী
Facebook + Instagram + YouTube মেনশন/কমেন্ট এক ইনবক্সে। টেমপ্লেট দিয়ে দ্রুত রিপ্লাই, অপ্ট-ইন লিস্ট, সেফটি লিমিট, প্রাইসিং পেজ সহ SaaS স্টার্টার।
Threads / TikTok / X — v1-এ "Coming soon" হিসেবে দেখানো আছে, কারণ এদের API অ্যাক্সেস সীমিত/পেইড।

## গুরুত্বপূর্ণ সেফটি নিয়ম (ভাঙা যাবে না)
- যাকে-তাকে বাল্ক ট্যাগ করা যাবে না — Facebook/Instagram এতে পেজ ব্যান হয়।
- শুধু নিজের পেজ/চ্যানেল, শুধু যারা ইতিমধ্যে এনগেজ করেছে বা অপ্ট-ইন দিয়েছে।
- অটো-রিপ্লাই ডিফল্ট OFF, ডেইলি লিমিট + ডিলে + Quiet hours অন।
- কারো পাসওয়ার্ড কখনো নেওয়া হবে না — শুধু অফিসিয়াল Meta/Google OAuth।

## ১. লোকালে চালানো (ডেমো — কোনো কী লাগে না)
```bash
cd mention-manager
npm install
npm run dev
# খুলুন: http://localhost:3000  (ল্যান্ডিং)  /app (ড্যাশবোর্ড)  /api/health
```
ডেমো ডেটা ইন-মেমরিতে থাকে, রিস্টার্টে মুছে যাবে। এটাই ইচ্ছাকৃত — আসল ডেটার জন্য ধাপ ২।

## ২. Supabase কানেক্ট (আসল ডেটা বাঁচাতে)
1. Supabase-এ নতুন প্রজেক্ট বানান
2. SQL Editor-এ `supabase/schema.sql` রান করুন
3. `.env.example` কপি করে `.env.local` বানান, ৪টি ভ্যারিয়েবল বসান:
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
4. `/api/health` এ `supabase: true` দেখলে বুঝবেন কানেক্ট হয়েছে

## ৩. আসল প্ল্যাটফর্ম কানেক্ট (লাইভ রিপ্লাই পাঠাতে)
- **Facebook + Instagram:** Meta for Developers-এ App বানান → Facebook Login + Instagram Graph API পারমিশন → App Review (Page-এর জন্য `pages_read_engagement`, `pages_manage_comments` লাগে)। তারপর `META_APP_ID/SECRET/REDIRECT_URI` বসান।
- **YouTube:** Google Cloud-এ OAuth Client → YouTube Data API v3 এনেবল → `GOOGLE_CLIENT_ID/SECRET/REDIRECT_URI`।
- এই দুই ধাপ ছাড়া v1 শুধু ড্যাশবোর্ডে রিপ্লাই সেভ করবে, লাইভে পাঠাবে না — এটা নিরাপত্তার জন্য ইচ্ছাকৃত।
- টোকেন কখনো প্লেইন টেক্সটে DB-তে রাখবেন না — v1.1-এ এনক্রিপশন + রিফ্রেশ ফ্লো যোগ করতে হবে।

## ৪. Vercel-এ ডিপ্লয় (SaaS হিসেবে ছাড়তে)
1. কোড GitHub-এ পুশ করুন (ছবি/বাইনারি থাকলে ওয়েব UI দিয়ে আপলোড)
2. Vercel → Import → env vars (ধাপ ২+৩) বসান → Deploy
3. কাস্টম ডোমেইন যোগ করুন, তারপর Meta/Google-এ Redirect URI আপডেট করুন

## ৫. বিলিং
- v1: Free/Pro/Business প্রাইসিং পেজ + ডেমো প্ল্যান।
- বাংলাদেশ: bKash/Nagad ম্যানুয়াল পেমেন্ট + অ্যাডমিন অ্যাপ্রুভাল।
- ইন্টারন্যাশনাল: Stripe Checkout। Webhook দিয়ে অটো-অ্যাক্টিভেশন v1.1।

## v1-এ যা আছে / যা নেই
আছে: ল্যান্ডিং, ড্যাশবোর্ড, ইনবক্স ফিল্টার, টেমপ্লেট CRUD, অপ্ট-ইন লিস্ট, অ্যাকাউন্টস, রুলস, API, হেলথ চেক।
নেই (পরের ধাপ): আসল OAuth কলব্যাক, লাইভ কমেন্ট পাঠানো, Supabase Auth, Stripe webhook, টিম সিট, Threads/TikTok/X লাইভ।

## পরের ধাপের অর্ডার (সাজেস্টেড)
1. Supabase Auth (লগইন/সাইনআপ আসল)
2. Meta OAuth → Facebook Page-এ লাইভ রিপ্লাই
3. YouTube OAuth → লাইভ রিপ্লাই
4. Stripe + bKash অটো-বিলিং

## GitHub + Vercel auto-deploy (2026-10-31)
- GitHub repo: mazahar007/mentionhub (main branch)
- Vercel project: mentionhub (git-linked) — main-এ push করলেই auto-deploy হবে।
- পুরনো direct-upload project: mention-manager (mention-manager-ghorowa.vercel.app) — এখনো লাইভ, নতুন project লাইভ হলে এটাই মূল লিংক হবে।
