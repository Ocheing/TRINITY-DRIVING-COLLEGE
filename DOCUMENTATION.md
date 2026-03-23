# Trinity Driving School (TrinityDS) Platform Documentation

> [!NOTE]
> This documentation provides a complete technical and functional overview of the Trinity Driving School web application. It is designed to help developers and administrators understand the platform's architecture, tools, and daily operations.

## 1. Project Overview & Tech Stack

The TrinityDS platform is a modern, responsive, and robust full-stack web application designed to handle student enrollments, inquiries, and content management dynamically.

- **Framework**: Next.js 16 (App Router paradigm)
- **Styling**: Tailwind CSS v4 + Framer Motion (for smooth micro-animations)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT & Role-based authentication)
- **Icons**: Lucide React
- **Email Automation**: Nodemailer (via standard Gmail SMTP)

---

## 2. Design System & Aesthetics

The application is themed around safety, trust, and professionalism, utilizing a dual-tone custom color palette tailored in `globals.css`:
- **Brand Blue (`#10A6E9`)**: The primary trust color. Used for large backgrounds, primary text highlights, standard buttons, and the main logo.
- **Accent Maroon (`#800000`)**: A deep, rich red utilized for distinct Call-To-Action (CTA) elements, including the "Enroll Now" buttons, active navigation states, and the popular pricing tier. Designed specifically to grab user attention over white backgrounds.

---

## 3. Project Architecture & Routing

The application utilizes Next.js Server Components by default for heavy SEO optimization and fast loading, dropping into Client Components (`'use client';`) only for interactive elements (animations, forms, and state).

### Public Client Routes
* **`/` (Home)**: Hero section, stat counters, featured courses, testimonials.
* **`/about`**: School history, timeline, core values.
* **`/services`**: Detailed service categories (Motorcycles, Saloon Cars, Trucks, PSV).
* **`/pricing`**: Comparison tables and structured tier packages.
* **`/instructors`**: Dynamic grid loading instructor profiles with "Load More" pagination.
* **`/gallery`**: Interactive grid of school vehicles and driving environments.
* **`/enroll`**: The core multi-step/complex student enrollment form handling automated routing.
* **`/contact`**: Message submission form integrated with Supabase.

### Secure Admin Routes
* **`/admin-login`**: Hidden custom login portal exclusively for administrative staff.
* **`/admin/(dashboard)/*`**: Requires the `admin` role. Contains dedicated management views:
  * `Dashboard`: High-level metrics.
  * `Enrollments`: Table view of applications with 1-click **Approve/Reject** actions.
  * `Courses/Pricing/Testimonials/Instructors/Gallery`: Content management systems allowing the admin to dynamically update website content without altering code.

---

## 4. Supabase Database Schema

The PostgreSQL database ensures complete structural integrity:
- **`profiles`**: Stores user roles (crucial for determining `admin` status).
- **`enrollments`**: Stores comprehensive student applications (name, email, phone, course_id, status: pending/approved/rejected, date). It has a foreign key to `courses`.
- **`courses`**: Manages the available curriculum and pricing points.
- **`messages`**: Captures inquiries originating from the `/contact` form.
- **`gallery` & `instructors` & `testimonials`**: Modular content tables pushed directly to the front-end layout.

---

## 5. Email Automation Pipeline

When an administrator reviews a student's application inside the `/admin/enrollments` table and clicks **Approve**, the system runs an automated background process:

1. Updates the PostgreSQL database status to `approved`.
2. Reaches out to the API route at `app/api/enrollments/approve/route.ts`.
3. Triggers **Nodemailer** to send a polished success email to the student directly from `ocheing999@gmail.com`.

> [!IMPORTANT]  
> **Gmail Setup Requirements**
> Because this system uses standard Gmail, the `.env.local` file MUST contain a 16-character **Google App Password**. Standard Google account passwords will be rejected by Google's SMTP servers to prevent unauthorized automated logins.

---

## 6. Authentication & Security

All admin routes are aggressively protected utilizing server-side validation. Even if a user discovers the `/admin` URL, the layout performs a backend Supabase check:

```typescript
// Role protection logic used inside the app
const role = data.user?.user_metadata?.role ?? data.user?.app_metadata?.role;
if (role !== 'admin') {
    await supabase.auth.signOut();
    throw new Error('Access denied. You do not have administrator privileges.');
}
```
If a standard user or an unauthorized email attempts to log in via `/admin-login`, they are instantly booted.

---

## 7. Administrative Quick Guide

### Approving Students
1. Log in via `/admin-login`.
2. Click **Enrollments** on the sidebar.
3. Review pending row requests.
4. Click the **Approve** button. This sends an automatic instruction email to the student and moves their status.

### Updating the Gallery
1. Navigate to **Gallery** on the admin sidebar.
2. Upload a new image (it processes via Supabase Storage). The image will automatically be cropped cleanly (`object-fit: cover`) across the gallery grid on the live site thanks to predefined CSS layouts.

---

## 8. Deployment Prerequisites (Vercel)

When taking this project to production (e.g., Vercel), ensure you migrate these exact variables from your `.env.local` to the hosting provider's Environment Variables settings panel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GMAIL_USER` (`ocheing999@gmail.com`)
- `GMAIL_APP_PASSWORD` (The 16-character Google App Password with no spaces)
- `RESEND_API_KEY` (Optional/Fallback if standard SMTP is swapped)
