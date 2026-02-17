
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. profiles
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text check (role in ('admin', 'student')) default 'student',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'admin'); -- Defaulting to admin for testing purposes
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. courses
create table courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price numeric not null,
  duration text,
  image_url text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. instructors
create table instructors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text,
  bio text,
  image_url text,
  certifications text[] default array[]::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. testimonials
create table testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text,
  content text not null,
  rating integer check (rating >= 1 and rating <= 5),
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. enrollments
create table enrollments (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  course_id uuid references courses(id),
  course_name text, -- fallback if course_id is not available
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. contact_messages
create table contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. gallery
create table gallery (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text,
  image_url text not null,
  type text check (type in ('image', 'video')) default 'image',
  caption text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies

-- Enable RLS
alter table profiles enable row level security;
alter table courses enable row level security;
alter table instructors enable row level security;
alter table testimonials enable row level security;
alter table enrollments enable row level security;
alter table contact_messages enable row level security;
alter table gallery enable row level security;

-- Profiles: Public read (if needed), Users can update own
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Courses: Public read, Admin write
create policy "Courses are viewable by everyone" on courses for select using (true);
create policy "Admins can insert courses" on courses for insert with check (auth.uid() in (select id from profiles where role = 'admin'));
create policy "Admins can update courses" on courses for update using (auth.uid() in (select id from profiles where role = 'admin'));
create policy "Admins can delete courses" on courses for delete using (auth.uid() in (select id from profiles where role = 'admin'));

-- Enrollments: Public insert (anon), Admin read/update
create policy "Anyone can enroll" on enrollments for insert with check (true);
create policy "Admins can view enrollments" on enrollments for select using (auth.uid() in (select id from profiles where role = 'admin'));
create policy "Admins can update enrollments" on enrollments for update using (auth.uid() in (select id from profiles where role = 'admin'));
create policy "Users can view own enrollments" on enrollments for select using (email = auth.jwt() ->> 'email');

-- Contact Messages: Public insert
create policy "Anyone can send message" on contact_messages for insert with check (true);
create policy "Admins can view messages" on contact_messages for select using (auth.uid() in (select id from profiles where role = 'admin'));

-- Instructors: Public read, Admin write
create policy "Instructors are viewable by everyone" on instructors for select using (true);
create policy "Admins can insert instructors" on instructors for insert with check (auth.uid() in (select id from profiles where role = 'admin'));
create policy "Admins can update instructors" on instructors for update using (auth.uid() in (select id from profiles where role = 'admin'));
create policy "Admins can delete instructors" on instructors for delete using (auth.uid() in (select id from profiles where role = 'admin'));

-- Testimonials: Public read, Admin write
create policy "Testimonials are viewable by everyone" on testimonials for select using (true);
create policy "Admins can insert testimonials" on testimonials for insert with check (auth.uid() in (select id from profiles where role = 'admin'));
create policy "Admins can update testimonials" on testimonials for update using (auth.uid() in (select id from profiles where role = 'admin'));
create policy "Admins can delete testimonials" on testimonials for delete using (auth.uid() in (select id from profiles where role = 'admin'));

-- Gallery: Public read, Admin write
create policy "Gallery is viewable by everyone" on gallery for select using (true);
create policy "Admins can insert gallery" on gallery for insert with check (auth.uid() in (select id from profiles where role = 'admin'));
create policy "Admins can update gallery" on gallery for update using (auth.uid() in (select id from profiles where role = 'admin'));
create policy "Admins can delete gallery" on gallery for delete using (auth.uid() in (select id from profiles where role = 'admin'));

-- Storage Policies (Buckets must be created in dashboard)
-- course-images, instructor-images, gallery-images: Public read, Admin upload
