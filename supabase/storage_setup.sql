-- 1. Create Storage Buckets
-- Note: 'public' column set to true makes the bucket content publicly accessible via URL
insert into storage.buckets (id, name, public)
values ('instructors', 'instructors', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('course-images', 'course-images', true)
on conflict (id) do nothing;

-- 2. Storage Policies
-- We generally allow public read access and authenticated upload/modify access.
-- Since the admin panel is protected, 'authenticated' is a sufficient check for now.

-- POLICY: Instructors (Bucket: instructors)
drop policy if exists "Public Access Instructors" on storage.objects;
create policy "Public Access Instructors" on storage.objects for select using ( bucket_id = 'instructors' );

drop policy if exists "Auth Upload Instructors" on storage.objects;
create policy "Auth Upload Instructors" on storage.objects for insert with check ( bucket_id = 'instructors' and auth.role() = 'authenticated' );

drop policy if exists "Auth Update Instructors" on storage.objects;
create policy "Auth Update Instructors" on storage.objects for update using ( bucket_id = 'instructors' and auth.role() = 'authenticated' );

drop policy if exists "Auth Delete Instructors" on storage.objects;
create policy "Auth Delete Instructors" on storage.objects for delete using ( bucket_id = 'instructors' and auth.role() = 'authenticated' );

-- POLICY: Gallery (Bucket: gallery)
drop policy if exists "Public Access Gallery" on storage.objects;
create policy "Public Access Gallery" on storage.objects for select using ( bucket_id = 'gallery' );

drop policy if exists "Auth Upload Gallery" on storage.objects;
create policy "Auth Upload Gallery" on storage.objects for insert with check ( bucket_id = 'gallery' and auth.role() = 'authenticated' );

drop policy if exists "Auth Update Gallery" on storage.objects;
create policy "Auth Update Gallery" on storage.objects for update using ( bucket_id = 'gallery' and auth.role() = 'authenticated' );

drop policy if exists "Auth Delete Gallery" on storage.objects;
create policy "Auth Delete Gallery" on storage.objects for delete using ( bucket_id = 'gallery' and auth.role() = 'authenticated' );

-- POLICY: Course Images (Bucket: course-images)
drop policy if exists "Public Access Courses" on storage.objects;
create policy "Public Access Courses" on storage.objects for select using ( bucket_id = 'course-images' );

drop policy if exists "Auth Upload Courses" on storage.objects;
create policy "Auth Upload Courses" on storage.objects for insert with check ( bucket_id = 'course-images' and auth.role() = 'authenticated' );

drop policy if exists "Auth Update Courses" on storage.objects;
create policy "Auth Update Courses" on storage.objects for update using ( bucket_id = 'course-images' and auth.role() = 'authenticated' );

drop policy if exists "Auth Delete Courses" on storage.objects;
create policy "Auth Delete Courses" on storage.objects for delete using ( bucket_id = 'course-images' and auth.role() = 'authenticated' );
