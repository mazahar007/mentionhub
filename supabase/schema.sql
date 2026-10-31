-- MentionHub v1 schema. Run in Supabase SQL editor.
-- Without Supabase the app runs in demo (in-memory) mode; with it, switch
-- lib/store.ts reads to these tables (v1.1 wiring — API currently uses memory).
create table if not exists mentions (
  id text primary key, user_id uuid, platform text not null,
  author text not null, author_handle text, text text not null,
  post_url text, status text default 'new', reply_text text, created_at timestamptz default now()
);
create table if not exists templates (
  id text primary key, user_id uuid, name text not null, body text not null, platform text default 'all'
);
create table if not exists contacts (
  id text primary key, user_id uuid, name text not null, handle text not null,
  platform text not null, consent boolean default false
);
create table if not exists accounts (
  id text primary key, user_id uuid, platform text not null, label text,
  status text default 'not_connected', access_token_encrypted text, refresh_token_encrypted text
);
create table if not exists rules (
  id text primary key, user_id uuid, name text not null, enabled boolean default false, detail text
);
alter table mentions enable row level security;
alter table templates enable row level security;
alter table contacts enable row level security;
alter table accounts enable row level security;
alter table rules enable row level security;
-- NOTE: add per-user RLS policies once Supabase Auth is enabled.
-- Never store raw access tokens: encrypt with a server-side key (v1.1).
