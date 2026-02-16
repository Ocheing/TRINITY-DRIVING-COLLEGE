
# Proposal: Platform Service Restructuring

## Overview
Transforming the current "Courses" system into a more robust "Services" architecture categorized by License Class (A-D). This document outlines the UI/UX changes and the database schema updates required.

## 1. User Interface (UI) Structure

### Goal
Present the services in a clean, hierarchical manner that allows users to quickly identify the license class they need.

### Proposed Page Layout (`/services`)
- **Header:** "Our Services" with a brief introduction.
- **Categorization:** Use a Grid of Cards for each major Class (A, B, C, D).
- **Cards:** Each card will feature:
    - **Title:** e.g., "Class A – Motorcycle Category"
    - **Icon:** A distinct icon representing the vehicle type (Motorcycle, Car, Truck, Bus).
    - **Sub-services List:** Clearly listed sub-categories (A2, A3, etc.) with brief descriptions.
    - **Call to Action:** "Enroll in this Class" button linking to a pre-filled enrollment form.

### Navigation Updates
- **Navbar:** Rename "Courses" to "Services".
- **Footer:** Rename "Courses" to "Services".

## 2. Database Schema Recommendation

### Current State
`courses` table likely stores flat data.

### Proposed Schema
We should normalize the data to support categories and sub-services.

#### Table: `service_categories`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid (PK) | Unique identifier |
| `name` | text | e.g., "Class A", "Class B" |
| `slug` | text | url-friendly identifier (class-a, class-b) |
| `description` | text | Brief description of the category |
| `icon` | text | Icon identifier (e.g., 'bike', 'car') |
| `created_at` | timestamp | Creation date |

#### Table: `services`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid (PK) | Unique identifier |
| `category_id` | uuid (FK) | Links to `service_categories.id` |
| `code` | text | e.g., "A2", "B1" |
| `title` | text | e.g., "Motorcycle", "Light Vehicle (Automatic)" |
| `description` | text | Detailed description |
| `price` | decimal | Cost of the service |
| `duration` | text | e.g., "4 Weeks" |
| `is_active` | boolean | Availability status |
| `created_at` | timestamp | Creation date |

### Migration Plan (SQL Script)

```sql
-- Create Categories Table
create table service_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Services Table
create table services (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references service_categories(id) on delete cascade,
  code text not null,
  title text not null,
  description text,
  price decimal(10, 2),
  duration text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Seed Initial Data
insert into service_categories (name, slug, description, icon) values
('Class A – Motorcycle Category', 'class-a', 'Training for motorcycles and three-wheelers', 'bike'),
('Class B – Saloon Cars', 'class-b', 'Light vehicle training (Auto/Manual)', 'car'),
('Class C – Trucks', 'class-c', 'Commercial truck driving', 'truck'),
('Class D – PSV', 'class-d', 'Public Service Vehicle training', 'users');

-- (Insert services linking to category ids would follow)
```

## 3. Next Steps
1.  **Approval:** Review this proposal.
2.  **Migration:** Execute the SQL script in Supabase.
3.  **Backend Integration:** Update API endpoints to fetch grouped services.
4.  **Frontend Polish:** Ensure icons and responsive layouts are perfect.
