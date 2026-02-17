# Supabase Database Setup

To enable the dynamic Gallery, Instructors, and Testimonials features, please run the following SQL script in your Supabase SQL Editor.

## 1. Create Tables

```sql
-- Create Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    type TEXT DEFAULT 'image',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Instructors Table
CREATE TABLE IF NOT EXISTS instructors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT NOT NULL,
    certifications TEXT[] DEFAULT '{}', -- Array of strings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create Policies (Allow public read, allow authenticated insert/update/delete)

-- Gallery Policies
CREATE POLICY "Enable read access for all users" ON gallery FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

-- Instructors Policies
CREATE POLICY "Enable read access for all users" ON instructors FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON instructors FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON instructors FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON instructors FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials Policies
CREATE POLICY "Enable read access for all users" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- Enable Realtime for Testimonials (and others if needed)
-- NOTE: This command might error if the table is already added to publication, which is fine.
do $$ 
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'testimonials') then
    alter publication supabase_realtime add table testimonials;
  end if;
end $$;

-- Optional: Enable for others
do $$ 
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'gallery') then
    alter publication supabase_realtime add table gallery;
  end if;
end $$;
do $$ 
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'instructors') then
    alter publication supabase_realtime add table instructors;
  end if;
end $$;
```

## 2. Create Storage Buckets

You also need to create storage buckets for images.

1.  Go to **Storage** in your Supabase dashboard.
2.  Create a new public bucket named `gallery`.
3.  Create a new public bucket named `instructors`.
4.  Ensure both buckets are set to **Public**.

## 3. Storage Policies

For each bucket (`gallery` and `instructors`), you need to add policies to allow uploads:

*   **SELECT**: Enable for all users (Public).
*   **INSERT**: Enable for authenticated users only.
*   **UPDATE**: Enable for authenticated users only.
*   **DELETE**: Enable for authenticated users only.

```sql
-- Example Storage Policies (You might need to adjust based on your specific setup or use the Dashboard UI)
-- Allow public viewing of gallery images
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'gallery' );

-- Allow authenticated uploads to gallery
create policy "Authenticated Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'gallery' AND auth.role() = 'authenticated' );
```
