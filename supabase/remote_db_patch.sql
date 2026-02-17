/* 
    REMOTE DATABASE PATCH
    Run this script in your Supabase Dashboard SQL Editor to sync your database 
    with the latest code changes and fix permissions.
*/

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Profiles Table & Admin Trigger
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text check (role in ('admin', 'student')) default 'student',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'admin') -- Default to admin for dev ease
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. ENSURE TABLES EXIST (Basic Schema)
create table if not exists public.courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price numeric not null,
  duration text,
  image_url text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.instructors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  bio text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  message text, -- original column name might exist
  rating integer check (rating >= 1 and rating <= 5),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.enrollments (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  course_id uuid references courses(id),
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.gallery (
  id uuid default uuid_generate_v4() primary key,
  image_url text not null,
  caption text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. UPDATE TABLES with Missing Columns
-- Enrollments
alter table public.enrollments add column if not exists course_name text;
alter table public.enrollments alter column course_id drop not null;

-- Instructors
alter table public.instructors add column if not exists role text;
alter table public.instructors add column if not exists certifications text[] default array[]::text[];

-- Testimonials
alter table public.testimonials add column if not exists role text;
alter table public.testimonials add column if not exists content text;
alter table public.testimonials add column if not exists is_published boolean default false;
-- Map message to content if content is null
-- Map message to content if content is null (Only if message column exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'message') THEN
        EXECUTE 'update public.testimonials set content = message where content is null and message is not null';
    END IF;
END $$;
-- Ensure content is populated before enforcing constraint (optional, skipping not null constraint for safety)

-- Gallery
alter table public.gallery add column if not exists title text default 'Untitled';
alter table public.gallery add column if not exists category text;
alter table public.gallery add column if not exists type text check (type in ('image', 'video')) default 'image';

-- 5. Apply RLS Policies (Update Policies)
-- Enable RLS on all tables
alter table profiles enable row level security;
alter table courses enable row level security;
alter table instructors enable row level security;
alter table testimonials enable row level security;
alter table enrollments enable row level security;
alter table contact_messages enable row level security;
alter table gallery enable row level security;

-- Enrollments
drop policy if exists "Admins can update enrollments" on enrollments;
create policy "Admins can update enrollments" on enrollments for update using (auth.uid() in (select id from profiles where role = 'admin'));

-- Instructors
drop policy if exists "Instructors are viewable by everyone" on instructors;
create policy "Instructors are viewable by everyone" on instructors for select using (true);
drop policy if exists "Admins can insert instructors" on instructors;
create policy "Admins can insert instructors" on instructors for insert with check (auth.uid() in (select id from profiles where role = 'admin'));
drop policy if exists "Admins can update instructors" on instructors;
create policy "Admins can update instructors" on instructors for update using (auth.uid() in (select id from profiles where role = 'admin'));
drop policy if exists "Admins can delete instructors" on instructors;
create policy "Admins can delete instructors" on instructors for delete using (auth.uid() in (select id from profiles where role = 'admin'));

-- Profiles
drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);

-- Gallery
drop policy if exists "Gallery is viewable by everyone" on gallery;
create policy "Gallery is viewable by everyone" on gallery for select using (true);
drop policy if exists "Admins can insert gallery" on gallery;
create policy "Admins can insert gallery" on gallery for insert with check (auth.uid() in (select id from profiles where role = 'admin'));
drop policy if exists "Admins can update gallery" on gallery;
create policy "Admins can update gallery" on gallery for update using (auth.uid() in (select id from profiles where role = 'admin'));
drop policy if exists "Admins can delete gallery" on gallery;
create policy "Admins can delete gallery" on gallery for delete using (auth.uid() in (select id from profiles where role = 'admin'));

-- 6. IMPORTANT: Make YOU an Admin
-- This grants admin role to all existing users (i.e. you)
insert into public.profiles (id, email, role)
select id, email, 'admin' from auth.users
on conflict (id) do update set role = 'admin';
