# MentionHub — Facebook + Instagram + YouTube Connect Guide

## সারসংক্ষেপ
- কোডে OAuth রুট এখন লাইভ: `/api/auth/facebook` (+ callback), `/api/auth/google` (+ callback), স্ট্যাটাস: `/api/auth/status`, গাইড পেজ: `/connect`।
- কিন্তু আপনার অ্যাকাউন্ট আসলে কানেক্ট হবে শুধু তখনই, যখন আপনি নিজে Meta App + Google OAuth app বানিয়ে Vercel-এ env var বসাবেন। এটা Muse আপনার হয়ে বানাতে পারবে না — কারণ Meta/Google ডেভেলপার অ্যাকাউন্ট আপনার, লগইন + মালিকানা যাচাই আপনাকেই করতে হবে।

## ১. Meta App (Facebook + Instagram একসাথে)
1. developers.facebook.com → My Apps → Create App → Use case: Other (বা Business)।
2. Products যোগ করুন: Facebook Login + Instagram Graph API।
3. Facebook Login → Settings → Valid OAuth Redirect URIs-এ বসান:
   `https://mentionhub-ghorowa.vercel.app/api/auth/facebook/callback`
4. App Settings → Basic থেকে App ID + App Secret কপি করুন।
5. আপনার Page-টি App-এর সাথে যুক্ত করুন; Instagram Business অ্যাকাউন্ট Page-এর সাথে লিংক থাকতে হবে (IG connect-এর জন্য এটা বাধ্যতামূলক)।
6. টেস্ট: App Roles-এ নিজেকে Admin রাখলেই নিজের Page/channel কানেক্ট হবে — App Review ছাড়াই। সাধারণ কাস্টমারের জন্য পরে App Review লাগবে (pages_read_engagement, pages_manage_posts, instagram_manage_comments)।

## ২. Google OAuth App (YouTube)
1. console.cloud.google.com → নতুন Project → APIs & Services → Library → YouTube Data API v3 Enable।
2. Credentials → Create Credentials → OAuth client ID → Web application।
3. Authorized redirect URIs-এ বসান:
   `https://mentionhub-ghorowa.vercel.app/api/auth/google/callback`
4. Client ID + Client Secret কপি করুন।
5. টেস্ট: OAuth consent screen-এ নিজেকে Test user রাখলেই নিজের চ্যানেল কানেক্ট হবে — sensitive scope (youtube.force-ssl) পাবলিক ব্যবহারের জন্য Google verification লাগবে।

## ৩. Vercel-এ env var বসানো
Vercel Dashboard → mentionhub project → Settings → Environment Variables → Add:
- META_APP_ID, META_APP_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
- (ঐচ্ছিক) OAUTH_REDIRECT_BASE=https://mentionhub-ghorowa.vercel.app
তারপর Deployments → ⋯ → Redeploy। Secret কখনো চ্যাটে, GitHub-এ, বা কোডে বসাবেন না — শুধু Vercel-এ।

## ৪. কানেক্ট করা
https://mentionhub-ghorowa.vercel.app/connect → Facebook+Instagram বোতাম → Meta login → নিজের Page সিলেক্ট → Allow।
তারপর YouTube বোতাম → Google login → নিজের চ্যানেল সিলেক্ট → Allow।
সফল হলে `/connect?connected=...` দেখাবে, Dashboard → Accounts ট্যাবে status "connected" হবে।

## সীমাবদ্ধতা (সৎভাবে)
- ডেমো মোডে টোকেন শুধু সার্ভার মেমরিতে থাকে — Redeploy হলে মুছে যাবে, আবার Connect করতে হবে। প্রোডাকশনে টোকেন এনক্রিপ্ট করে Supabase-এ per-user সেভ করতে হবে (v1.1)।
- App Review / Google verification না হওয়া পর্যন্ত শুধু Owner + Test user-রাই কানেক্ট করতে পারবে — এটা Meta/Google-এর নিয়ম, কোড দিয়ে বাইপাস করা যাবে না।
- Live মেনশন পড়া / রিপ্লাই পাঠানো তখনই চালু হবে, যখন কানেক্টেড Page/channel-এর permission সত্যিই approved থাকবে।
