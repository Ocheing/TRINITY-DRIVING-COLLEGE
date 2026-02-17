
# Trinity Driving College Platform

A production-ready website for Trinity Driving College with student enrollment, course management, and admin dashboard.

## Tech Stack

- **Frontend:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Icons:** Lucide React

## Setup Instructions

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Database Schema

Run the SQL commands provided in `supabase/schema.sql` in the Supabase SQL Editor to create the necessary tables and policies.

This includes:
- Profiles (Admins/Students)
- Courses
- Enrollments
- Messages
- Gallery
- Testimonials
- RLS Policies for security

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

## Admin Access

The admin dashboard is located at `/admin`.
To become an admin:
1. Sign up/Login via the app (currently `/login` or enroll flow).
2. Manually update your user role in the `profiles` table to 'admin' via Supabase Dashboard.
   ```sql
   update profiles set role = 'admin' where email = 'your@email.com';
   ```

## Features

- **Public Website:** Home, About, Courses, Pricing, Contact.
- **Online Enrollment:** Secure form connected to Supabase.
- **Admin Dashboard:** Overview of enrollments, messages, and content management.
- **Responsive Design:** Optimized for mobile and desktop.
